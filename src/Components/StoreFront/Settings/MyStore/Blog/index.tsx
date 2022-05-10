import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import CategoriesBlog from './CategoriesBlog';
import Posts from './Posts';

const Blog = () => {
  const tab = [
    "Posts",
    "Categories"
  ];
  const [selectedTab, setSelectedTab] = useState(tab[0]);
  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <h3>Blog</h3>
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
          {selectedTab == tab[0] ? <Posts /> : ""}
          {selectedTab == tab[1] ? <CategoriesBlog /> : ""}
        </Col>
      </Row>
    </div>
  );
};

export default Blog;