// Images
import filter from "../../assets/svgs/filter.svg";
import cross from "../../assets/svgs/cross.svg";
import uuid from "react-uuid";

const ActiveFilterComponent = ({ acFilter, removeFilter }) => {
  return (
    <div className="active-filter">
      {acFilter}
      <button className="remove-filter" onClick={() => removeFilter(acFilter)}>
        <img src={cross} alt="Close" />
      </button>
    </div>
  );
};

const ActivityHeader = ({ activeFilters, setActiveFilters }) => {
  const removeFilter = (rmFilter: string) => {
    const temp = activeFilters.filter((filter: string) => filter !== rmFilter);
    setActiveFilters(temp);
  };
  const clearAllFilter = () => {
    setActiveFilters([]);
  };
  return (
    <div className="activity-header">
      <div className="filter-icon">
        <img src={filter} alt="Filter" />
        Filter
      </div>
      <div className="active-filters">
        {activeFilters.map((acFilter:string, i: number) => (
          <ActiveFilterComponent
            acFilter={acFilter}
            key={uuid()}
            removeFilter={removeFilter}
          />
        ))}
        {activeFilters.length !== 0 ? (
          <button className="clear-all-button" onClick={clearAllFilter}>
            Clear All
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityHeader;
