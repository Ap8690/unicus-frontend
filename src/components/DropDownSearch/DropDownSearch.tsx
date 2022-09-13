// Lib
import { useEffect, useState } from "react";

// Images
import chevronDown from "../../assets/svgs/chevronDown.svg";

// Components
import SearchBar from "../SearchBar/SearchBar";
import uuid from 'react-uuid'

// SASS
import "./DropDownSearch.scss";

const CollectionList = ({ list, setSearch }) => {
  const onClick = (ele: string) => setSearch(ele);
  return (
    <div className="drop-down-list">
      {list.map((listEle:any, i: number) => (
        <button
          className="drop-down-list-element"
          onClick={() => onClick(listEle.name)}
          key={uuid()}
        >
          <img
            src={listEle.image}
            alt={listEle.name}
            className="drop-down-list-element-image"
          />
          {listEle.name}
        </button>
      ))}
    </div>
  );
};
const DropDownSearch = ({ searchList, heading, search, setSearch, list }) => {
  const [ifOpen, setIfOpen] = useState(false);
  const [displayList, setDisplayList] = useState(searchList);

  // Display Only Using the Active Ones
  useEffect(() => {
    const temp = searchList.filter((searchEle) =>
      searchEle.name.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayList(temp);
  }, [search]);

  return (
    <div className="drop-down-search">
      <h2 className="drop-down-search-heading">
        {heading}
        <button onClick={() => setIfOpen(!ifOpen)}>
          <img src={chevronDown} alt="Expand List" className={`dropDownArrow ${ifOpen? 'openSearch' : ''}`} />
        </button>
      </h2>
      <div
        className="drop-down-search-holder"
        style={
          ifOpen
            ? null
            : {
                height: 0,
              }
        }
      >
        <SearchBar search={search} setSearch={setSearch} handleGlobalSearch={null}/>
        {/* <CollectionList list={displayList} setSearch={setSearch} /> */}
      </div>
    </div>
  );
};

export default DropDownSearch;
