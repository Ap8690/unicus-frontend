import "./viewnft.scss";

const NftInfo = ({
  filters,
  creator,
  activeFilter,
  setActiveFilter,
  historyData,
  topBid,
}) => {
  return (
    <div className="nft-info">
      <h2>Lorem Ipsum</h2>
      <div className="nft-price">
        <span>0.45 ETH</span>
        <span>$ 5768.6</span>
        <span>12 in stock</span>
      </div>
      <div className="nft-description">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore,
          quasi.
        </p>
        <button>Read More</button>
      </div>
      <div className="nft-creator">
        <span>Creator</span>
        <div>
          <img src={creator.img} alt="creator" className="user-img" />
          <span>{creator.name}</span>
        </div>
      </div>
      <div className="more-info">
        <div className="filters">
          {filters.map((filter) => (
            <button
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${
                filter === activeFilter ? "active" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* {activeFilter === 'History' && <History data={historyData} />} */}
        <History data={historyData} />
      </div>
      <div className="bid-buy-box">
        <div className="user-info">
          <img src={topBid.img} alt="top-bid" className="user-img" />
          <div>
            <span>
              Highest bid by <span className="blue-text">{topBid.name}</span>
            </span>
            <div className="price-info">
              <span className="blue-head">{topBid.bid} ETH</span>
              <span>${topBid.price}</span>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <button className="btn">Place a bid</button>
          <button className="btn-outline-blue">Purchase Now</button>
        </div>
        <span className="service-fee">Service fees 2%</span>
      </div>
    </div>
  );
};

const History = ({ data }) => {
  return (
    <div className="nft-history-box">
      {data.map((history) => (
        <div className="nft-history">
          <img className="user-img" src={history.img} alt={history.name} />
          <div>
            <div className="msg">{history.msg}</div>
            <div className="info">
              by {history.name} {history.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NftInfo;