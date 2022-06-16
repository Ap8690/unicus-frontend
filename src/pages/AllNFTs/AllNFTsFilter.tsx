// Components
import DropDownFilter from "../../components/DropDownFilter/DropDownFilter";
import DropDownSearch from "../../components/DropDownSearch/DropDownSearch";

const AllNFTsFilter = ({ filters, activeFilters, setActiveFilters }) => {
  return (
    <div className="all-nfts-filters">
      <DropDownFilter
        heading={"Status"}
        filters={filters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </div>
  );
};

export default AllNFTsFilter;
