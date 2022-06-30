// Components
import Table from "./ListingTable";
import Header from "./Header";

// Images
import itemPic from "../../../assets/images/itemPic.png";

// Styles
import "./Listing.scss";
import DropDownSearch from "../../../components/DropDownSearch/DropDownSearch";
import BlueBackground from "../../../components/BlueBackground/BlueBackground";

const Listing = ({ list, search, setSearch }) => {
  const columns = ["Item", "Unit Price", "Floor Difference", "Expiration Date"];
  const collections = [
    {
      name: "Leslie Alexander",
      image: itemPic,
    },
    {
      name: "Untitled Collection",
      image: itemPic,
    },
    {
      name: "Guy Hawkins",
      image: itemPic,
    },
    {
      name: "Webbed",
      image: itemPic,
    },
  ];

  return (
    <div className="listing">
      <BlueBackground />
      <Header />
      <div className="listing-body">
        <DropDownSearch
          heading="Collections"
          search={search}
          setSearch={setSearch}
          searchList={collections}
        />
        <Table columns={columns} rows={list}/>
      </div>
    </div>
  );
};

export default Listing;
