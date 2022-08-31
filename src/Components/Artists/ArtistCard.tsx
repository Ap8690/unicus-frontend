import {Link} from 'react-router-dom'
import {ReactComponent as AiFillEye} from '../../Assets/react-icons/AiFillEye.svg'
import ViewModal from '../Modals/ViewModal/ViewModal'
// redux imports
import { useState, useEffect } from 'react'

const ArtistCard = ({item}: any) => {

  // // redux state
  const [viewModal, setviewModal] = useState(false)
  const [contractAddress, setcontractAddress] = useState("")
  const [projectLoaded, setprojectLoaded] = useState(false)

  useEffect(() => {
    if(item.chain == 56) {
      setcontractAddress("0x2f376c69feEC2a4cbb17a001EdB862573898E95a")
    } else if (item.chain == 1) {
      setcontractAddress("0x424bb7731c056a52b45CBD613Ef08c69c628735f")
    } else if (item.chain == 137) {
      setcontractAddress("0x1549EabD2a47762413ee1A11e667E67A5825ff44")
    }
  }, [])

  return (
    <>
      <div className={(item.sellerInfo && projectLoaded) ? 'auction_card nft_card loading' : (projectLoaded ? 'nft_card loading' : 'nft_card')}>
        <div className='nft_card_image_wrapper'>
        <Link to={item.sellerInfo ? `/nft/${item.chain}/${contractAddress}/${item.tokenId}` : `/nft/${item.chain}/${contractAddress}/${item.tokenId}`}>
        {(!projectLoaded && item.cloudinaryUrl.split('.').pop() !== "mp4") && (
            <div className='nft_card_image' style={{"height":"260px"}}></div>
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
        </Link>
        </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '-0.25rem'}}>
            <h6 title={item?.name}>{item?.name}</h6>
            <span className="hover" onClick={() => setviewModal(true)} style={{display: 'flex', alignItems: 'center', gap: '7px'}}><AiFillEye /> {item.views}</span>
          </div>
<ViewModal
          show={viewModal}
          handleClose={() => setviewModal(false)}
          nftId={item.sellerInfo ? item.nftId : item._id}
      />
      </div>
    </>
  )
}


export default ArtistCard
