import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import AllNFTsElements from "./AllNFTsElements";
import AllNFTsFilter from "./AllNFTsFilter";

const AllNFTsBody = ({
  activeFilters,
  setActiveFilters,
  list,
  search,
  setSearch,
  arrangement,
  updateLoaded,
  ifShowButton,
  collections,
  filters,
  priceRange,
  handlePriceRange,
  currency,
  setCurrency,
}): ReactJSXElement => {
  // Hardcoded data
  

  return (
    <div className="all-nfts-body">
      <AllNFTsFilter
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        search={search}
        setSearch={setSearch}
        collections={collections}
        priceRange={priceRange}
        handlePriceRange={handlePriceRange}
        currency={currency}
        setCurrency={setCurrency}
      />
      <AllNFTsElements
        list={list}
        arrangement={arrangement}
        updateLoaded={updateLoaded}
        ifShowButton={ifShowButton}
      />
    </div>
  );
};

export default AllNFTsBody;
