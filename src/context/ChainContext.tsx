import { createContext, useEffect, useState } from "react";
import {ChainIdUsingWalletName,getChainName} from "../utils/utils"

export type ChainContextType = {
	chain: string | null
	setChain: (value: string) => void
  showChains?: boolean
  setShowChains?: (value: boolean) => void
}
export const ChainContext = createContext<ChainContextType | null>(null)
 
export const ChainProvider = ({children}) => {
  const [chain, setChain] = useState('all')
  const [showChains,setShowChains] = useState(false)
  
  useEffect(() => {
    if(localStorage.getItem("walletChain"))
      setChain(getChainName(localStorage.getItem("walletChain")))
  },[localStorage.getItem("walletChain")])

  return(
      <ChainContext.Provider value={{ chain, setChain, showChains, setShowChains }}>
          {children}
      </ChainContext.Provider>
  )
}