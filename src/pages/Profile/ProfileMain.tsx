// Lib
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import User from "./User/User";
import Activity from "../Activity/Activity";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import Favourited from "./Favourited/Favourited";
import Listing from "./Listing/Listing";

// Images
import userImg from "../../assets/images/userImage.png";
import backgroundImg from "../../assets/images/userBackground.png";
import favouritedImg from "../../assets/images/favouritedImage.png";
import itemPic from "../../assets/images/itemPic.png";

// Icons
import profileCollected from "../../assets/svgs/profileCollected.svg";
import profileCreated from "../../assets/svgs/profileCreated.svg";
import profileFavourited from "../../assets/svgs/profileFavourited.svg";
import profileActivity from "../../assets/svgs/profileActivity.svg";
import profileListing from "../../assets/svgs/listing.svg";
import profileOffers from "../../assets/svgs/list.svg";

// Styles
import "./ProfileMain.scss";

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const Profile = (): ReactJSXElement => {
  // add is additional information
  const tabs = [
    { name: "Collected", image: profileCollected, add: "5" },
    { name: "Created", image: profileCreated, add: "" },
    { name: "Favourited", image: profileFavourited, add: "6" },
    { name: "Activity", image: profileActivity, add: "" },
    { name: "Listing", image: profileListing, add: "" },
    { name: "Offers", image: profileOffers, add: "" },
  ];
  // Index of current element
  const location = useLocation();

  // Name of the current tab
  const tabName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );
  const [currentTab, setCurrentTab]: useStateType<Number> = useState(
    tabs.findIndex((tab) => tab.name.toLowerCase() === tabName)
  );
  const [search, setSearch]: useStateType<String> = useState("");
  const user = {
    name: "Kyle Garrick",
    id: "6xc4c16a6451as56dfgf1ghdsa6db21a",
    joinDate: "21 July 2022",
    image: userImg,
    backimg: backgroundImg,
    social: {
      twitter: "#",
      instagram: "#",
      facebook: "#",
    },
    collected: null,
    favourited: null,
  };
  const items = [
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
    {
      image: favouritedImg,
      eventName: "Event Name 1",
      eventDescription:
        "OpenSea is the world's first and largest NFT marketplace",
    },
  ];

  const listing = [
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
    {
      image: itemPic,
      item: "Untitled Collection",
      priceEth: "1.2",
      priceDollar: "25120",
      fd: "-",
      exp: "July 25, 2022",
    },
  ];
  const [displayListing, setDisplayListing] = useState(listing);
  useEffect(() => {
    const q = search.toLowerCase();
    const temp = listing.filter((item) => item.item.toLowerCase().includes(q));
    setDisplayListing(temp);
  }, [search]);
  return (
    <div className="profile">
      <User user={user} />
      <ProfileNavigation
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <Routes>
        <Route path="/favourited" element={<Favourited items={items} />} />
        <Route path="/activity" element={<Activity />} />
        <Route
          path="/listing"
          element={
            <Listing
              list={displayListing}
              search={search}
              setSearch={setSearch}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Profile;
