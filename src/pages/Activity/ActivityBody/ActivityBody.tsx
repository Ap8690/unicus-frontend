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
  const [ifOpen, setIfOpen] = useState(true);
  return (
    <div className="activity-body">
      <ActivityBodyFilters
        ifOpen={ifOpen}
        setIfOpen={setIfOpen}
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
