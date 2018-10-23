import { createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk'

import AuthReducer from 'components/Auth/AuthReducer'

const reducers = combineReducers({
  auth: AuthReducer
})

const enhancer = applyMiddleware(thunk, apiMiddleware)

const storeRedux = createStore(reducers, {}, enhancer)
export default storeRedux
