// import React from 'react'
import {ReactComponent as CgClose} from "../../../Assets/react-icons/CgClose.svg"
import {Image, Modal} from 'react-bootstrap'
import {ReactComponent as VscCloudDownload} from "../../../Assets/react-icons/VscCloudDownload.svg"
// image
import MetaMaskFox from '../../../Assets/MetaMask.svg'
import tronLink from "../../../Assets/tron-link.svg"
import { useSelector } from "react-redux"
import { tronChain } from "../../../config"
import { WalletsPopupProps, TRONLINK, METAMASK } from "../../../utils/utils"

const WalletNotFound = ({show, handleClose}: WalletsPopupProps) => {
   const {
     
     networkID,
     
   } = useSelector((state: any) => state.profile);
  return (
    <Modal
      className="buy__token__modal metaMaskNotFound"
      show={show}
      onHide={handleClose}
    >
      <div className="buy__cpt__modal">
        <div className="buy__cpt__header">
          <div className="buy__cpt__header__tile">
            <h4>{networkID === tronChain ? TRONLINK : METAMASK} Not Found</h4>
          </div>
          <div className="buy__cpt__header__close" onClick={handleClose}>
            <CgClose />
          </div>
        </div>
        <div className="metaMask__body">
          <Image src={networkID=== tronChain? tronLink:MetaMaskFox} alt="" />
          <h5>
            Please Install {networkID === tronChain ? TRONLINK : METAMASK}
          </h5>
          <VscCloudDownload />
          <a
            href={
              networkID === tronChain
              ?"https://www.tronlink.org/" 
              :"https://metamask.io/download.html"
                
            }
            target="_blank"
            className="download mt-2"
            rel="noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default WalletNotFound
