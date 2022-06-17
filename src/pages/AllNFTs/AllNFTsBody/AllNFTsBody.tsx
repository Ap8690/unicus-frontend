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
}): ReactJSXElement => {
  // Hardcoded data
  const filters = ["New", "Buy now", "On Auction", "Has offers"];

  return (
    <div className="all-nfts-body">
      <AllNFTsFilter
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        search={search}
        setSearch={setSearch}
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
