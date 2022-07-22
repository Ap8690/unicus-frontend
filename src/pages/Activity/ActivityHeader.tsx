// Images
import filter from "../../assets/svgs/filter.svg";
import cross from "../../assets/svgs/cross.svg";
import useWindowDimensions from "../../utils/getDimensions";

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

const ActivityHeader = ({ activeFilters, setActiveFilters, setFilterMenu }) => {
  const { width } = useWindowDimensions()
  const removeFilter = (rmFilter: string) => {
    const temp = activeFilters.filter((filter: string) => filter != rmFilter);
    setActiveFilters(temp);
  };
  const clearAllFilter = () => {
    setActiveFilters([]);
  };

  const handleMenuOpen = () => {
      if(width > 768) return
      setFilterMenu(true)
  }

  return (
    <div className="activity-header">
      <div className="filter-icon" onClick={handleMenuOpen}>
        <img src={filter} alt="Filter" />
        Filters
      </div>
      <div className="active-filters">
        {activeFilters.map((acFilter:string, i: number) => (
          <ActiveFilterComponent
            acFilter={acFilter}
            key={`${i}ac`}
            removeFilter={removeFilter}
          />
        ))}
        {activeFilters.length != 0 ? (
          <button className="clear-all-button" onClick={clearAllFilter}>
            Clear All
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityHeader;
