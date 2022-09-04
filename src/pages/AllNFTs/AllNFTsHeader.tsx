// Images
import { useState, Dispatch, SetStateAction, ReactPropTypes } from "react";
import filter from "../../assets/svgs/filter.svg";
import chevronDown from "../../assets/svgs/chevronDown.svg";
import uuid from "react-uuid";

// Types
type SortingType = {
  criteria: string;
  type: string;
};
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

// Helper functions
const getSortingName = (filter: SortingType) => {
  const low = filter.type === "ascending" ? "Low" : "High";
  const high = filter.type === "ascending" ? "High" : "Low";
  return `
      ${filter.criteria}: ${low} to ${high}
    `;
};

// Components
const ListButton = ({
  filter,
  onClick,
  type,
}: {
  filter: SortingType | string;
  onClick: Function;
  type: string;
}) => {
  let displayName: string;
  if (type === "sorting") {
    // @ts-ignore
    displayName = getSortingName(filter);
  } else {
    // @ts-ignore
    displayName = filter;
  }
  return (
    <button className="list-button" onClick={() => onClick(filter)}>
      {displayName}
    </button>
  );
};

const AllNFTsHeader = ({
  countFilter,
  setCountFilter,
  sorting,
  setSorting,
  arrangement,
  setArrangement,
  list,
}) => {
  // states
  const [sortingOpen, setSortingOpen]: useStateType<Boolean> = useState(false);
  const [countingOpen, setCountingOpen]: useStateType<Boolean> =
    useState(false);

  // list data
  const length = list.length;
  const countFilters: Array<string> = ["Single item", "Two Items"];
  const sortingFilters: Array<SortingType> = [
    { criteria: "Price", type: "ascending" },
    { criteria: "Price", type: "descending" },
  ];

  // Event Callbacks
  const onClickSorting = (filter: SortingType) => {
    setSorting(filter);
    setSortingOpen(false);
  };
  const onClickCounting = (filter: string) => {
    setCountFilter(filter);
    setCountingOpen(false);
  };

  // Styles
  const btn2x2 = {
    backgroundColor: arrangement === 2 ? "#fff" : "transparent",
    border: arrangement === 2 ? "none" : "solid 1px white",
  };
  const btn3x3 = {
    backgroundColor: arrangement === 3 ? "#fff" : "transparent",
    border: arrangement === 3 ? "none" : "solid 1px white",
  };
  const garb2 = new Array(4).fill(1);
  const garb3 = new Array(9).fill(1);

  return (
    <div className="all-nfts-header">
      <div className="filter-icon">
        <img src={filter} alt="Filter" />
        Filter
      </div>
      <div className="filter-options">
        <div className="total-length">{length} results</div>
        <div className="counting">
          <button
            className="toggle-counting"
            onClick={() => setCountingOpen(!countingOpen)}
          >
            {countFilter} <img src={chevronDown}></img>
          </button>
          <div
            className="count-options"
            style={
              !countingOpen
                ? {
                    opacity: 0,
                    visibility: "hidden",
                    top: "-10%",
                  }
                : null
            }
          >
            {countFilters.map((ct: string, index: number) => (
              <ListButton
                key={uuid()}
                filter={ct}
                onClick={onClickCounting}
                type="counting"
              />
            ))}
          </div>
        </div>
        <div className="sorting">
          <button
            className="toggle-sorting"
            onClick={() => setSortingOpen(!sortingOpen)}
          >
            {getSortingName(sorting)} <img src={chevronDown}></img>
          </button>
          <div
            className="sorting-options"
            style={
              !sortingOpen
                ? {
                    opacity: 0,
                    visibility: "hidden",
                    top: "-10%",
                  }
                : null
            }
          >
            {sortingFilters.map((filter: SortingType, index: number) => (
              <ListButton
                key={`stb${index}`}
                filter={filter}
                onClick={onClickSorting}
                type={"sorting"}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="arrangement-options">
        <button className="btn-2" onClick={() => setArrangement(2)}>
          {garb2.map((garb: number, index: number) => (
            <div className="btn-box" key={`btnb2${index}`} style={btn2x2}></div>
          ))}
        </button>
        <button className="btn-3" onClick={() => setArrangement(3)}>
          {garb3.map((garb: number, index: number) => (
            <div className="btn-box" key={`btnb3${index}`} style={btn3x3}></div>
          ))}
        </button>
      </div>
    </div>
  );
};

export default AllNFTsHeader;
