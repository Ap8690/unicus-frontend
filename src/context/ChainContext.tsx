import { createContext, useEffect, useState } from "react";
import {ChainIdUsingWalletName,getChainName} from "../utils/utils"

export type ChainContextType = {
	chain: string | null
	setChain: (value: string) => void;
}
export const ChainContext = createContext<ChainContextType | null>(null)

export const ChainProvider = ({children}) => {
  const [chain, setChain] = useState('ethereum')
  
  useEffect(() => {
    setChain(getChainName(ChainIdUsingWalletName(localStorage.getItem("walletChain"))))
  },[localStorage.getItem("walletChain")])
  return(
      <ChainContext.Provider value={{ chain, setChain }}>
          {children}
      </ChainContext.Provider>
  )
}