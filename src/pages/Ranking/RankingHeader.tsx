// Images
import chevronDown from "../../assets/svgs/chevronDown.svg";

// Ranking Header
const RankingHeader = ({
  timeFilter,
  setTimeFilter,
  chainFilter,
  setChainFilter,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <div className="ranking-header">
      <h3 className="ranking-heading">Top NFTs</h3>
      <div className="ranking-filter-etc">
        <p className="ranking-intro">
          The top NFTs on OpenSea, ranked by volume, floor price and other
          statistics.
        </p>
        <div className="ranking-filters">
          <div className="ranking-filter">
            <p>Last {timeFilter} days</p>
            <button className="ranking-filter-expand">
              <img src={chevronDown} alt="Down Arrow" />
            </button>
          </div>
          <div className="ranking-filter">
            <p>
              {categoryFilter === "all" ? "All categories" : categoryFilter}
            </p>
            <button className="ranking-filter-expand">
              <img src={chevronDown} alt="Down Arrow" />
            </button>
          </div>
          <div className="ranking-filter">
            <p>{chainFilter === "all" ? "All chains" : chainFilter}</p>
            <button className="ranking-filter-expand">
              <img src={chevronDown} alt="Down Arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingHeader;
