// Lib
import { Dispatch, SetStateAction, useState } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import User from "./User/User";
import ProfileNavigation from "./Navigation/ProfileNavigation";

// Images
import userImg from "../../assets/images/userImage.png";
import backgroundImg from "../../assets/images/userBackground.png";
import favouritedImg from "../../assets/images/favouritedImage.png";

// Styles
import "./ProfileMain.scss";
import Favourited from "./Favourited/Favourited";

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const Profile = (): ReactJSXElement => {
  const tabs = [
    "Collected",
    "Created",
    "Favourited",
    "Activity",
    "Listing",
    "Offers ",
  ];
  // Index of current element
  const location = useLocation();
  const tabName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1
  );
  const [currentTab, setCurrentTab]: useStateType<Number> = useState(
    tabs.findIndex((tab) => tab.toLowerCase() === tabName)
  );
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
      </Routes>
    </div>
  );
};

export default Profile;
