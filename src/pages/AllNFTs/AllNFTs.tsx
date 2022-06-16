import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

// Styles
import "./AllNFTs.scss";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import AllNFTsHeader from "./AllNFTsHeader";
import AllNFTsBody from "./AllNFTsBody/AllNFTsBody";

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const AllNFTs = () => {
  // Hardcoded data
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
  const [displayList, setDisplayList]: useStateType<Array<string>> =
    useState(list);
  // Loading in multiples of 10
  const [currentLoaded, setCurrentLoaded]: useStateType<number> = useState(10);

  // Helper Function
  const ifValid = (element: string) => {
    // Insert Logic for filtering
    // Since structure not known skipping here
    return true;
  };

  // Loading Related
  const updateLoaded = () => {
    setCurrentLoaded(currentLoaded + 10);
  };
  const ifShowButton: Boolean = currentLoaded < list.length;

  // Filtering mechanism
  useEffect(() => {
    // filter all in one to ensure consistency in data
    // TO-DO switch to use memo for better performance
    const temp = displayList.filter(ifValid);
    setDisplayList(temp);
  }, [search, countFilter, sorting, activeFilters]);

  useEffect(() => {
    // integrate with the upper one only for consistency
    const temp = list.slice(0, currentLoaded);
    setDisplayList(temp);
  }, [currentLoaded]);

  return (
    <div className="all-nfts">
      <BlueBackground />
      <AllNFTsHeader
        list={displayList}
        sorting={sorting}
        setSorting={setSorting}
        countFilter={countFilter}
        setCountFilter={setCountFilter}
        arrangement={arrangement}
        setArrangement={setArrangement}
      />
      <AllNFTsBody
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        list={displayList}
        search={search}
        setSearch={setSearch}
        updateLoaded={updateLoaded}
        arrangement={arrangement}
        ifShowButton={ifShowButton}
      />
    </div>
  );
};

export default AllNFTs;
