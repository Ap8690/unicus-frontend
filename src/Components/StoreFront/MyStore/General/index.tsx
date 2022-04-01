import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { IGeneral } from "../../../../Models/General";
import { STOREFRONT_URL } from "../../../../Utilities/Util";
import BasicSettings from "./BasicSettings";
import ContactUs from "./ContactUs";
import Cookies from "./Cookie";
import "./general.scss";
import Name from "./Name";
import SocialLink from "./SocialLink";
import StoreFees from "./StoreFees";

const General = () => {
  const tab = [
    "Name & Logo",
    "Basic Settings",
    "Contact Us",
    "Cookie Consent",
    "Store Fees",
    "Social Links",
  ];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  //@ts-ignore
  const [general, setGeneral] = useState<IGeneral>({});

  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${STOREFRONT_URL}/general`);
    console.log("resultGen", res.data);
    setGeneral(res.data.result);
  };
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>General</h3>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="">
          {tab.map((item) => (
            <p
              key={item}
              className={`tab ${item == selectedTab ? "active" : ""}`}
              onClick={() => setSelectedTab(item)}
            >
              {item}
            </p>
          ))}
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="mt-4">
          {selectedTab == tab[0] ? <Name {...general} /> : ""}
          {selectedTab == tab[1] ? <BasicSettings {...general} /> : ""}
          {selectedTab == tab[2] ? <ContactUs {...general} /> : ""}
          {selectedTab == tab[3] ? <Cookies {...general} /> : ""}
          {selectedTab == tab[4] ? <StoreFees {...general} /> : ""}
          {selectedTab == tab[5] ? <SocialLink /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default General;
