import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { ISeo } from '../../../../Models/Seo';
import { BASE_URL } from '../../../../Utilities/Util';
import MetaTags from './MetaTags';
import RobotTxt from './RobotTxt';
import RSS from './RSSFeed';
import Schema from './Schema';
import SEOTab from './SEO';
import Sitemap from './Sitemap';

const SEO = () => {
  const tab = [
    "SEO",
    "MetaTags",
    "Robots.Txt",
    "Sitemap",
    "RSS Feed",
    "Schema"
  ];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  //@ts-ignore
  const [seo, setSeo] = useState<ISeo>({})
    useEffect(() => {
      post();
    }, []);

    const post = async () => {
      const res = await axios.get(`${BASE_URL}/seo`);
      setSeo(res.data.result);
    };
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>SEO</h3>
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
          {selectedTab == tab[0] ? <SEOTab {...seo} /> : ""}
          {selectedTab == tab[1] ? <MetaTags {...seo} /> : ""}
          {selectedTab == tab[2] ? <RobotTxt {...seo} /> : ""}
          {selectedTab == tab[3] ? <Sitemap {...seo} /> : ""}
          {selectedTab == tab[4] ? <RSS {...seo} /> : ""}
          {selectedTab == tab[5] ? <Schema {...seo} /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default SEO;