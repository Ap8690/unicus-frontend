import './connectwallet.scss'

import { useContext } from 'react'
import { Web3Context } from '../../context/Web3Context'

import metamaskLogo from '../../assets/svgs/metamask.svg'
import coinbaseLogo from '../../assets/svgs/coinbase.svg'
import mewLogo from '../../assets/svgs/myetherwallet.svg'
import walletconnectLogo from '../../assets/svgs/walletconnect.svg'

const ConnectWallet = () => {
  const { connectMetamask } = useContext(Web3Context)

  return (
      <div className='connect-wallet-page'>
          <div className="connect-wrapper">
            <div className="using-email">
                <div className="blue-head">Connect using Email</div>
                <button className="large-btn-outline">
                    Login
                </button>
                <button className="large-btn-outline">
                    Register
                </button>
            </div>
            <div className="using-wallets">
                <div className="blue-head">Connect using Wallet</div>
                <div className='wallet-text'>Connect with one of our available wallet providers or create a new one  </div>
                <div className='wallets'>
                    <button onClick={connectMetamask}>
                        Metamask
                        <img src={metamaskLogo} alt="metamask" />
                    </button>
                    <button>
                        Coinbase
                        <img src={coinbaseLogo} alt="metamask" />
                    </button>
                    <button>
                        WalletConnect
                        <img src={walletconnectLogo} alt="metamask" />
                    </button>
                    <button>
                        MEW
                        <img src={mewLogo} alt="metamask" />
                    </button>
                </div>
            </div>
          </div>
      </div>
  )
}

export default ConnectWallet