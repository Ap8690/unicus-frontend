const Filter = ({ filter, currentFilter, setCurrentFilter }) => {
  const onClick = (filter) => setCurrentFilter(filter);
  const className =
    filter.toLowerCase() === currentFilter.toLowerCase() ? " active" : "";
  return (
    <button
      className={"auctions-filter" + className}
      onClick={() => onClick(filter)}
    >
      {filter}
    </button>
  );
};

const AuctionsFilters = ({ filters, currentFilter, setCurrentFilter }) => {
  return (
    <div className="auctions-filters">
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

export default AuctionsFilters;
