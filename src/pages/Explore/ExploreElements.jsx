const ExploreElement = ({ element }) => {
  return (
    <div className="explore-element">
      <img
        src={element.image}
        alt={element.name}
        className="explore-element-item-image"
      />
      <div className="explore-element-name">{element.name}</div>
      <div className="explore-element-price">{element.price} ETH</div>
      <div className="explore-element-creators">
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="explore-element-creator-image"
        />
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="explore-element-creator-image"
        />
        <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="explore-element-creator-image"
        />
      </div>
      <div className="explore-element-stock">{element.stock} in stock</div>
    </div>
  );
};

const ExploreElements = ({ elements }) => {
  return (
    <div className="explore-elements">
      {elements.map((element) => (
        <ExploreElement element={element} />
      ))}
    </div>
  );
};

export default ExploreElements;
