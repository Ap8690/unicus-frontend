import {useContext} from 'react'
import {ChainContext} from '../../context/ChainContext'
import {capitalize} from '../../utils/helpers'
import * as Ethereum from "../../assets/blockchain-logo/ethereumLogo.svg"
import * as Binance from "../../assets/blockchain-logo/binanceLogo.svg"
import * as Polygon from "../../assets/blockchain-logo/polygonLogo.svg"
import * as Avalanche from "../../assets/blockchain-logo/avalancheLogo.svg"
import * as Tron from "../../assets/blockchain-logo/tronLogo.svg"
import * as Near from "../../assets/blockchain-logo/nearLogo.svg"
import * as Solana from "../../assets/blockchain-logo/solanaLogo.svg"

const ChainLogo = () => {
  const {chain} = useContext(ChainContext)
  console.log("chain: ", capitalize(chain));
  return (
    chain ? <img src={capitalize(chain)} /> : null
  )
}

export default ChainLogo