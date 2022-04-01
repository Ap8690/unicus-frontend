import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { IAnalytics } from "../../../../Models/Analytics";
import { STOREFRONT_URL } from "../../../../Utilities/Util";
import AnalyticsTab from "./AnalyticsTab";
import Integration from "./Integration";
import Zapier from "./Zapier";

const Analytics = () => {
  const tab = ["Integration", "Analytics", "Zapier"];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  //@ts-ignore
  const [analytics, setAnalytics] = useState<IAnalytics>({});
  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${STOREFRONT_URL}/analytics`);
    console.log("resultGen", res.data);
    setAnalytics(res.data.result);
  };
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Analytics & Integration</h3>
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
          {selectedTab == tab[0] ? <Integration {...analytics} /> : ""}
          {selectedTab == tab[1] ? <AnalyticsTab {...analytics} /> : ""}
          {selectedTab == tab[2] ? <Zapier /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
