import { TRY_REGISTER, SUCCESS, REQUEST, FAILURE } from 'components/Auth/AuthActions'

const defaultState = {
  id: null,
  token: null,
  loading: false,
  loaded: false,
  error: false,
  errorMessage: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TRY_REGISTER+REQUEST:
      return {
        ...state,
        loading: true
      }
    case TRY_REGISTER+SUCCESS:
      return {
        ...state,
        id: action.payload.data.id,
        loading: false
      }
    case TRY_REGISTER+FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.response.message
      }
    default:
      return {
        ...state
      }
  }
}
