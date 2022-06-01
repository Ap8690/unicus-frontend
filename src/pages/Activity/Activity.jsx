// Lib
import { useState } from "react";

// SASS
import "./Activity.scss";

// Components
import ActivityHeader from "./ActivityHeader";
import ActivityBody from "./ActivityBody";
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
    },
    {
      type: "Bid",
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "3317.99",
      qty: 1,
      from: "Null Address",
      to: "50CIAF",
      time: "2 days ago",
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
    },
  ];

  const eventTypes = ["Listings", "Sales", "Bids", "Transfers"];
  const [activeFilters, setActiveFilters] = useState(["Listings"]);
  return (
    <section className="activity">
      <BlueBackground />
      <ActivityHeader
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <ActivityBody
        activities={activities}
        eventTypes={eventTypes}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </section>
  );
};

export default Activity;
