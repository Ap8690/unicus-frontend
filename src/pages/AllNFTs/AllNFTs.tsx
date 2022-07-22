import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import itemPic from "../../assets/images/itemPic.png";

// Styles
import "./AllNFTs.scss";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import AllNFTsHeader from "./AllNFTsHeader";
import AllNFTsBody from "./AllNFTsBody/AllNFTsBody";
import FilterMenu from "../../components/menu/FIlterMenu/FilterMenu";

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const minDistance = 10

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
  // States
  const [activeFilters, setActiveFilters]: useStateType<Array<string>> =
    useState(["Listings"]);
  const [search, setSearch]: useStateType<string> = useState("");
  const [filterMenu, setFilterMenu]: useStateType<boolean> = useState(false);
  const [priceRange, setPriceRange]: useStateType<number[]> = useState([0, 100]);
  const [currency, setCurrency]: useStateType<string> = useState('usd');
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
  const filter = {
    name: 'Status',
    filters: ["New", "Buy now", "On Auction", "Has offers"]
  }

  const handleChangePriceRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
    }
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
    <>
      <FilterMenu 
        open={filterMenu} 
        setOpen={setFilterMenu} 
        activeFilters={activeFilters} 
        setActiveFilters={setActiveFilters} 
        search={search}
        setSearch={setSearch}
        collections={collections}
        filter={filter}
        price={true}
        priceRange={priceRange}
        handlePriceRange={handleChangePriceRange}
        currency={currency}
        setCurrency={setCurrency}
      />
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
          setFilterMenu={setFilterMenu}
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
          collections={collections}
          filters={filter.filters}
          priceRange={priceRange}
          handlePriceRange={handleChangePriceRange}
          currency={currency}
          setCurrency={setCurrency}
          />
      </div>
    </>
  );
};

export default AllNFTs;
