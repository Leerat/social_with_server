import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import matchEmail from 'utils/matchEmail'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import Field from 'UI/Field'
import Button from 'UI/Button'
import Message from 'UI/Message'

import Auth from 'components/Auth'
import { tryRegister } from 'components/Auth/AuthActions'
import { getToken, getSuccess, getError } from 'components/Auth/AuthSelectors'

const LoginWrapper = styled.div`
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

class Register extends Component {

  state={
    formError: null,

    email: '',
    emailError: null,

    firstname: '',
    firstnameError: null,

    lastname: '',
    lastnameError: null,

    password: '',
    passwordError: null,
    isPassVisible: false,

    justRegistred: false
  }

  componentDidUpdate(){
    const { history, success } = this.props
    const { justRegistred } = this.state

    if(success && justRegistred) history.push('/login' ) // Here we can define location.state but there is some problem; check Login for it

    //Also we should redirect to /feed when there is 'token' but....
  }

  handleFieldChange = e => {
    const fieldName = e.currentTarget.name
    this.setState({[fieldName]: e.currentTarget.value})
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this.setState({[`${fieldName}Error`]: false})
  }

  setPassVisible = () => {
    this.setState({isPassVisible: true})
  }
  setPassUnvisible = () => {
    this.setState({isPassVisible: false})
  }

  tryLogin = () => {
    const { email, password, firstname, lastname } = this.state
    const { tryRegister, history } = this.props
    let isError = false

    //Sure we should validate these on server but....
    if (!matchEmail(email)) { isError = true; this.setState({emailError: "It isn't email"}) }
    if (email === '')       { isError = true; this.setState({emailError: "Shouldn't be empty"}) }
    if (firstname === '')   { isError = true; this.setState({firstnameError: "Shouldn't be empty"}) }
    if (lastname === '')    { isError = true; this.setState({lastnameError: "Shouldn't be empty"}) }
    if (password === '')    { isError = true; this.setState({passwordError: "Shouldn't be empty"}) }

    if (!isError) {
      tryRegister(email, password, firstname, lastname)
      this.setState({justRegistred: true})
    }
  }

  render() {
    const { error } = this.props

    return (
      <Auth>
        <Typography as="h3">Register with Redux</Typography>
        <Field
          name='email'
          placeholder='your@email.com'
          label='Email'
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.state.emailError}
        />
        <Field
          name='firstname'
          placeholder='John'
          label='Firstname'
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.state.firstnameError}
        />
        <Field
          name='lastname'
          placeholder='Dow'
          label='Lastname'
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.state.lastnameError}
        />
        <Field
          name='password'
          placeholder='A few ***'
          label='Password'
          type={this.state.isPassVisible ? 'text' : 'password'}
          value={this.state.password}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.state.passwordError}
          icon={
            <FontAwesomeIcon onMouseDown={this.setPassVisible} onMouseUp={this.setPassUnvisible} icon={['fal', 'eye']}/>
          }
        />
        <BottomButtons>
          <Button onClick={this.tryLogin}>Register</Button>
          <LoginWrapper>
            Already have an account? <Link to='/login'><StyledTypo>Login</StyledTypo></Link>
          </LoginWrapper>
        </BottomButtons>
        {error && <Message status='error' content={error.message} />}
      </Auth>
    )
  }
}

const mstp = state => ({
  success: getSuccess(state),
  token: getToken(state),
  error: getError(state)
})
const mdtp = {
  tryRegister
}

export default connect(mstp, mdtp)(Register)
