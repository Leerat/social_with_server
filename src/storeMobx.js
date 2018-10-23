import { authStore } from 'components/Auth/authStore'
import { usersStore } from 'components/Users/usersStore'
import { feedStore } from 'components/Feed/feedStore'

const store = {
  authStore: authStore,
  usersStore: usersStore,
  feedStore: feedStore
}

export default store
