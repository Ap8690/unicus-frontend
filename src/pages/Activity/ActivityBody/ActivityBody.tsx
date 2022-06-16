// Lib
import { useState } from "react";

// Components
import ActivityBodyFilters from "./ActivityBodyFilters";
import ActivityTable from "./ActivityTable";

const ActivityBody = ({
  activities,
  eventTypes,
  activeFilters,
  setActiveFilters,
  collections,
  search,
  setSearch,
}) => {
  return (
    <div className="activity-body">
      <ActivityBodyFilters
        collections={collections}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        eventTypes={eventTypes}
        search={search}
        setSearch={setSearch}
      />
      <ActivityTable activities={activities} search={search} />
    </div>
  );
};

export default ActivityBody;
