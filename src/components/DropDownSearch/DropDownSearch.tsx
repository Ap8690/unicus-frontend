// Lib
import { useEffect, useState } from "react";

// Components
import SearchBar from "../SearchBar/SearchBar";
import uuid from "react-uuid";
import {useNavigate} from 'react-router-dom';
// SASS
import "./DropDownSearch.scss";

const CollectionList = ({ list, setSearch }) => {
    const onClick = (ele: string) => setSearch(ele);
    return (
        <div className="drop-down-list">
            {list.map((listEle: any, i: number) => (
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
  let navigate = useNavigate();
    const [ifOpen, setIfOpen] = useState(true);
    const [displayList, setDisplayList] = useState(searchList);

    // Display Only Using the Active Ones
    useEffect(() => {
        const temp =
            searchList &&
            searchList.filter((searchEle: any) =>
                searchEle.hasOwnProperty("name")
                    ? searchEle?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    : searchEle?.collectionName
                          .toLowerCase()
                          .includes(search.toLowerCase())
            );
        setDisplayList(temp);
    }, [search]);

    return (
        <div className="drop-down-search">
            {/* <h2 className="drop-down-search-heading">
        {heading}
        <button onClick={() => setIfOpen(!ifOpen)}>
          <img src={chevronDown} alt="Expand List" className={`dropDownArrow ${ifOpen? 'openSearch' : ''}`} />
        </button>
      </h2> */}
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
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    handleGlobalSearch={null}
                />
                    
                {/* <CollectionList list={displayList} setSearch={setSearch} /> */}
            </div>
            <div
                        onClick={() =>
                            navigate(`/create-collection`)
                        }
                        className="p-2 rounded-xl cursor-pointer border-2 addAsset w-full text-center font-bold"
                    >
                        + Add Asset
                    </div>
        </div>
    );
};

export default DropDownSearch;
