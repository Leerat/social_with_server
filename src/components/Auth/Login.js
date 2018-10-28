import React, { Component } from 'react'
import styled from 'styled-components'
import { observable} from "mobx"
import { inject, observer } from "mobx-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import matchEmail from 'utils/matchEmail'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import Field from 'UI/Field'
import Button from 'UI/Button'
import Message from 'UI/Message'

import Auth from 'components/Auth'

const RegisterWrapper = styled.div`
  padding-top: ${theme.multiInterval(0.5)};
  float: right;
`

const BottomButtons = styled.div`
  margin-top: ${theme.multiInterval(2)};
`

const StyledTypo = styled(Typography)`
  font-size: 120%;
  text-decoration: underline;
`

class Login extends Component {
  @observable email = ''
  @observable emailError = null

  @observable password = ''
  @observable passwordError = null
  @observable isPassVisible = false

  //Not sure about this, mb should store error in local state
  componentWillUnmount(){
    const { authStore } = this.props
    authStore.error = null
  }

  handleFieldChange = e => {
    const fieldName = e.currentTarget.name
    this[fieldName] =  e.currentTarget.value
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}Error`] = false
  }

  setPassVisible = () => {
    this.isPassVisible = true
  }
  setPassUnvisible = () => {
    this.isPassVisible = false
  }

  tryLogin = () => {
    const { authStore } = this.props
    let isError = false

    //Sure we should validate these on server
    if (!matchEmail(this.email)) { isError = true; this.emailError = "It isn't email" }
    if (this.email === '')       { isError = true; this.emailError = "Shouldn't be empty" }
    if (this.password === '')    { isError = true; this.passwordError = "Shouldn't be empty" }

    if (!isError) {
      authStore.tryLogin(this.email, this.password)
    }
  }

  render() {
    const { authStore } = this.props
    if (authStore.token) return <Redirect to='/feed' />

    return (
      <Auth>
        <Typography as="h3">Login with Mobx</Typography>
        <Field
          name='email'
          placeholder='your@email.com'
          label='Email'
          value={this.email}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.emailError}
        />
        <Field
          name='password'
          placeholder='Type a few ***'
          label='Password'
          type={this.isPassVisible ? 'text' : 'password'}
          value={this.password}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.passwordError}
          icon={
            <FontAwesomeIcon onMouseDown={this.setPassVisible} onMouseUp={this.setPassUnvisible} icon={['far', 'eye']}/>
          }
        />
        <BottomButtons>
          <Button onClick={this.tryLogin}>Login</Button>
          <RegisterWrapper>
            Don't have an account? <Link to='/register'><StyledTypo>Register</StyledTypo></Link>
          </RegisterWrapper>
        </BottomButtons>
        {authStore.error && <Message content={authStore.error} status='error'/>}

        {/* There is some problem with successful registration coz Mobx vs Redux states
        and we cannot use location.state.success coz it saves through page reload - and we dont want that

        We can pass redux 'success' to Mobx state but not now (((= We should wrap component also to 'connect' but im too lazy for it now
        */}
        { false && <Message content={'Registration successful'} status='success'/>}
      </Auth>
    )
  }
}

export default inject('authStore')(observer(Login))
