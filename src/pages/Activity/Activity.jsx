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

const Activity = () => {
  const activities = [
    {
      type: "List",
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "Sale",
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "Minted",
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
    {
      type: "Transfer",
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
      image: itemPic,
    },
  ];

  const eventTypes = ["Listings", "Sales", "Bids", "Transfers"];
  const [activeFilters, setActiveFilters] = useState(["Listings"]);
  const [displayActivities, setDisplayActivities] = useState(activities);

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
  return (
    <section className="activity">
      <BlueBackground />
      <ActivityHeader
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <ActivityBody
        activities={displayActivities}
        eventTypes={eventTypes}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </section>
  );
};

export default Activity;
