// Images
import marketPlaceImage from "../../assets/images/marketPlaceMain.png";
import banner from "../../assets/images/marketPlaceMainBanner.png";

const MarketPlaceMain = ({ saleStats }) => {
  return (
    <div className="market-place-main">
      <div className="market-place-main-text">
        <h2 className="market-place-main-heading">
          Create, Sell & Collect Your Own Creative NFT
        </h2>
        <p className="market-place-main-intro">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi aliquid
          autem ad quia sint provident ut voluptas ea, facere molestiae vitae
        </p>
        <div className="market-place-main-button-holder">
          <button className="btn nav-link">Explore Now</button>
          <button className="create">Create</button>
        </div>
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
      </div>
      <img src={marketPlaceImage} alt="Market Place Main" />
      <div className="market-place-banner">
        <img src={banner} alt="Banner" />
      </div>
    </div>
  );
};

export default MarketPlaceMain;
