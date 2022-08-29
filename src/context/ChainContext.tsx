import { createContext, useState } from "react";

export type ChainContextType = {
	chain: string | null
	setChain: (value: string) => void;
}
export const ChainContext = createContext<ChainContextType | null>(null)

export const ChainProvider = ({children}) => {
  const [chain, setChain] = useState('ethereum')
  
  return(
      <ChainContext.Provider value={{ chain, setChain }}>
          {children}
      </ChainContext.Provider>
  )
}