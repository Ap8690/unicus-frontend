import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col,Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { IMyAccount } from "../../../../Models/MyAccount";
import { BASE_URL } from "../../../../Utilities/Util";
import SwitchWidget from "./../../SwitchWidget";
import './NotificationSettings.scss'

const NotificationSettings = () => {
  //@ts-ignore
  const [myAccount, setMyAccount] = useState<IMyAccount>({});

  const [ItemSold, setItemSold] = useState(false);
  const [BidActivity, setBidActivity] = useState(false);
  const [PriceChange, setPriceChange] = useState(false);
  const [AuctionExpiration, setAuctionExpiration] = useState(false);
  const [Outbid, setOutbid] = useState(false);
  const [ReferralSuccessful, setReferralSuccessful] = useState(false);
  const [OwnedAssetUpdates, setOwnedAssetUpdates] = useState(false);
  const [SuccessfulPurchase, setSuccessfulPurchase] = useState(false);
  const [Newsletter, setNewsletter] = useState(false);

  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${BASE_URL}/my-account`);
    console.log("resultGen", res.data);
    setMyAccount(res.data.result);
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/my-account`, myAccount);
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
    <div className="general">
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Notification Settings</h4>
              <p>Customize which notifications you would like to receive</p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={ItemSold}
                setIsChecked={setItemSold}
                title={"Item Sold"}
                subtitle={"When someone purchased one of your items"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={BidActivity}
                setIsChecked={setBidActivity}
                title={"Bid Activity"}
                subtitle={"When someone bids on one of your items"}
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col lg={6}>
              <SwitchWidget
                isChecked={PriceChange}
                setIsChecked={setPriceChange}
                title={"Price Change"}
                subtitle={"When an item you made an offer on changes in price"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={AuctionExpiration}
                setIsChecked={setAuctionExpiration}
                title={"Auction Expiration"}
                subtitle={"When a Dutch or English auction you created ends"}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col lg={6}>
              <SwitchWidget
                isChecked={Outbid}
                setIsChecked={setOutbid}
                title={"Outbid"}
                subtitle={
                  "When an offer you placed is exceeded by another user"
                }
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={ReferralSuccessful}
                setIsChecked={setReferralSuccessful}
                title={"Referral Successful"}
                subtitle={"When an item you referred is purchased"}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col lg={6}>
              <SwitchWidget
                isChecked={OwnedAssetUpdates}
                setIsChecked={setOwnedAssetUpdates}
                title={"Owned Asset Updates"}
                subtitle={
                  "When a significant update occurs for one of the items you have purchased on Primary"
                }
              />
            </Col>

            <Col lg={6}>
              <SwitchWidget
                isChecked={SuccessfulPurchase}
                setIsChecked={setSuccessfulPurchase}
                title={"Successful Purchase"}
                subtitle={"When you successfully buy an item"}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col lg={6}>
              <SwitchWidget
                isChecked={Newsletter}
                setIsChecked={setNewsletter}
                title={"Newsletter"}
                subtitle={"Occasional updates from the team"}
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={12}>
              <h4>Minimum Bid Threshold</h4>
              <p>
                Receive notifications only when you receive offers with a value
                greater than or equal to this amount.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Form.Group>
                <Row>
                  <Col xs={2} sm={2} lg={2} md={3}>
                    <Form.Control type="text" value="WETH" id="WETH" disabled />
                  </Col>
                  <Col xs={10} sm={10} lg={10} md={9}>
                    <Form.Control
                      type="number"
                      id="WETHInput"
                      placeholder="0"
                    />
                  </Col>
                </Row>{" "}
              </Form.Group>
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col lg={10}>
              <Form.Group className="">
                <Row>
                  <Col xs={2} sm={2} lg={2} md={3}>
                    <Form.Control
                      type="text"
                      value="WMATIC"
                      id="WMATIC"
                      disabled
                    />
                  </Col>
                  <Col xs={10} sm={10} lg={10} md={9}>
                    <Form.Control
                      type="number"
                      id="WMATICInput"
                      placeholder="0"
                    />
                  </Col>
                </Row>{" "}
              </Form.Group>
            </Col>
          </Row>

          <br></br>
          <Row>
            <Col lg={10}>
              <Form.Group className="">
                <Row>
                  <Col xs={2} sm={2} lg={2} md={3}>
                    <Form.Control type="text" value="WBNB" id="WBNB" disabled />
                  </Col>
                  <Col xs={10} sm={10} lg={10} md={9}>
                    <Form.Control
                      type="number"
                      id="WBNBInput"
                      placeholder="0"
                    />
                  </Col>
                </Row>{" "}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Button variant="primary">Save</Button>{" "}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NotificationSettings;
