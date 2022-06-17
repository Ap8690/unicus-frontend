import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  GET_TYPE_OF_NFT,
  GET_COUNTDOWN,
  GET_NETWORK_ID,
  GET_ASSET_DATA,
  ACCESS_TOKEN,
  USER_INFO,
  REGISTER_WALLET,
  USER_ADDRESS,
} from '../constants'
import { backendUrl, bscChain, bscChainHex, ethChain, ethChainHex, polygonChainHex } from '../../config'
// import web3 from '../../web3'



//actions

export const getNetwork = (id: string) => async (dispatch: any) => {
  localStorage.setItem('networkID', id)
  dispatch({
    type: GET_NETWORK_ID,
    payload: id,
  })
}



export const getaccessToken = (data: any) => async (dispatch: any) => {
  dispatch({
    type: ACCESS_TOKEN,
    payload: data,
  })
}

export const getUserInfo = (data: any) => async (dispatch: any) => {
  dispatch({
    type: USER_INFO,
    payload: data,
  })
}