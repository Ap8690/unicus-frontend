import { Dispatch, SetStateAction, useState } from "react";
import AllNFTsFilter from "./AllNFTsFilter";

// Styles
import "./AllNFTs.scss";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import AllNFTsHeader from "./AllNFTsHeader";

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const AllNFTs = () => {
  // States
  const [activeFilters, setActiveFilters]: useStateType<Array<string>> =
    useState(["Listings"]);
  const [search, setSearch]: useStateType<string> = useState("");
  const [sorting, setSorting]: useStateType<{
    criteria: string;
    type: string;
  }> = useState({ criteria: "Price", type: "ascending" });
  const [countFilter, setCountFilter]: useStateType<string> =
    useState("Single item");
  const [arrangement, setArrangement]: useStateType<Number> = useState(2);

  // Hardcoded data
  const filters = ["New", "Buy now", "On Auction", "Has offers"];
  const list = [
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
  ];

  return (
    <div className="all-nfts">
      <BlueBackground />
      <AllNFTsHeader
        list={list}
        sorting={sorting}
        setSorting={setSorting}
        countFilter={countFilter}
        setCountFilter={setCountFilter}
        arrangement={arrangement}
        setArrangement={setArrangement}
      />
    </div>
  );
};

export default AllNFTs;
