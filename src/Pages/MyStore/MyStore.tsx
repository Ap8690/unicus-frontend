import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

import "./style.scss" 

import {
  RiSearchEyeLine,
  RiTShirt2Fill,
  RiTeamFill,
  RiNodeTree,
} from "react-icons/ri";
import {
  AiFillApi,
  AiOutlineLineChart,
  AiFillGold,
  AiFillNotification,
} from "react-icons/ai";
import {BiSupport} from "react-icons/bi";
import { IoIosWallet } from "react-icons/io";
import {GrBlog} from "react-icons/gr";
import {GiSettingsKnobs} from "react-icons/gi";
import Advance from '../../Components/StoreFront/Settings/MyStore/Advance';
import Appearance from '../../Components/StoreFront/Settings/MyStore/Appearance';
import General from '../../Components/StoreFront/Settings/MyStore/General';
import Support from '../../Components/StoreFront/Settings/MyStore/Support';
import Team from '../../Components/StoreFront/Settings/MyStore/Team';
import SettingsList from '../../Components/StoreFront/Settings/SettingsList';
import SettingsTarget from '../../Components/StoreFront/Settings/SettingsTarget';


const MyStore = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const color = "#1976d2";

   const tab = [
     //  { title: "My NFTs", link: "my-nft",  },
     {
       title: "My Store",
       link: "/my-store",
       settingsItems: [
         {
           logo: <GiSettingsKnobs color={color} size={"1.3em"} />,
           title: "General",
           link: "general",
           comp: <General />,
         },
         {
           logo: <AiFillGold color={color} size={"1.3em"} />,
           title: "Advance",
           link: "advance",
           comp: <Advance />,
         },
        //  {
        //    logo: <RiSearchEyeLine color={color} size={"1.3em"} />,
        //    title: "SEO",
        //    link: "seo",
        //    comp: <SEO />,
        //  },
         {
           logo: <RiTShirt2Fill color={color} size={"1.3em"} />,
           title: "Appearance",
           link: "appearance",
           comp: <Appearance />,
         },
        //  {
        //    logo: <RiNodeTree color={color} size={"1.3em"} />,
        //    title: "Billing",
        //    link: "billing",
        //    comp: <Billing />,
        //  },
         {
           logo: <RiTeamFill color={color} size={"1.3em"} />,
           title: "Team",
           link: "team",
           comp: <Team />,
         },
        //  {
        //    logo: <AiOutlineLineChart color={color} size={"1.3em"} />,
        //    title: "Analytics & Integration",
        //    link: "analytics",
        //    comp: <Analytics />,
        //  },
         //  { logo: "", title: "Blog", link: "blog", comp: <Blog /> },
        //  {
        //    logo: <AiFillApi color={color} size={"1.3em"} />,
        //    title: "API",
        //    link: "api",
        //    comp: <API />,
        //  },
         {
           logo: <BiSupport color={color} size={"1.3em"} />,
           title: "Support",
           link: "support",
           comp: <Support />,
         },
       ],
     },
    //  {
    //    title: "My Account",
    //    link: "/my-account",
    //    settingsItems: [
    //      //  {
    //      //    logo: "",
    //      //    title: "General",
    //      //    link: "general",
    //      //    comp: <GeneralSettings />,
    //      //  },
    //      {
    //        logo: <IoIosWallet color={color} size={"1.3em"} />,
    //        title: "My Wallet",
    //        link: "my-wallet",
    //        comp: <Wallet />,
    //      },
    //      //  {
    //      //    logo: "",
    //      //    title: "Payout Groups",
    //      //    link: "payout-groups",
    //      //    comp: <PayoutGroups />,
    //      //  },
    //      //  { logo: "", title: "Kyc", link: "kyc", comp: <Kyc /> },
    //      {
    //        logo: <AiFillNotification color={color} size={"1.3em"} />,
    //        title: "Notification Settings",
    //        link: "notification-settings",
    //        comp: <NotificationSettings />,
    //      },
    //    ],
    //  },
     //  {
     //    title: "Airdrop",
     //    link: "/airdrop",
     //    settingsItems: [
     //      {
     //        logo: "",
     //        title: "My Airdrops",
     //        link: "my-airdrop",
     //        comp: <MyAirdrop />,
     //      },
     //      {
     //        logo: "",
     //        title: "Notification Settings",
     //        link: "notification-setting",
     //        comp: <NotificationSettingAirdrop />,
     //      },
     //      {
     //        logo: "",
     //        title: "Webhook Settings",
     //        link: "webhook-settings",
     //        comp: <WebhookSettings />,
     //      },
     //    ],
     //  },
     //  {
     //    title: "Gated Links",
     //    link: "/gated-links",
     //    settingsItems: [
     //      {
     //        logo: "",
     //        title: "Gated Links",
     //        link: "gated-link",
     //        comp: <GatedLink />,
     //      },
     //      {
     //        logo: "",
     //        title: "Notifications",
     //        link: "notifications",
     //        comp: <Notifications />,
     //      },
     //      { logo: "", title: "Webhook", link: "webhook", comp: <Webhook /> },
     //    ],
     //  },
     //  {
     //    title: "Waiting List",
     //    link: "/waiting-lists",
     //    settingsItems: [
     //      {
     //        logo: "",
     //        title: "Waiting Lists",
     //        link: "waiting-list",
     //        comp: <WaitingList />,
     //      },
     //      {
     //        logo: "",
     //        title: "Notifications",
     //        link: "notifications",
     //        comp: <NotificationsWaiting />,
     //      },
     //      {
     //        logo: "",
     //        title: "Webhook",
     //        link: "webhook",
     //        comp: <WebhookWaiting />,
     //      },
     //    ],
     //  },
   ];
   const [selectedTab, setSelectedTab] = useState(tab[0]);

   const handleTabSelection=(item)=>{     
      history.replace(`${item.link}/${item.settingsItems[0].link}`);
     setSelectedTab(item)
   }
   useEffect(() => {
     const item = tab.filter((item) => item.link == match.path);

      history.replace(`${item[0].link}/${item[0].settingsItems[0].link}`);
      setSelectedTab(item[0])

   },[])
   
  return (
    <Container className="my-store-cont">
      <Row>
        <Col lg={12} className="mb-3 mt-3">
          {tab.map((item) => (
            <p
              key={item.title}
              className={`tab ${
                item.title == selectedTab.title ? "active" : ""
              }`}
              onClick={() => handleTabSelection(item)}
            >
              {item.title}
            </p>
          ))}
        </Col>
      </Row>
      <Row>
        <Route path={`${selectedTab.link}/:sub`}>
          <Col sm={12} lg={3} className="">
            <SettingsList settingsItems={selectedTab.settingsItems} />
          </Col>
          <Col sm={12} lg={9} className="">
            <SettingsTarget settingsItems={selectedTab.settingsItems} />
          </Col>
        </Route>
      </Row>
    </Container>
  );
};

export default MyStore;
