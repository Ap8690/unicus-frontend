const Filter = ({ filter, currentFilter, setCurrentFilter }) => {
  const onClick = (filter) => setCurrentFilter(filter);
  const className =
    filter.toLowerCase() === currentFilter.toLowerCase() ? " active" : "";
  return (
    <button
      className={"explore-filter" + className}
      onClick={() => onClick(filter)}
    >
      {filter}
    </button>
  );
};

const ExploreFilters = ({ filters, currentFilter, setCurrentFilter }) => {
  return (
    <div className="explore-filters noScrollbar">
      {filters.map((filter, i) => (
        <Filter
          filter={filter}
          setCurrentFilter={setCurrentFilter}
          currentFilter={currentFilter}
          key={`expf${i}`}
        />
      ))}
    </div>
  );
};

export default ExploreFilters;
