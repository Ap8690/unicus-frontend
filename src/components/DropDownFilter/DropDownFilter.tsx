// Lib
import { useState } from "react";

// Images
import chevronDown from "../../assets/svgs/chevronDown.svg";

// SASS
import "./DropDownFilter.scss";

const TypeButton = ({ type, activeFilters, onClickAdd, onClickRemove }) => {
  const className = activeFilters.find((filter: string) => filter === type)
    ? " active"
    : "";
  const onClick = className === " active" ? onClickRemove : onClickAdd;
  return (
    <button
      className={"drop-down-type" + className}
      onClick={() => onClick(type)}
    >
      {type}
    </button>
  );
};

const DropDownFilter = ({
  filters,
  activeFilters,
  setActiveFilters,
  heading,
}) => {
  const [ifOpen, setIfOpen] = useState(true);
  const onClickAdd = (rmFilter: string) => {
    const temp = activeFilters.concat(rmFilter);
    setActiveFilters(temp);
  };
  const onClickRemove = (rmFilter: string) => {
    const temp = activeFilters.filter((filter: string) => filter !== rmFilter);
    setActiveFilters(temp);
  };

  return (
    <div className="drop-down-filter">
      <h2 className="drop-down-filter-heading">
        <div className="text">{heading}</div>
        <button onClick={() => setIfOpen(!ifOpen)}>
          <img src={chevronDown} alt="Expand List" />
        </button>
      </h2>
      <div
        className="drop-down-types-holder"
        style={
          !ifOpen
            ? {
                height: 0,
              }
            : null
        }
      >
        {filters.map((type: string, i: Number) => (
          <TypeButton
            key={`evt${i}`}
            type={type}
            activeFilters={activeFilters}
            onClickAdd={onClickAdd}
            onClickRemove={onClickRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default DropDownFilter;
