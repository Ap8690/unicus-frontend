import { useEffect, useState } from "react";
import MarketPlaceTrendingNavigator from "./MarketPlaceTrendingNavigator";

const MarketPlaceTrending = ({ list }) => {
  // We can filter this list as per requirement
  const [category, setCategory] = useState("all");
  const [displayList, setDisplayList] = useState(list);
  const [currentScroll, setCurrentScroll] = useState(0);

  // Hardcoded
  const length = Math.ceil(list.length / 3);
  const categories = ["all", "art", "coins", "game"];

  useEffect(() => {
    if (category === "all") {
      setDisplayList(list);
      return;
      // IN this case, entire list
    }
    const temp = list.filter(
      (element) => element.category.toLowerCase() === category
    );
    setDisplayList(temp);
  }, [category]);

  return (
    <div className="market-place-trending">
      <MarketPlaceTrendingNavigator
        category={category}
        setCategory={setCategory}
        categories={categories}
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        length={length}
      />
    </div>
  );
};

export default MarketPlaceTrending;
