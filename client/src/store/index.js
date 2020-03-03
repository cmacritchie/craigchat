import { combineReducers } from 'redux'
import { reducer as userReducer } from './userReducer'
import { reducer as roomReducer } from './roomReducer'

export default combineReducers({
    user:userReducer,
    room:roomReducer
})