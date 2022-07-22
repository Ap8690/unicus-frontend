// Lib
import { useEffect, useState } from "react";

// Images
import itemPic from "../../assets/images/itemPic.png";

// SASS
import "./Activity.scss";

// Components
import ActivityHeader from "./ActivityHeader";
import ActivityBody from "./ActivityBody/ActivityBody";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import FilterMenu from "../../components/menu/FIlterMenu/FilterMenu";

export const Activity = () => {
  const activities = [
    {
      type: "List",
      item: "Untitled Collection",
      creator: 'abcdef1234',
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "List",
      item: "Untitled Collection",
      creator: 'abcdef1234',
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "List",
      item: "Untitled Collection",
      creator: 'abcdef1234',
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "List",
      item: "Untitled Collection",
      creator: 'abcdef1234',
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "List",
      item: "Untitled Collection",
      creator: 'abcdef1234',
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
  ];

  // To be used in collection filter
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

  const filter = {
    name: 'Event Types',
    filters: ["Listings", "Sales", "Bids", "Transfers"]
  }

  const [activeFilters, setActiveFilters] = useState(["Listings"]);
  const [displayActivities, setDisplayActivities] = useState(activities);
  const [search, setSearch] = useState("");
  const [filterMenu, setFilterMenu] = useState(false)

  // Search via filter
  useEffect(() => {
    if (activeFilters.length === 0) {
      // If No filters active
      setDisplayActivities(activities);
      return;
    }
    // Otherwise sort them out
    const temp = activities.filter((activity) =>
      activeFilters.find((filter) =>
        filter.toLowerCase().includes(activity.type.toLowerCase())
      )
    );
    setDisplayActivities(temp);
  }, [activeFilters]);

  // Search Via Name
  useEffect(() => {
    if (search === "") {
      setDisplayActivities(activities);
      return;
    }
    const temp = activities.filter(
      (activity) => activity.item.toLowerCase() === search.toLowerCase()
    );
    setDisplayActivities(temp);
  }, [search]);
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
      />
      <section className="activity">
        <BlueBackground />
        <ActivityHeader
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          setFilterMenu={setFilterMenu}
          />
        <ActivityBody
          activities={displayActivities}
          eventTypes={filter.filters}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          collections={collections}
          search={search}
          setSearch={setSearch}
          />
      </section>
    </>
  );
};

export default Activity;
