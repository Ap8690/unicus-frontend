import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import SwitchWidget from "../../SwitchWidget";
import placeholder from "./../../../../Assets/MyStore/placeholder-logo.svg"
import fbLogo from "./../../../../Assets/MyStore/fb-logo.svg"

import './Wallet.scss'


const Wallet = () => {



  

  return (
    <div className="general">
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>My Wallet</h4>
              <p>
              Address: 0x17521eb2d93878a41bae88ee2cf2deaf0ccbab81
              </p>
            </Col>
          </Row>
          <Col lg={6}>
          <div className="WalletBalancesdiv">
               
               <label>Wallet Balances</label>
               <span className="WalletValueSize">0.0000 DOG$</span>
               <span className="WalletValueSize">0.0000 WBNB</span>
               <span className="WalletValueSize">0.0000 BNB</span>
               </div>
            </Col>
       </Col>
      </Row>  
    </div>
  );
};

    
export default Wallet;