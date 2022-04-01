import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { IAppearance } from "../../../../Models/Appearance";
import { STOREFRONT_URL } from "../../../../Utilities/Util";
import Featured from "./Featured";
import HeaderSection from "./HeaderSection";
import Others from "./Others";
import Theme from "./Theme";

const Appearance = () => {
  const tab = ["Theme Settings", "Header Section", "Others"];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  //@ts-ignore
  const [appearance, setAppearance] = useState<IAppearance>({});
  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${STOREFRONT_URL}/appearance`);
    setAppearance(res.data.result);
  };
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Appearance</h3>
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
          {selectedTab == tab[0] ? <Theme {...appearance} /> : ""}
          {selectedTab == tab[1] ? <HeaderSection {...appearance} /> : ""}
          {/* {selectedTab == tab[2] ? <Featured {...appearance} /> : ""} */}
          {selectedTab == tab[2] ? <Others {...appearance} /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default Appearance;
