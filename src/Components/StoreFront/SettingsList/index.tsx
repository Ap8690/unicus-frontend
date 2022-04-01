import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import "./style.scss";
import generalLogo from "./../../../Assets/MyStore/general-logo.svg";
import placeholder from "./../../../Assets/MyStore/placeholder-dp.svg";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const SettingsList = ({ settingsItems }) => {
  const history = useHistory();
  const match = useRouteMatch();
  let { sub }: any = useParams();

  const [selectedTab, setSelectedTab] = useState(settingsItems[0].link);

  const handleClick = (link: string) => {
    history.replace(`${link}`);
  };

  useEffect(() => {
    setSelectedTab(sub);
  });

  const { userInfo } = useSelector((state: any) => state.profile);

  return (
    <div className="settingsList">
      <div className="text-center">
        <Avatar
          className="mx-auto mt-2"
          sx={{
            width: 75,
            height: 75,
            color: "#fff",
            background: "#bebebe",
          }}
        >
          {userInfo.profileUrl ? (
            <img
              src={userInfo.profileUrl}
              alt={userInfo.username}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Avatar />
          )}
        </Avatar>{" "}
        <p className="border-bottom mt-3 pb-3 userName">{userInfo.username}</p>
      </div>
      <ul>
        {settingsItems.map((item) => (
          <li key={item.link} onClick={() => handleClick(item.link)}>
            <a
              className={`cursor-pointer ${
                selectedTab == item.link ? "active" : ""
              }`}
            >
              <img src={generalLogo} alt="" />
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsList;
