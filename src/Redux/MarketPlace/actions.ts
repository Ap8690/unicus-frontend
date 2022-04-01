import { AUCTION_NFTS_LOADED, MARKET_NFTS_LOADED, GET_ALL_NFTS_SUCCESS } from './../constants';
import {
  GET_ALL_NFTS_FAIL,
  GET_MARKET_NFTS_SUCCESS,
  GET_AUCTION_NFTS_SUCCESS,
  GET_PORTFOLIO_NFTS_SUCCESS,
  PORTFOLIO_NFTS_LOADED,
  ALL_NFTS_LOADED,
  GET_ALL_NFTS_REQUEST,
} from '../constants'
import getContracts from '../Blockchain/contracts'
import {gasPrice, priceConversion} from '../../Utilities/Util'

export const getAllNFTS = (data: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ALL_NFTS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getAuctionNFTS = (data: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_AUCTION_NFTS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getPortfolioNFTS = (data: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_PORTFOLIO_NFTS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getAllNFTSLoaded = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ALL_NFTS_LOADED,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getMarketNFTS = (data: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_MARKET_NFTS_SUCCESS,
      payload: data,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getmarketNFTSLoaded = () => async (dispatch: any) => {
  try {
    dispatch({
      type: MARKET_NFTS_LOADED,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getportfolioNFTSLoaded = () => async (dispatch: any) => {
  try {
    dispatch({
      type: PORTFOLIO_NFTS_LOADED,
    })
  } catch (error: any) {
    console.log(error)
  }
}

export const getauctionNFTSLoaded = () => async (dispatch: any) => {
  try {
    dispatch({
      type: AUCTION_NFTS_LOADED,
    })
  } catch (error: any) {
    console.log(error)
  }
}
