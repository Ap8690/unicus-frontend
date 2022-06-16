// Components
import DropDownFilter from "../../../components/DropDownFilter/DropDownFilter";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";

// Lib
import { useState } from "react";
const ActivityBodyFilters = ({
  eventTypes,
  activeFilters,
  setActiveFilters,
  collections,
  search,
  setSearch,
}) => {
  return (
    <div className="activity-body-filters">
      <DropDownFilter
        filters={eventTypes}
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
