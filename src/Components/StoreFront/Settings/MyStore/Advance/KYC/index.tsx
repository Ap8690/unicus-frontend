import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { backendUrl } from "../../../../../../config";
import { IAdvance } from "../../../../../../Models/Advance";
import SwitchWidget from "../../../SwitchWidget";

const KYC = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  const [showSellerKyc, setShowSeller] = useState(false);
  const [showBuyerKyc, setShowBuyer] = useState(false);
useEffect(() => {
  setAdvance(advance);
  try {
    setShowSeller(advance.showSellerKyc);
    setShowBuyer(advance.showBuyerKyc);
  
  } catch (err) {
    console.log("err", err);
  }
}, [advance]);
useEffect(() => {
  setAdvance({
    ...advances,
    showBuyerKyc,
    showSellerKyc
  });
}, [showSellerKyc, showBuyerKyc]);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${backendUrl}/advance`, advances);
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
              <h4>KYC Settings</h4>
              <p>
                Note: This is to enable KYC for seller/buyers for this store.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showSellerKyc}
                setIsChecked={setShowSeller}
                title={"Enable Seller KYC"}
                subtitle={"Sellers will need to be KYC approved to sell items"}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showBuyerKyc}
                setIsChecked={setShowBuyer}
                title={"Enable Buyer KYC"}
                subtitle={"Buyers will need to be KYC approved to buy items"}
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="SaveChangesBtn">
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default KYC;
