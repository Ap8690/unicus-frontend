import {Image} from 'react-bootstrap'
import {ReactComponent as BsFillHandbagFill} from '../../../Assets/react-icons/BsFillHandbagFill.svg'
import {ReactComponent as AiFillEye} from '../../../Assets/react-icons/AiFillEye.svg'

// svg
import {Link} from 'react-router-dom'
// redux imports
import {useSelector, useDispatch} from 'react-redux'
import {getNftType} from '../../../Redux/Profile/actions'
import getContracts from '../../../Redux/Blockchain/contracts'
import {numberFormate} from '../../../Utilities/Util'
import { useState } from 'react'
import { useEffect } from 'react'
import ViewModal from '../../Modals/ViewModal/ViewModal'
import { bscChain, ethChain, polygonChain } from '../../../config'
// import WalletsPopup from '../../Modals/WalletsPopup/WalletsPopup'
// import DisConnect from '../../Modals/DisConnect/DisConnect'
// import {useEffect, useState} from 'react'

const MarketCard = ({item}: any) => {
  const {walletType, userAddress, profileLoading, networkID, userInfo} = useSelector(
    (state: any) => state.profile
  )

  // redux state
  const dispatch = useDispatch()
  const [price, setprice] = useState("")
  const [contractAddress, setcontractAddress] = useState("")
  const [viewModal, setviewModal] = useState(false)
  const [projectLoaded, setprojectLoaded] = useState(false)

  useEffect(() => {
    if(networkID === ethChain) {
      setprice("Eth")
    } else if (networkID === polygonChain){
      setprice("Matic")
    } else {
      setprice("BNB")
    }
  }, [])

  useEffect(() => {
    if(item.chain == bscChain) {
      setcontractAddress("0x2f376c69feEC2a4cbb17a001EdB862573898E95a")
    } else if (item.chain == ethChain) {
      setcontractAddress("0x424bb7731c056a52b45CBD613Ef08c69c628735f")
    } else if (item.chain == polygonChain) {
      setcontractAddress("0x1549EabD2a47762413ee1A11e667E67A5825ff44")
    }
  }, [])

  return (
    <>
      <div className={projectLoaded ? 'nft_card' : 'nft_card loading'}>
      <Link
  to={{
    pathname: (item.auctionType === "Sale") ? `/sale/${item.chain}/${contractAddress}/${item.tokenId}` : `/auction/${item.chain}/${contractAddress}/${item.tokenId}`
  }}>
            <div className='nft_card_image_wrapper'>
        {(!projectLoaded && item.cloudinaryUrl.split('.').pop() !== "mp4") && (
            <div className='nft_card_image skeleton'></div>
            )}
        {(<div className='nft_card_image' style={(projectLoaded && item.cloudinaryUrl.split('.').pop() !== "mp4") ? {} : {display: 'none'}}>
          <img src={item.cloudinaryUrl} onLoad={() => setprojectLoaded(true)} alt={item.name} />
        </div>)}
        {item.cloudinaryUrl.split('.').pop() == "mp4" && (
          <div className='nft_card_image'>
            <video width="100%" autoPlay loop>
              <source src={item.cloudinaryUrl} type="video/mp4" />
            </video>
          </div>
        )}
        </div>
        </Link>
        <h6 title={item.name}>{item.name}</h6>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '-0.25rem'}}>
          <h6>{(item && item?.lastBid) ? ((item?.lastBid)/Math.pow(10, 18)).toFixed(4) : ((item?.startBid)/Math.pow(10, 18)).toFixed(4)} {price}</h6>
          <span className="hover" onClick={() => setviewModal(true)} style={{display: 'flex', alignItems: 'center', gap: '7px'}}><AiFillEye /> {item.views}</span>
        </div>
        <div>
        <Link
  to={{
    pathname: (item.auctionType === "Sale") ? `/sale/${item.chain}/${contractAddress}/${item.tokenId}` : `/auction/${item.chain}/${contractAddress}/${item.tokenId}`
  }}>
            <button
              onClick={() => dispatch(getNftType(0))}
              className='btn_brand'
            >
              <BsFillHandbagFill />
              {(item.sellerInfo === userInfo.username && item.auctionType === "Sale") ? "End Sale" : (item.sellerInfo === userInfo.username && item.auctionType === "Auction") ? "End Auction" : (item.auctionType === "Auction" ? "Place Bid" : "Buy Now")}
            </button>
            </Link>
        </div>
      </div>
      <ViewModal
          show={viewModal}
          handleClose={() => setviewModal(false)}
          nftId={item.sellerInfo ? item.nftId : item._id}
      />
    </>
  )
}

export default MarketCard
