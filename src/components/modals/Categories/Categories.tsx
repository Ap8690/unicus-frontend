import Dialog from "@mui/material/Dialog";
import Paper from '@mui/material/Paper'
import "../WalletsModal/ChainModal.scss";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ChainContext } from "../../../context/ChainContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Transition} from "../../Animation/Transition/Transition";
import Alert from '@mui/material/Alert';
import {AssetList} from "../../../utils/AssetList";
import uuid from "react-uuid"
import {getAccessToken} from "../../../services/api/supplier"

const CategoryCard = ({asset,handleCategory,category}) => {
    const paperStyle = "box py-4 rounded-2xl category-paper hover:border hover:border-white border border-black cursor-pointer flex justify-center items-center overflow-hidden w-full"
    return (
        <Paper
            elevation={3}
            onClick={() => handleCategory(asset)}
            className={asset === category ? `border border-white ${paperStyle}` : paperStyle }
        >
            <button className="wallet-logo flex items-center justify-center flex-col">
                <span className="text-white font-medium text-[20px]">
                 {asset}
                </span>
            </button>
        </Paper>
    );
};
const alertBox = {
    backgroundColor: 'inherit',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
 
const CategoriesModal = ({ open, setOpen, setWalletModal }) => {
    let navigate = useNavigate()
    const { category, setCategory } = useContext(ChainContext);
    const handleClose = () => {
        setOpen(false);
    }; 
    const handleCategory = (category:any) => {
        if(!getAccessToken()) {
            setOpen(false);
            setWalletModal(true);
            setCategory(category?.toLowerCase());
            sessionStorage.setItem("CATEGORY", category);
        }
        else {
            setOpen(false);
            setCategory(category?.toLowerCase());
            sessionStorage.setItem("CATEGORY", category);
            navigate('/create-nft')
        }
        
    };
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    padding: 0,
                    background: "black",
                    width: "600px",
                    borderRadius: "16px",
                    filter: "drop-shadow(0 0 5px #333)",
                },
            }}
        >
            <div className="dialog-title">
                Select a Category
                <button onClick={handleClose}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="grid overflow-hidden grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 w-auto m-4">
              {
                AssetList.map((asset: string) => {
                  return <CategoryCard key={uuid()} category={category} handleCategory={handleCategory}  asset={asset}/>
                })
              }
            </div>
                {/* <Alert sx={alertBox} severity="info">You will be exploring assets on the chain you are selecting right now.</Alert> */}
        </Dialog>
    );
};

export default CategoriesModal;
