// Lib
import { Dispatch, SetStateAction, useState } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

// Components
import User from "./User/User";
import ProfileNavigation from "./Navigation/ProfileNavigation";

// Images
import userImg from "../../assets/images/userImage.png";
import backgroundImg from "../../assets/images/userBackground.png";

// Styles
import "./ProfileMain.scss";

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
  const [currentTab, setCurrentTab]: useStateType<Number> = useState(0);
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
  return (
    <div className="profile">
      <User user={user} />
      <ProfileNavigation
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default Profile;
