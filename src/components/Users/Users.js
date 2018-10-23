import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import User from 'components/User'

const UsersList = observer( ({users}) => users.map( (user, index) => <User user={user} key={user.id} index={index} />) )

@inject('usersStore')
@observer
export default class Users extends Component {

  componentDidMount () {
    const { usersStore } = this.props
    usersStore.getUsers()
  }

  render() {
    const { usersStore } = this.props

    return (
      <div>
        <UsersList users={usersStore.users} />
      </div>
    )
  }
}
