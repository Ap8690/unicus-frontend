import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { IAdvance } from "../../../../Models/Advance";
import { STOREFRONT_URL } from "../../../../Utilities/Util";
import Categories from "./Categories";
import CustomPage from "./CustomPage";
import KYC from "./KYC";
import SiteUrl from "./SiteUrl";
import SupportedNetwork from "./SupportedNetwork";

const Advance = () => {
  //@ts-ignore
  const [advance, setAdvance] = useState<IAdvance>({});
  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${STOREFRONT_URL}/advance`);
    console.log("resultAdvance", res.data.result);
    setAdvance(res.data.result);
  };
  const tab = [
    "Supported Network",
    "KYC Settings",
    "Categories",
    "Site URLs",
    "Custom Store Pages",
  ];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Advance</h3>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="">
          {tab.map((item) => (
            <p
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
          {selectedTab == tab[0] ? <SupportedNetwork {...advance} /> : ""}
          {selectedTab == tab[1] ? <KYC {...advance} /> : ""}
          {selectedTab == tab[2] ? <Categories {...advance} /> : ""}
          {selectedTab == tab[3] ? <SiteUrl {...advance} /> : ""}
          {selectedTab == tab[4] ? <CustomPage {...advance} /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default Advance;
