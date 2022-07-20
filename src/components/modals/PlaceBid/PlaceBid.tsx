import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./placebid.scss";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ethIcon from "../../../assets/svgs/ethereum.svg";
import checkImg from "../../../assets/svgs/checkedBox.svg";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

interface DefaultModalProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title?: string;
  type: "success" | "fail" | "loading";
}

const PlaceBid = ({
  title,
  show,
  handleClose,
  children,
  type,
}: DefaultModalProps) => {
  const [currState, setCurrState] = useState("bid");
  const [price, setPrice] = useState(0);
  const handlePlaceBid = () => {
    setCurrState("checkout");
  };
  return (
    <Dialog
      onClose={handleClose}
      open={show}
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
          {title}
          <button onClick={handleClose}>
            <CloseRoundedIcon />
          </button>
        </div>
        <div className="props">
          {/* <div className="info">
            You are about to place a bid for dddd by furkanmia
          </div> */}
          <div className="your-bid">
            {children}
          </div>
          {/* {currState === "bid" && (
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
        )} */}
      </div>
      </div>
    </Dialog>
  );
};

export interface PlaceBidProps {
  open: boolean;
  onClose: () => void;
}

export default PlaceBid;