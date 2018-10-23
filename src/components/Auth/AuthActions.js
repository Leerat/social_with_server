import { RSAA } from 'redux-api-middleware'

export const REQUEST = '_REQUEST'
export const SUCCESS = '_SUCCESS'
export const FAILURE = '_FAILURE'
export const TRY_REGISTER = 'TRY_REGISTER'

//Do we want to use thunk here, dont we?
export const tryRegister = (email, password, firstname, lastname) => ({
  [RSAA]: {
    types: [TRY_REGISTER+REQUEST, TRY_REGISTER+SUCCESS, TRY_REGISTER+FAILURE],
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    endpoint: '/api/auth/register',
    body: JSON.stringify({
      email, password, firstname, lastname
    })
  }
})
