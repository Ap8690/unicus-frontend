// Images
import filter from "../../../assets/svgs/filter.svg";
import invalid from "../../../assets/svgs/invalid.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="filter-icon">
        <img src={filter} alt="Filter" />
        Filter
      </div>
      <div className="misc">
        <div className="inactive-listing">
          <img src={invalid} alt="Invalid" />
          Inactive Listing
          <a href="#">learn more</a>
        </div>
        <div className="cancel">Cancel all listings and offers</div>
      </div>
    </div>
  );
};

export default Header;
