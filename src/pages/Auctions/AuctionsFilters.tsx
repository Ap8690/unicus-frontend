import uuid from "react-uuid";

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
      {filters.map((filter:any, i:number) => (
        <Filter
          filter={filter}
          setCurrentFilter={setCurrentFilter}
          currentFilter={currentFilter}
          key={uuid()}
        />
      ))}
    </div>
  );
};

export default AuctionsFilters;
