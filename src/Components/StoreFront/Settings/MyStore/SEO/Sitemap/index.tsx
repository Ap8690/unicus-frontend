import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { ISeo } from "../../../../../Models/Seo";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const Sitemap = (seo:ISeo) => {
  //@ts-ignore
  const [Seo, setSeo] = useState<ISeo>({});
  const [showSeller, setShowSeller] = useState(false);
  const [showBuyer, setShowBuyer] = useState(false);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/seo`, seo);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Sitemap</h4>
              <p>
                Note: You can choose here to publish your sitemap.html and
                sitemap.xml files for your website.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showSeller}
                setIsChecked={setShowSeller}
                title={"Sitemap.html"}
                subtitle={"You can check sitemap.html here"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showBuyer}
                setIsChecked={setShowBuyer}
                title={"Sitemap.xml"}
                subtitle={"You can check sitemap.xml here"}
              />
            </Col>
          </Row>
          <Row className="">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showSeller}
                setIsChecked={setShowSeller}
                title={"Sitemap_Pages.xml"}
                subtitle={"You can check sitemap_pages.xml here"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showBuyer}
                setIsChecked={setShowBuyer}
                title={"Nft_Collections.xml"}
                subtitle={"You can check nft_collections.xml here"}
              />
            </Col>
          </Row>
          <Row className="">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showSeller}
                setIsChecked={setShowSeller}
                title={"Nft_Items.xml"}
                subtitle={"You can check nft_items.xml here"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showBuyer}
                setIsChecked={setShowBuyer}
                title={"Users.xml"}
                subtitle={"You can check users.xml here"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Sitemap;
