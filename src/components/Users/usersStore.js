import { observable, action, computed } from 'mobx'

import fetcher from 'utils/fetcher'
import normalize from 'utils/normalize'

import { authStore } from 'components/Auth/authStore'


class UsersStore {
  @observable usersList = [] //Surelly we should normalizr these store but...

  @action
  getUsers = async () => {
    const resp = await fetcher.get('/api/users/')
    const json = await resp.json()
    this.usersList = json.data //Surelly we should normalizr these store but...
  }

  @computed get users() {
    const ownerId = authStore.ownerId
    return this.usersList.filter(user => user.id != ownerId)
  }

  //Some experiments
  @computed get normalUsers() {
    return normalize(this.usersList)
  }

  // Not the best decision with 'work method' of function =(((
  // Should be two functions with shader code of third
  @action
  handleFollow = async (targetUser, method) => {
    const ownerId = authStore.ownerId
    const requestedUser = this.usersList.find( user => user.id == targetUser.id )
    const request = method === 'follow' ? requestedUser.requestFromYou : requestedUser.requestToYou
    const isRequestedAlready = request.includes(ownerId)

    const body = () => {
      if (isRequestedAlready  && method === 'follow') return {requestFromYou: request.filter( id => id != ownerId )}
      if (!isRequestedAlready && method === 'follow') return {requestFromYou: [...request, ownerId]}
      if (isRequestedAlready  && method === 'reject') return {requestToYou: request.filter( id => id != ownerId )}
    }

    const resp = await fetcher.put(`/api/users/${targetUser.id}`, body())
    const json = await resp.json()

    const index = this.usersList.findIndex(user => user.id == json.data.id)
    this.usersList[index] = json.data
  }
}

export let usersStore = new UsersStore()
