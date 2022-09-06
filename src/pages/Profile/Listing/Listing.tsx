// Components
import Table from "./ListingTable";
import Header from "./Header";

// Images
import itemPic from "../../../assets/images/itemPic.png";

// Styles
import "./Listing.scss";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";
import BlueBackground from "../../../components/BlueBackground/BlueBackground";
import { useEffect, useState } from "react";

const Listing = ({ list, search, setSearch, columns }) => {
  const [filteredList, setFilteredList] = useState(list);

 useEffect(() => {
   setFilteredList(list)
 }, [list])
 
  return (
    <div className="listing">
      <BlueBackground />
      {/* <Header /> */}
      <div className="listing-body">
        <DropDownSearch
          heading="Search"
          search={search}
          setSearch={setSearch}
          searchList={filteredList}
          list={list}
        />
        <Table columns={columns} rows={filteredList} />
      </div>
    </div>
  );
};

export default Listing;
