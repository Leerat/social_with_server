import React, { Component } from 'react'
import styled from 'styled-components'
import { observable } from 'mobx'
import { observer, inject } from "mobx-react"

import theme from 'UI/theme'
import Img from 'UI/Img'
import Typography from 'UI/Typography'
import Button from 'UI/Button'

const StyledUser = styled.div`
  border-radius: 16px;
  background: linear-gradient(135deg, #fff 66%,#fae4d6 100%);
  margin: ${theme.multiInterval(1.5)} 0;
  transition: all 300ms ease-in-out;
  opacity: ${props => props.loaded ? 1 : 0.01};
  transform: translateY(${props => props.loaded ? 0 : '25px'});
  overflow: hidden;
  position: relative;
  box-shadow: 0px 16px 25px 0px rgba(118, 88, 198, 0.1);
`

const Content = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: ${theme.interval};
`

const StyledUsername = styled(Typography)`
  font-size: 21px;
`

const StyledNumber = styled(Typography)`
  font-size: 14px;
  color: #999;
  display: block;
  margin-top: ${theme.multiInterval(0.5)};
`

const Friends = styled.span`
  // position: absolute;
  // right: ${theme.interval};
  // top: ${theme.interval};
  color: ${theme.green};
  
`

const FollowButtons = styled.div`
  position: absolute;
  bottom: ${theme.interval};
  right: ${theme.interval};
`

class User extends Component {
  @observable loaded

  componentDidMount () {
    const { index } = this.props
    setTimeout(()=>this.loaded = true, (index||0)*50)
  }

  handleFollow = () => {
    const { user, usersStore } = this.props //Not optimal to inject 'usersStore' once more
    usersStore.handleFollow(user, 'follow')
  }

  // Here good example of testing project
  // Actually we should keep all requests and, in additional, rejections for them
  // But we just removing requests form db
  handleReject = () => {
    const { user, usersStore } = this.props
    usersStore.handleFollow(user, 'reject')
  }

  render(){
    const { user, index, authStore } = this.props
    const ownerId = authStore.ownerId
    const isRequested = user.requestFromYou.includes(ownerId)
    const hasRequestToYou = user.requestToYou.includes(ownerId)

    return (
      <StyledUser loaded={this.loaded}>
        <Img src={`https://randomuser.me/api/portraits/men/${index}.jpg`} width='120' height='120' />
        <Content>
          <div><StyledUsername as='span'>{`${user.firstname} ${user.lastname}`}</StyledUsername></div>
          <div><StyledNumber>{`His number is ${user.id}`}</StyledNumber></div>
        </Content>
        <FollowButtons>
          {!isRequested && hasRequestToYou && (
            <span>He want to be friends <Button basic content='reject' color='red' onClick={this.handleReject}/> or </span>
          )}
          {isRequested && hasRequestToYou && <Friends>You are already friends </Friends>}
          <Button
            basic
            color={isRequested ? 'red' : 'green'}
            onClick={this.handleFollow}
            content={isRequested ? 'unfollow x' : 'follow +'}
          />
        </FollowButtons>
      </StyledUser>
    )
  }
}

export default inject(['usersStore'],['authStore'])(observer(User)) //Not optimal to inject once more
