// Libs
import { useState } from "react";

// Images
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import chevronDownBlue from "../../../assets/svgs/chevronDownBlue.svg";

const DayListElement = ({ day, updateDay }) => {
  return (
    <button className="day-button" onClick={() => updateDay(day)}>
      {day} days
    </button>
  );
};
const MarketPlaceTopCollectionsHeader = ({ day, setDay, days }) => {
  const [ifOpen, setIfOpen] = useState(false);
  const updateDay = (d) => {
    setDay(d);
    setIfOpen(false);
  };
  return (
    <div className="header">
      <div className="heading">
        <h2>Top collections over </h2>
        <div className="day-selector">
          <button className="day-filter" onClick={() => setIfOpen(!ifOpen)}>
            Last {day} days{" "}
            <img
              src={chevronDownBlue}
              alt="Expand List"
              style={
                ifOpen
                  ? {
                      transform: "rotateZ(180deg)",
                    }
                  : null
              }
            />
          </button>
          <div
            className="day-list"
            style={
              !ifOpen
                ? {
                    transform: "translateY(-20%) scale(0)",
                    transformOrigin: "top center",
                    opacity: 0,
                  }
                : {
                    transform: "translateY(0)",
                    transformOrigin: "top center",
                    opacity: 1,
                  }
            }
          >
            {days.map((d:any) => (
              <DayListElement day={d} key={uuid()} updateDay={updateDay} />
            ))}
          </div>
        </div>
      </div>
      <Link to={"/stats/ranking"} className="goto-ranking btn nav-link">
        Go To Ranking
      </Link>
    </div>
  );
};

export default MarketPlaceTopCollectionsHeader;
