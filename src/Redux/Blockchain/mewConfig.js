import MEWconnect from '@myetherwallet/mewconnect-web-client'

const RPC_URL = 'https://rinkeby-light.eth.linkpool.io/'

const CHAIN_ID = 4

// Initialize MEWconnect
export const mewConnect = new MEWconnect.Provider()

export const MEWethereum = mewConnect.makeWeb3Provider(CHAIN_ID, RPC_URL, true)
