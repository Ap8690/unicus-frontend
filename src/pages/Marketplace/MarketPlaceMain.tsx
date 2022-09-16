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
            Your Go-To Platform to Tokenise Valuable Assets with Multi-Chain options across various Business and Collectible Categories and Trade/Auction them seamlessly with complete decentralisation
          </p>
          <div className="market-place-main-button-holder">
            <button onClick={() => navigate("/explore")} className="btn nav-link">Explore Now</button>
            <button onClick={handleNavigateCreateNft} className="create">Tokenise Asset</button>
          </div>
          {!noStats &&
            <div className="market-place-main-stats">
              <div className="market-place-main-stat">
                <p className="stat-number nowrap">{saleStats.artworks}</p>
                Assets<br/>
                Artworks
              </div>
              <div className="market-place-main-stat">
                <p className="stat-number nowrap">{saleStats.artists}</p>
                Categories<br/>
                Artists
              </div>
              <div className="market-place-main-stat">
                <p className="stat-number nowrap">{saleStats.auctions}</p>
                Networks<br/>
                Auctions
              </div>
            </div>
          }
        </div>
        <img src={marketPlaceImage} alt="Market Place Main" />
      </div>
    </div>
  );
};

export default MarketPlaceMain;
