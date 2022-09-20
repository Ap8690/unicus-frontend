import {combineReducers} from 'redux'
import {profileReducer} from './Profile/reducers'

const rootReducer = combineReducers({
  profile: profileReducer,
})

export default rootReducer