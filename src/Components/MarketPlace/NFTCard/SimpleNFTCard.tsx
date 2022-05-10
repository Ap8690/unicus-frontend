import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ViewModal from '../../Modals/ViewModal/ViewModal';
import { ReactComponent as AiFillEye } from "../../Assets/react-icons/AiFillEye.svg";
import { sslFix } from '../../../Utilities/Util';
import { bscChain, ethChain, polygonChain } from '../../../config';
import { createNFTAddressB } from '../../../Redux/Blockchain/Binance/createNFT';
import { createNFTAddressE } from '../../../Redux/Blockchain/Ethereum/createNFT';
import { createNFTAddressP } from '../../../Redux/Blockchain/Polygon/createNFT';


const SimpleNFTCard = ({item, path}) => {
    const [price, setprice] = useState("");
    const [projectLoaded, setprojectLoaded] = useState(false);
    const [viewModal, setviewModal] = useState(false);    
  const [contractAddress, setcontractAddress] = useState("");
useEffect(() => {
 if (item.chain.toString() == bscChain) {
   setcontractAddress(createNFTAddressB);
 } else if (item.chain.toString() == ethChain) {
   setcontractAddress(createNFTAddressE);
 } else if (item.chain.toString() == polygonChain) {
   setcontractAddress(createNFTAddressP);
 }
 console.log("chain", bscChain);
 
}, []);
  return (
    <>
      <div
        className={`ms-4 nft_card simple ${projectLoaded ? "" : "loading"} `}
      >
        <Link
          to={{
            pathname: `/${path}/${item.chain}/${contractAddress}/${item.tokenId}`,
          }}
        >
          <div className="nft_card_image_wrapper">
            {!projectLoaded && <div className="nft_card_image skeleton"></div>}
            {
              <div
                className="nft_card_image simple"
                style={projectLoaded ? {} : { display: "none" }}
              >
                <img
                  height={50}
                  src={sslFix(item.cloudinaryUrl)}
                  onLoad={() => setprojectLoaded(true)}
                  alt={item.name}
                />
              </div>
            }
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            marginTop: "-0.25rem",
          }}
        >
          <h6 title={item.name}>{item.name}</h6>

          <span
            className="hover"
            onClick={() => setviewModal(true)}
            style={{ display: "flex", alignItems: "center", gap: "7px" }}
          >
            <AiFillEye /> {item.views}
          </span>
        </div>
        <div></div>
      </div>
      <ViewModal
        show={viewModal}
        handleClose={() => setviewModal(false)}
        item={item}
      />
    </>
  );
}

export default SimpleNFTCard