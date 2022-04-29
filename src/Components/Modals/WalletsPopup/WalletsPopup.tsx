import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Image, Modal } from "react-bootstrap";
import { ReactComponent as CgClose } from "../../../Assets/react-icons/CgClose.svg";
import MetaMaskNotFound from "../MetaMaskNotFound/MetaMaskNotFound";
import { backendUrl, tronChain } from "../../../config";

// image
import MetaMaskFox from "../../../Assets/MetaMask.svg";
import Coinbase_wallet from "../../../Assets/coinbase_Wallet.svg";
import walletConnect_wallet from "../../../Assets/LandingPage/WalletConnectCircle.svg";
import mew_wallet from "../../../Assets/mew.svg";
import tronLink from "../../../Assets/tron-link.svg"

// redux imports
import { useDispatch } from "react-redux";
import {
  connToMetaMask,
  connToCoinbase,
  connToWalletConnector,
  connToMEW,
  connToSequence,
  connToTronlink
} from "../../../Redux/Profile/actions";

// providers
import { metaMaskProvider, tronWeb } from "../../../Redux/Blockchain/contracts";
import LoginPopUp from "../Auth/Login";
import RegisterPopUp from "../Auth/Register";
import axios from "axios";
import {
  AddNetworks,
  getNetwork,
  getUserInfo,
  getaccessToken,
  getuserAddress,
} from "../../../Redux/Profile/actions";
import web3 from "../../../web3";
import DefaultErrorModal from "../DefaultErrorModal";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import {connectWallet} from "../../../Utilities/Util";

const WalletsPopup = (props: any) => {
  const [meatMaskShow, setMeatMaskShow] = useState(false);
  const [LoginPopUpShow, setLoginPopUpShow] = useState(false);
  const [RegisterPopUpShow, setRegisterPopUpShow] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const firstUpdate = useRef(true);
  const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false);
  const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>("");
  const dispatch = useDispatch();

  const connectToMetaMask = async () => {
    if (metaMaskProvider) {
      console.log("web3", await web3.eth.getAccounts());

      await web3.eth.getAccounts().then((walletAddress) => {
        axios
          .post(`${backendUrl}/auth/login`, {
            walletAddress: walletAddress[0],
          })
          .then((res: any) => {
            dispatch(connToMetaMask());
            dispatch(getaccessToken(res.data.accessToken));
            dispatch(getuserAddress(walletAddress[0]));
            localStorage.setItem("accessToken", res.data.accessToken);
            dispatch(getUserInfo(res.data.user));
            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            Cookies.set("accessToken", res.data.accessToken, {
              domain: "unicus.one",
            });
            Cookies.set("userInfo", JSON.stringify(res.data.user), {
              domain: "unicus.one",
            });
            props.handleClose();
            props.history.push(props.redirectUrl);
          })
          .catch((err: any) => {
            if (!walletAddress[0]) {
              dispatch(connToMetaMask());
              // setdefaultErrorMessage(
              //     'Login your Metamask Account'
              // )
              // setdefaultErrorModal(true)
            } else if (
              err.response &&
              err.response.data.msg.includes("Please verify your Email")
            ) {
              setdefaultErrorMessage(err.response.data.msg);
              setdefaultErrorModal(true);
            } else if (
              err.response &&
              err.response.data.msg.includes("Contact for Support")
            ) {
              setdefaultErrorMessage(err.response.data.msg);
              setdefaultErrorModal(true);
            } else {
              setwalletAddress(walletAddress[0]);
              setRegisterPopUpShow(true);
              console.log(err);
            }
            props.handleClose();
          });
      });
    } else {
      openMetaMaskModal();
    }
  };

  //   Connecting to Coinbase
  const connectToCoinbase = () => {
    props.handleClose();
    dispatch(connToCoinbase());
  };
  //   Connecting to WalletConnector
  const connectToWalletConnector = () => {
    props.handleClose();
    dispatch(connToWalletConnector());
  };
  //   Connecting to MEW
  const connectToMEW = () => {
    props.handleClose();
    dispatch(connToMEW());
  };
  //   Connecting to Sequence
  const connectToSequence = async () => {
    console.log("web3", await web3.eth.getAccounts());
    props.handleClose();
    dispatch(connToSequence());
  };

   //   Connecting to TronLink
  const connectToTronLink =async () => {
    //@ts-expect-error
    const tronWeb = window.tronWeb
    if(!tronWeb){
      setdefaultErrorMessage("Please Install TronLink");
      setdefaultErrorModal(true);
    }
    const address = tronWeb.defaultAddress.base58
    console.log("tronBal",await tronWeb.trx.getBalance(address))
    
    if(address){
    await axios
      .post(`${backendUrl}/auth/login`, {
        walletAddress: address,
      })
      .then((res) => {
        dispatch(AddNetworks("tron"));
        dispatch(getNetwork(tronChain));
        dispatch(getaccessToken(res.data.accessToken));
        dispatch(getuserAddress(address));
        localStorage.setItem("accessToken", res.data.accessToken);
        dispatch(getUserInfo(res.data.user));
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        Cookies.set("accessToken", res.data.accessToken, {
          domain: "unicus.one",
        });
        Cookies.set("userInfo", JSON.stringify(res.data.user), {
          domain: "unicus.one",
        });
        props.handleClose();
        props.history.push(props.redirectUrl);
      }).catch((err)=>{
        if(err.resposne && (err.response.data.msg.includes("verify") || err.response.data.msg.includes("Contact"))){
          setdefaultErrorMessage(err.response.data.msg);
          setdefaultErrorModal(true);
        }
        else{
          setwalletAddress(walletAddress[0]);
          setRegisterPopUpShow(true);
        }
        props.handleClose()
      });   
    }else{
      dispatch(connToTronlink());
    }
  };

  const handledefaultErrorModal = () => {
    setdefaultErrorModal(false);
  };

  //  MetaMAsk notfound PopUP
  const closeMetaMaskModal = () => {
    setMeatMaskShow(false);
  };
  const openMetaMaskModal = () => {
    setMeatMaskShow(true);
    props.handleClose();
  };

  const LoginPopUpShowFunc = () => {
    props.handleClose();
    setLoginPopUpShow(true);
  };

  const RegisterPopUpShowFunc = () => {
    props.handleClose();
    setRegisterPopUpShow(true);
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const res = localStorage.getItem("walletType");
    if (res === "Metamask") {
      dispatch(connToMetaMask());
    } else if (res === "Coinbase") {
      dispatch(connToCoinbase());
    } else if (res === "WalletConnect") {
      dispatch(connToWalletConnector());
    } else if (res === "MEW") {
      dispatch(connToMEW());
    }
    else if(res === "Tron"){
      dispatch(connToTronlink());
    }
  }, []);

  useEffect(() => {
    if (metaMaskProvider) {
      metaMaskProvider.on("chainChanged", () => {
        // props.history.push("/")
        window.location.reload();
      });
    }
  }, [metaMaskProvider]);

  return (
    <>
      <Modal
        className="buy__token__modal successModal wallets"
        show={props.show}
        onHide={props.handleClose}
      >
        <div className="buy__cpt__modal">
          <div className="buy__cpt__header">
            <div className="buy__cpt__header__tile mb-3">
              <h4>Connect Using Email</h4>
            </div>
            <div
              className="buy__cpt__header__close"
              onClick={props.handleClose}
            >
              <CgClose />
            </div>
          </div>
          <div className="success__body mb-4">
            <div className="wallet" onClick={LoginPopUpShowFunc}>
              <h5>
                {props.storeRegistration ? "Store Manager Login" : "Login"}
              </h5>
            </div>
            <div className="wallet" onClick={RegisterPopUpShowFunc}>
              <h5>
                {props.storeRegistration
                  ? "Store Manager Registration"
                  : "Register"}
              </h5>
            </div>
          </div>
          <div className="buy__cpt__header">
            <div className="buy__cpt__header__tile mb-3">
              <h4>Connect Using Wallet</h4>
            </div>
            <div
              className="buy__cpt__header__close"
              onClick={props.handleClose}
            >
              <CgClose />
            </div>
          </div>
          <div className="success__body">
            <div className="wallet" onClick={connectToMetaMask}>
              <h5>MetaMask</h5>
              <Image src={MetaMaskFox} alt="" />
            </div>
            <div className="wallet" onClick={connectToCoinbase}>
              <h5>Coinbase</h5>
              <Image src={Coinbase_wallet} alt="" />
            </div>
            <div className="wallet" onClick={connectToWalletConnector}>
              <h5>Walletconnect</h5>
              <Image src={walletConnect_wallet} alt="" />
            </div>
            <div className="wallet" onClick={connectToMEW}>
              <h5>MEW</h5>
              <Image src={mew_wallet} alt="" />
            </div>
            <div className="wallet" onClick={connectToTronLink}>
              <h5>TronLink</h5>
              <Image src={tronLink} alt="" />
            </div>
          </div>
        </div>
      </Modal>
      <MetaMaskNotFound show={meatMaskShow} handleClose={closeMetaMaskModal} />
      <LoginPopUp
        storeRegistration={props.storeRegistration}
        redirectUrl={props.redirectUrl}
        LoginPopUpShow={LoginPopUpShow}
        LoginPopUpClose={() => setLoginPopUpShow(false)}
      />
      <RegisterPopUp
        storeRegistration={props.storeRegistration}
        RegisterPopUpShow={RegisterPopUpShow}
        RegisterPopUpClose={() => setRegisterPopUpShow(false)}
        walletAddress={walletAddress}
      />
      <DefaultErrorModal
        DefaultErrorModalShow={defaultErrorModal}
        DefaultErrorModalClose={() => handledefaultErrorModal()}
        DefaultErrorMessage={defaultErrorMessage}
      />
    </>
  );
}

export default withRouter(WalletsPopup);
