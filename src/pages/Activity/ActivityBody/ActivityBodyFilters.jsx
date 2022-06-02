// Components
import DropDownFilter from "../../../components/DropDownFilter/DropDownFilter";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";

const ActivityBodyFilters = ({
  eventTypes,
  activeFilters,
  setActiveFilters,
  collections,
  setIfOpen,
  ifOpen,
  search,
  setSearch,
}) => {
  return (
    <div className="activity-body-filters">
      <DropDownFilter
        ifOpen={ifOpen}
        setIfOpen={setIfOpen}
        types={eventTypes}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        heading="Event Types"
      />
      <DropDownSearch
        searchList={collections}
        heading="Collections"
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default ActivityBodyFilters;
