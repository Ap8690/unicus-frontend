// Lib
import { useState } from "react";
import uuid from "react-uuid";

// Images
import chevronLeft from "../../assets/svgs/chevronLeft.svg";
import chevronRight from "../../assets/svgs/chevronRight.svg";

const RankingSwitcherElement = ({ currentRange, range, updateRankingList }) => {
  const ifCurrent = 
    currentRange[0] + 1 === range[0] && currentRange[1] === range[1];

  return (
    <div
      className={"ranking-switcher-element" + (ifCurrent ? " current" : "")}
      onClick={() => updateRankingList(range[0], range[1])}
    >
      {range[0]}-{range[1]}
    </div>
  );
};
const RankingSwitcher = ({
  updateRankingList,
  length,
  currRangeEnd,
  currRangeStart,
}) => {
  // Display Range Display
  const [displayIdx, setDisplayIdx] = useState(0);

  // Display Ranges
  const displayRanges = [];
  for (let i = 0; i < Math.ceil(length / 30); ++i) {
    displayRanges.push([1 + 30 * i, Math.min(30 + 30 * i, length)]);
  }

  const updateDisplayIdx = (newIdx) => {
    setDisplayIdx(newIdx);
  };
  return (
    <div className="ranking-switcher">
      <button
        className="ranking-switcher-button"
        disabled={displayIdx === 0}
        onClick={() => updateDisplayIdx(displayIdx - 2)}
      >
        <img src={chevronLeft} alt="Left Arrow" />
      </button>
      {displayRanges.slice(displayIdx, displayIdx + 2).map((range) => (
        <RankingSwitcherElement
          range={range}
          key={uuid()}
          currentRange={[currRangeStart, currRangeEnd]}
          updateRankingList={updateRankingList}
        />
      ))}
      <button
        className="ranking-switcher-button"
        disabled={displayIdx === Math.floor(length / 30)}
        onClick={() => updateDisplayIdx(displayIdx + 2)}
      >
        <img src={chevronRight} alt="Right Arrow" />
      </button>
    </div>
  );
};

export default RankingSwitcher;
