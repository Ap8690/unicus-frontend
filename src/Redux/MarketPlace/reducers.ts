import { MARKET_NFTS_LOADED, AUCTION_NFTS_LOADED, GET_ALL_NFTS_SUCCESS } from './../constants';
import {
  GET_ALL_NFTS_FAIL,
  GET_MARKET_NFTS_SUCCESS,
  GET_AUCTION_NFTS_SUCCESS,
  GET_PORTFOLIO_NFTS_SUCCESS,
  PORTFOLIO_NFTS_LOADED,
  ALL_NFTS_LOADED,
  GET_ALL_NFTS_REQUEST,
} from '../constants'

const initialState = {
  allNFTS: [],
  marketNFTS: [],
  portfolioNFTS: [],
  auctionNFTS: [],
  marketNFTSLoaded: false,
  portfolioNFTSLoaded: false,
  allNFTSLoaded: false,
  auctionNFTSLoaded: false
}

export const marketPlaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
      case GET_MARKET_NFTS_SUCCESS:
        return {
          ...state,
          marketNFTS: [...state.marketNFTS, action.payload],
        }
      case GET_ALL_NFTS_SUCCESS:
        return {
          ...state,
          allNFTS: [...state.allNFTS, action.payload],
        }
      case GET_AUCTION_NFTS_SUCCESS:
        return {
          ...state,
          auctionNFTS: [...state.auctionNFTS, action.payload],
        }
      case MARKET_NFTS_LOADED:
        return {
          ...state,
          marketNFTSLoaded: true
        }
      case GET_PORTFOLIO_NFTS_SUCCESS:
        return {
          ...state,
          portfolioNFTS: [...state.portfolioNFTS, action.payload],
        }
      case PORTFOLIO_NFTS_LOADED:
        return {
          ...state,
          portfolioNFTSLoaded: true
        }
      case PORTFOLIO_NFTS_LOADED:
        return {
          ...state,
          lastPortId: action.payload
        }
      case AUCTION_NFTS_LOADED:
        return {
          ...state,
          auctionNFTSLoaded: true
        }
      case ALL_NFTS_LOADED:
        return {
          ...state,
          allNFTSLoaded: true
        }
    default:
      return state
  }
}
