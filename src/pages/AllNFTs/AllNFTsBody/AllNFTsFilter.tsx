// Images
import itemPic from "../../../assets/images/itemPic.png";

// Components
import DropDownFilter from "../../../components/DropDownFilter/DropDownFilter";
import DropDownPrice from "../../../components/DropDownPrice/DropDownPrice";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";

const AllNFTsFilter = ({
  filters,
  activeFilters,
  setActiveFilters,
  search,
  setSearch,
  collections,
  priceRange,
  handlePriceRange,
  currency,
  setCurrency,
}) => {


  return (
    <div className="activity-body-filters">
      <DropDownPrice
        priceRange={priceRange}
        handlePriceRange={handlePriceRange}
        currency={currency}
        setCurrency={setCurrency}
      />
      <DropDownFilter
        heading={"Status"}
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <DropDownSearch
        heading={"Collections"}
        search={search}
        setSearch={setSearch}
        searchList={collections}
      />
    </div>
  );
};

export default AllNFTsFilter;
