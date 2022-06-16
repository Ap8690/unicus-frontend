// Images
import itemPic from "../../../assets/images/itemPic.png";

// Components
import DropDownFilter from "../../../components/DropDownFilter/DropDownFilter";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";

const AllNFTsFilter = ({
  filters,
  activeFilters,
  setActiveFilters,
  search,
  setSearch,
}) => {
  const collections = [
    {
      name: "Leslie Alexander",
      image: itemPic,
    },
    {
      name: "Untitled Collection",
      image: itemPic,
    },
    {
      name: "Guy Hawkins",
      image: itemPic,
    },
    {
      name: "Webbed",
      image: itemPic,
    },
  ];

  return (
    <div className="all-nfts-filters">
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
