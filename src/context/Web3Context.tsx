import { createContext, useState } from "react";

//@ts-ignore
export const Web3Context = createContext()

export const TransactionProvider = ({children}) => {
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const connectMetamask = async () => {
    setLoading(true)
    try{
        //@ts-ignore
        if(!window.ethereum) return alert("Please install Metamask")
        //@ts-ignore
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