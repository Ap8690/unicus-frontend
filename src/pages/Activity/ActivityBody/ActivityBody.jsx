// Lib
import { useState } from "react";

// Components
import EventTypes from "./EventTypes";
import ActivityTable from "./ActivityTable";

const ActivityBody = ({
  activities,
  eventTypes,
  activeFilters,
  setActiveFilters,
}) => {
  const [ifOpen, setIfOpen] = useState(true);
  return (
    <div className="activity-body">
      <EventTypes
        ifOpen={ifOpen}
        setIfOpen={setIfOpen}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        eventTypes={eventTypes}
      />
      <ActivityTable activities={activities} />
    </div>
  );
};

export default ActivityBody;
