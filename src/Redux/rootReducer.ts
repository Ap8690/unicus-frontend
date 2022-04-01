import {combineReducers} from 'redux'
import {marketPlaceReducer} from './MarketPlace/reducers'
import {profileReducer} from './Profile/reducers'

const rootReducer = combineReducers({
  profile: profileReducer,
  marketPlace: marketPlaceReducer,
})

export default rootReducer
