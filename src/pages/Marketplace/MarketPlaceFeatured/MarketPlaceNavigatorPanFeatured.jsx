const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <img src={element.image} alt={element.title} />
    <h3 className="heading">{element.heading}</h3>
    <p className="text">{element.text}</p>
  </div>
);
const MarketPlaceNavigatorPanFeatured = ({ list, currentPage }) => {
  // Display 3 at a time
  const displayList = list.slice(currentPage * 3, currentPage * 3 + 3);
  return (
    <div className="market-place-featured-elements">
      {displayList.map((element, i) => (
        <Element key={`mpfe${i}`} element={element} />
      ))}
    </div>
  );
};
export default MarketPlaceNavigatorPanFeatured;
