import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAdvance } from "../../../../../Models/Advance";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";

const SupportedNetwork = (advance:IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({})
  const [showEth, setShowEth] = useState(true);
  const [showPoly, setShowPoly] = useState(true);
  const [showBinance, setShowBinance] = useState(true);
  const [showEthDisabled, setShowEthDisabled] = useState(false);
  const [showPolyDisabled, setShowPolyDisabled] = useState(false);
  const [showBinanceDisabled, setShowBinanceDisabled] = useState(false);
  const [showCronos, setShowCronos] = useState();

  useEffect(() => {
    setAdvance(advance)
    try{
    console.log("resultSupprt", advance.showEth.enabled);
    setShowEth(advance.showEth.enabled)
    setShowPoly(advance.showPoly.enabled)
    setShowBinance(advance.showBinance.enabled)
    setShowEthDisabled(advance.showEth.assetsMinted)
    setShowPolyDisabled(advance.showPoly.assetsMinted);
    setShowBinanceDisabled(advance.showBinance.assetsMinted);
    }
    catch(err){
      console.log("err", err);
    }
  }, [advance])
  useEffect(() => {
    setAdvance({
      ...advances,
      showEth: { enabled: showEth, assetsMinted: showEthDisabled },
      showPoly: { enabled: showPoly, assetsMinted: showPolyDisabled },
      showBinance: { enabled: showBinance, assetsMinted: showBinanceDisabled },
    });
  }, [showEth, showBinance, showPolyDisabled]);
  
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/advance`, advances);
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
              <h4>Select Blockchains</h4>
              <p>
                You can specify which Blockchain will work on your
                Marketplace/Store. Users will be able to Buy, Sell NFT
                Collectibles only on below selected Blockchains
              </p>
              <p>
                A network cannot be disabled once an asset is minted on that
                network
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={showEth}
                setIsChecked={setShowEth}
                disabled={showEthDisabled}
                title={"Ethereum (Mainnet)"}
                subtitle={""}
              />
            </Col>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showPoly}
                setIsChecked={setShowPoly}
                disabled={showPolyDisabled}
                title={"Polygon (Mainnet)"}
                subtitle={""}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <SwitchWidget
                isChecked={showBinance}
                setIsChecked={setShowBinance}
                disabled={showBinanceDisabled}
                title={"Binance Smart Chain (Mainnet)"}
                subtitle={""}
              />
            </Col>
            {/* <Col lg={6}>
              <SwitchWidget
                isChecked={showCronos}
                setIsChecked={setShowCronos}
                title={"Cronos (Mainnet)"}
                subtitle={""}
              />
            </Col> */}
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

export default SupportedNetwork;
