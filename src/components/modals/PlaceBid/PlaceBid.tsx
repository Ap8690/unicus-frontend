import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./placebid.scss";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ethIcon from "../../../assets/svgs/ethereum.svg";
import checkImg from "../../../assets/svgs/checkedBox.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const PlaceBid = (props: PlaceBidProps) => {
  const [currState, setCurrState] = useState("bid");
  const [price, setPrice] = useState(0);
  const { onClose, open } = props;
  const handlePlaceBid = () => {
    setCurrState("checkout");
  };
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          padding: 0,
          background: "black",
          width: "600px",
          borderRadius: "32px",
          filter: "drop-shadow(0 0 5px #333)",
        },
      }}
    >
      <div className="place-bid-dialog">
        <div className="dialog-title">
          {currState === "bid" && "Add Properties"}
          {currState === "checkout" && "Add Properties"}
          <button onClick={onClose}>
            <CloseRoundedIcon />
          </button>
        </div>
        <div className="props">
          <div className="info">
            You are about to place a bid for dddd by furkanmia
          </div>
          <div className="your-bid">
            <div>Your Bid</div>
            <div className="priceBar">
              <div className="eth">
                <img src={ethIcon} alt="" />
                <span>ETH</span>
              </div>
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div onClick={() => setPrice(100)} className="priceset">
                $100
              </div>
            </div>
          </div>
          {currState === "bid" && (
            <div className="terms">
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<img src={checkImg} alt="" />}
                required
              />
              <div>
                By checking this box, I agree to Unicus One's Terms of Service
              </div>
            </div>
          )}
          {currState === "checkout" && (
            <div className="price-info">
              <div>
                <span>Your balance</span>
                <span>{8.555} ETH</span>
              </div>
              <div>
                <span>Service fee</span>
                <span>{0} ETH</span>
              </div>
              <div>
                <span>You will pay</span>
                <span>{0} ETH</span>
              </div>
            </div>
          )}
        </div>
        {currState === "bid" && (
          <div className="save-btn">
            <button onClick={handlePlaceBid} className="btn">
              Place Bid
            </button>
          </div>
        )}
        {currState === "checkout" && (
          <div className="save-btn">
            <button className="btn">I understand, continue</button>
            <button className="btn-dark btn">Cancel</button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export interface PlaceBidProps {
  open: boolean;
  onClose: () => void;
}

export default PlaceBid;