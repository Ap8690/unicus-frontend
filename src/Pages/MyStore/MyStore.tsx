import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import NotificationSettings from "../../Components/StoreFront/MyAccount/NotificationSettings";
import Wallet from "../../Components/StoreFront/MyAccount/Wallet";
import Advance from "../../Components/StoreFront/MyStore/Advance";
import Analytics from "../../Components/StoreFront/MyStore/Analytics";
import API from "../../Components/StoreFront/MyStore/API";
import Appearance from "../../Components/StoreFront/MyStore/Appearance";
import Billing from "../../Components/StoreFront/MyStore/Billing";
import General from "../../Components/StoreFront/MyStore/General";
import SEO from "../../Components/StoreFront/MyStore/SEO";
import Support from "../../Components/StoreFront/MyStore/Support";
import Team from "../../Components/StoreFront/MyStore/Team";
import SettingsList from "../../Components/StoreFront/SettingsList";
import SettingsTarget from "../../Components/StoreFront/SettingsTarget";

import "./style.scss";

const MyStore = () => {
  const history = useHistory();
  const match = useRouteMatch();

  const tab = [
    //  { title: "My NFTs", link: "my-nft",  },
    {
      title: "My Store",
      link: "/my-store",
      settingsItems: [
        { logo: "", title: "General", link: "general", comp: <General /> },
        { logo: "", title: "Advance", link: "advance", comp: <Advance /> },
        { logo: "", title: "SEO", link: "seo", comp: <SEO /> },
        {
          logo: "",
          title: "Appearance",
          link: "appearance",
          comp: <Appearance />,
        },
        { logo: "", title: "Billing", link: "billing", comp: <Billing /> },
        { logo: "", title: "Team", link: "team", comp: <Team /> },
        {
          logo: "",
          title: "Analytics & Integration",
          link: "analytics",
          comp: <Analytics />,
        },
        //  { logo: "", title: "Blog", link: "blog", comp: <Blog /> },
        { logo: "", title: "API", link: "api", comp: <API /> },
        { logo: "", title: "Support", link: "support", comp: <Support /> },
      ],
    },
    {
      title: "My Account",
      link: "/my-account",
      settingsItems: [
        //  {
        //    logo: "",
        //    title: "General",
        //    link: "general",
        //    comp: <GeneralSettings />,
        //  },
        { logo: "", title: "My Wallet", link: "my-wallet", comp: <Wallet /> },
        //  {
        //    logo: "",
        //    title: "Payout Groups",
        //    link: "payout-groups",
        //    comp: <PayoutGroups />,
        //  },
        //  { logo: "", title: "Kyc", link: "kyc", comp: <Kyc /> },
        {
          logo: "",
          title: "Notification Settings",
          link: "notification-settings",
          comp: <NotificationSettings />,
        },
      ],
    },
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

  const handleTabSelection = (item) => {
    history.replace(`${item.link}/${item.settingsItems[0].link}`);
    setSelectedTab(item);
  };
  useEffect(() => {
    console.log(
      "set",
      selectedTab,
      tab.filter((item) => item.link == match.path)
    );
    const item = tab.filter((item) => item.link == match.path);

    history.replace(`${item[0].link}/${item[0].settingsItems[0].link}`);
    setSelectedTab(item[0]);
  }, []);

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
