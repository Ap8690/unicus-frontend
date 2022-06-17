const AuctionsElement = ({ element }) => {
  return (
    <div className="auctions-element">
      <div className="auctions-element-item-image">
        <img src={element.image} alt={element.name} />
      </div>

      <div className="auctions-element-name">{element.name}</div>
      <div className="auctions-element-price">{element.price} ETH</div>
      <div className="auctions-element-creators">
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="auctions-element-creator-image"
        />
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="auctions-element-creator-image"
        />
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="auctions-element-creator-image"
        />
      </div>
      <div className="auctions-element-stock">{element.stock} in stock</div>
    </div>
  );
};

const AuctionsElements = ({ elements }) => {
  return (
    <div className="auctions-elements">
      {elements.map((element) => (
        <AuctionsElement element={element} />
      ))}
    </div>
  );
};

export default AuctionsElements;
