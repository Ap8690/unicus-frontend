import Web3 from "web3";
import Web3Token from "web3-token";
import toast from 'react-hot-toast';

// Connection to MetaMask wallet (you can actually use any wallet)
// you can even use ethersjs instead of web3
const web3 = new Web3(window?.ethereum);


// EVM WALLET CONNECT
export const connectWallet = async () => {
    try {
        if (!window.ethereum) toast.success("Please Install Metamask");
        // connection to metamask wallet
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const chainId = await web3.eth.getChainId()
        // getting address from which we will sign message
        const address = await web3.eth.getAccounts();
        // generating a token with 3 day of expiration time
        // @ts-ignore
        const token = await Web3Token.sign((msg: any) => web3.eth.personal.sign(msg, address[0]),"3 days");
        //send above token to backend
        let loginResponse : any;
        // const loginResponse = await AuthServices.login({
        //     address: address[0],
        //     token: token,
        // });
        // storeInformation(loginResponse?.data.user);
        toast.success("Welcome ")
        return loginResponse?.data.user;
    } catch (err) {
        console.log(err);
    }
};


export const  switchChain = async() =>{
    const web3 = new Web3(Web3.givenProvider)
    const chainId = await web3.eth.getChainId()
    if(Number(chainId) !== Number(process.env.REACT_APP_CHAIN_ID)){
        try {
            toast.success("Please switch to Polygon")
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
            })
        } catch (err) {
            if (err.code === 4902)
                window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x13881",
                        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                        chainName: "Polygon Testnet Mumbai",
                        nativeCurrency: {
                          name: "tMATIC",
                          symbol: "tMATIC", // 2-6 characters long
                          decimals: 18,
                        },
                        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                      },
                    ],
                });
        }
    }
}