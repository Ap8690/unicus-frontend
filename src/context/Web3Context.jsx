import { createContext, useState } from "react";

export const Web3Context = createContext()

export const TransactionProvider = ({children}) => {
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const connectMetamask = async () => {
    setLoading(true)
    try{
        if(!window.ethereum) return alert("Please install Metamask")
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if(accounts.length){
            setWalletAddress(accounts[0])
        }
        setLoading(false)
    } catch (error) {
        console.error("Unable to connect Metamask Wallet ", error)
        setLoading(false)
    }
  }
  return(
      <Web3Context.Provider value={{connectMetamask, walletAddress, loading}} >
          {children}
      </Web3Context.Provider>
  )
}