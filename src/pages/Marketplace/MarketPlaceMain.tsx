import {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import marketPlaceImage from "../../assets/images/marketPlaceMain.png";
import {getUserInfo} from "../../utils/utils"
import {ChainContext} from "../../context/ChainContext"

const MarketPlaceMain = ({ saleStats, storeTitle, noStats, noBanner = false }) => {
  const {setShowChains} = useContext(ChainContext)
  let navigate = useNavigate();
  const handleNavigateCreateNft = () => {
    getUserInfo() ? navigate("/create-nft") : setShowChains(true)
  }
  return (
    <div className="market-place-main">
      <div className="market">
        <div className="market-place-main-text">
          <h2 className="market-place-main-heading">
            {storeTitle}
          </h2>
          <p className="market-place-main-intro">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquid
            autem ad quia sint provident ut voluptas ea, facere molestiae vitae
          </p>
          <div className="market-place-main-button-holder">
            <button onClick={() => navigate("/explore")} className="btn nav-link">Explore Now</button>
            <button onClick={handleNavigateCreateNft} className="create">Create</button>
          </div>
          {!noStats &&
            <div className="market-place-main-stats">
              <div className="market-place-main-stat">
                <p className="stat-number">{saleStats.artworks}+</p>
                Artworks
              </div>
              <div className="market-place-main-stat">
                <p className="stat-number">{saleStats.artists}+</p>
                Artists
              </div>
              <div className="market-place-main-stat">
                <p className="stat-number">{saleStats.auctions}+</p>
                Auctions
              </div>
            </div>
          }
        </div>
        <img src={marketPlaceImage} alt="Market Place Main" />
      </div>
      {/* {!noBanner && <div className="market-place-banner">
        <img src={banner} alt="Banner" />
      </div>} */}
    </div>
  );
};

export default MarketPlaceMain;
