import { createSelector } from 'reselect'

const getAuth = state => state.auth

export const getToken = createSelector(
  getAuth,
  auth => auth.token || false
)

export const getSuccess = createSelector(
  getAuth,
  auth => !!auth.id
)

export const getError = createSelector(
  getAuth,
  auth => auth.error ? ({error: auth.error, message: auth.errorMessage}) : false
)
