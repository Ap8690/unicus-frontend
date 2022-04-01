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
import getContracts, {
  ethereumCoinbase,
  walletLink,
  metaMaskProvider,
  walletConnectorProvider,
} from '../Blockchain/contracts'
import {MEWethereum} from '../Blockchain/mewConfig'
import Web3 from 'web3'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { bscChain, bscChainHex, ethChain, ethChainHex, polygonChainHex } from '../../config'

export const getNftType = (id: number) => async (dispatch: any) => {
  dispatch({
    type: GET_TYPE_OF_NFT,
    payload: id,
  })
}
export const getNftCountdown =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      const {
        profile: {walletType, networkID},
      } = getState()
      const {web3, auction} = getContracts(walletType, networkID)
      const transaction = await auction.methods
        .timeLeftForAuctionToEnd(id)
        .call()
      return transaction
    } catch (error: any) {
      console.log(error?.message)
    }
  }

export const getNetwork = (id: string) => async (dispatch: any) => {
  localStorage.setItem('networkID', id)
  dispatch({
    type: GET_NETWORK_ID,
    payload: id,
  })
}

export const getRegisterWallet = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: REGISTER_WALLET,
    payload: value,
  })
}

export const getaccessToken = (data: any) => async (dispatch: any) => {
  dispatch({
    type: ACCESS_TOKEN,
    payload: data,
  })
}

export const getuserAddress = (data: any) => async (dispatch: any) => {
  dispatch({
    type: USER_ADDRESS,
    payload: data,
  })
}

export const getUserInfo = (data: any) => async (dispatch: any) => {
  dispatch({
    type: USER_INFO,
    payload: data,
  })
}

export const setNetwork = () => async (dispatch: any, getState: any) => {
  const get = localStorage.getItem('networkID')

  if (get) {
    dispatch({
      type: GET_NETWORK_ID,
      payload: get,
    })
  } else {
    localStorage.setItem('networkID', bscChain)
  }
}

export const setAssetData =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: GET_ASSET_DATA,
      payload: data,
    })
  }

const data = [
  {
    chainId: polygonChainHex,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
]
const bnb = [
  {
    chainId: bscChainHex,
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
]

const ethereum = [
  {
    chainId: ethChainHex,
    chainName: 'Ethereum ',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0'],
    blockExplorerUrls: ['https://etherscan.io/'],
  },
]

const polygon = [
  {
    chainId: polygonChainHex,
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://polygon-mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
    ],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
]

// actions
export const AddNetworks = (network: any) => async (dispatch: any) => {
  try {
    await metaMaskProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId:
            network === 'ethereum'
              ? ethereum[0]?.chainId
              : network === 'bnb'
              ? bnb[0]?.chainId
              : network === 'polygon'
              ? polygon[0]?.chainId
              : null,
        },
      ],
    })
  } catch (error: any) {
    if (error?.code === 4902) {
      try {
        await metaMaskProvider.request({
          method: 'wallet_addEthereumChain',
          params:
            network === 'ethereum'
              ? ethereum
              : network === 'bnb'
              ? bnb
              : network === 'polygon'
              ? polygon
              : null,
        })
      } catch (addError: any) {
        console.error(addError?.message)
      }
    }
  }
}

export const checkAndAddNetwork = (data: any) => async (dispatch: any) => {
  try {
    await metaMaskProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId: data[0]?.chainId}],
    })
  } catch (error: any) {
    console.log(error)
    if (error?.code === 4902) {
      try {
        await metaMaskProvider.request({
          method: 'wallet_addEthereumChain',
          params: data,
        })
      } catch (addError: any) {
        console.error(addError?.message)
      }
    }
  }
}

export const connToMetaMask = () => async (dispatch: any, getState: any) => {
  try {
    const get = localStorage.getItem('networkID')
    const web3 = new Web3(Web3.givenProvider)
    const id = web3.eth.net.getId()
    const networkID = await Promise.all([id])
    if (get) {
      dispatch(
        checkAndAddNetwork(
          get == ethChain ? ethereum : get == bscChain ? bnb : polygon
        )
      )
    } else if (Number(get) !== networkID[0]) {
      dispatch(checkAndAddNetwork(bnb))
    }
    const accounts = await metaMaskProvider.request({
      method: 'eth_requestAccounts',
    })

    localStorage.setItem('walletType', 'Metamask')
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts?.[0],
      walletType: 'MetaMask',
    })
  } catch (error: any) {
    console.error(error?.message)
  }
}

export const connToCoinbase = () => async (dispatch: any) => {
  try {
    // dispatch(checkAndAddNetwork())
    const accounts = await ethereumCoinbase.enable()
    // coinbaseWeb3.eth.defaultAccount = accounts[0]
    localStorage.setItem('walletType', 'Coinbase')
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: 'Coinbase',
    })
  } catch (error: any) {
    console.error(error?.message)
  }
}

export const connToWalletConnector =
  () => async (dispatch: any, getState: any) => {
    try {
      const accounts = await walletConnectorProvider.enable()
      localStorage.setItem('walletType', 'WalletConnect')
      dispatch({
        type: CONNECT_WALLET,
        payload: accounts[0],
        walletType: 'WalletConnector',
      })
    } catch (error: any) {
      console.error(error?.message)
    }
  }

export const connToMEW = () => async (dispatch: any) => {
  try {
    const accounts = await MEWethereum.request({
      method: 'eth_requestAccounts',
    })
    localStorage.setItem('walletType', 'MEW')

    // const acc = await web3.eth.getAccounts()

    // const accounts = await ethereumCoinbase.enable()
    // const accounts = await web3.eth.getAccounts();
    // const accounts = await metaMaskProvider.request({
    //   method: 'eth_requestAccounts',
    // })
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: 'MEW',
    })
  } catch (error: any) {
    console.error(error?.message)
  }
}

export const disConnectWallet = () => async () => {
  localStorage.removeItem('walletType')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userAddress')
  // web3.currentProvider._handleDisconnect()
  walletConnectorProvider.disconnect()
  walletLink.disconnect()
}

export const getProfileInformation =
  () => async (dispatch: any, getState: any) => {
    try {
      const {
        profile: {userAddress, walletType},
      } = getState()
      dispatch({
        type: PROFILE_REQUEST,
      })
      // const {web3} = getContracts(walletType)
      dispatch({
        type: PROFILE_SUCCESS,
      })
    } catch (error: any) {
      dispatch({
        type: PROFILE_FAIL,
        payload: error?.message,
      })
    }
  }
