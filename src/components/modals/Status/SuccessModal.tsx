import Dialog, {DialogProps} from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "../PlaceBid/PlaceBid";
import "../WalletsModal/ChainModal"
import {Transition} from "../../Animation/Transition/Transition";
import {background} from "../modalBackground"
import Lottie from "lottie-react";
import SuccessAnimation from "../../Lottie/Success.json";

interface SimpleDialogProps extends DialogProps {
  title: string,
  message: string,
};

const SuccessModal: React.FC<SimpleDialogProps> = ({ title, message, ...props }): JSX.Element => {
    
    return (
        <Dialog
            TransitionComponent={Transition}
            PaperProps={background}
            {...props}
        >
            <div className="dialog-title">
                {title}
                {/* <button onClick={handleClose}>
                    <CloseRoundedIcon />
                </button> */}
            </div>
            <div className="min-h-[250px] flex justify-center items-center flex-col">
                <Lottie animationData={SuccessAnimation} style={{
                    height: '160px'
                }}/>;
              <span className="text-white font-medium text-xl ">{message}</span>
            </div>
        </Dialog>
    );
};

export default SuccessModal;
