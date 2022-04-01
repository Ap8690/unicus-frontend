import { bscChain } from '../../config'
import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  GET_TYPE_OF_NFT,
  GET_NETWORK_ID,
  GET_ASSET_DATA,
  PROVIDER,
  ACCESS_TOKEN,
  USER_INFO,
  REGISTER_WALLET,
  USER_ADDRESS,
} from '../constants'

const initialState = {
  profileLoading: false,
  profileError: false,
  userAddress: '',
  walletType: 'MetaMask',
  availableBalance: 0,
  nftCardType: null,
  networkID: localStorage.getItem('networkID') || bscChain,
  assetInfo: {},
  provider: null,
  accessToken: '',
  userInfo: '',
  registerWallet: false
}

export const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case PROVIDER:
      return {
        ...state,
        provider: action.payload,
      }
    case GET_ASSET_DATA:
      return {
        ...state,
        assetInfo: action.payload,
      }
    case GET_TYPE_OF_NFT:
      return {
        ...state,
        nftCardType: action.payload,
      }
    case GET_NETWORK_ID:
      return {
        ...state,
        networkID: action.payload,
      }
    case CONNECT_WALLET:
      return {
        ...state,
        userAddress: action.payload,
        walletType: action.walletType,
      }
    case PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        profileError: false,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
      }
    case REGISTER_WALLET:
      return {
        ...state,
        registerWallet: action.payload,
      }
    case ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      }
    case USER_ADDRESS:
      return {
        ...state,
        userAddress: action.payload,
      }
    case USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      }
    case PROFILE_FAIL:
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload,
      }

    default:
      return state
  }
}
