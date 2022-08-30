import { capitalize } from "../../utils/helpers";
import uuid from 'react-uuid'

const Filter = ({ filter, currentFilter, setCurrentFilter }) => {
  const onClick = (filter:any) => setCurrentFilter(filter);
  const className =
    filter.toLowerCase() === currentFilter.toLowerCase() ? " active" : "";
  return (
    <button
      className={"explore-filter" + className}
      onClick={() => onClick(filter)}
    >
      {capitalize(filter)}
    </button>
  );
};

const ExploreFilters = ({ filters, currentFilter, setCurrentFilter }) => {
  return (
    <div className="explore-filters noScrollbar">
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

export default ExploreFilters;
