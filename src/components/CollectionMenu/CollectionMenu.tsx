import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/Loading/PageLoader";
import { getUserInfo } from "../../utils/utils";
import { useContext } from "react";
import { ChainContext } from "../../context/ChainContext";

export default function CollectinMenu() {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { showChains, setShowChains } = useContext(ChainContext);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (linkTo: string) => {
        setAnchorEl(null);
        navigate(linkTo);
    };
    const handleCreateCollectionNavigate = (linkTo: string) => {
        setAnchorEl(null);
        if (!getUserInfo()) {
            setShowChains(!showChains);
            sessionStorage.setItem("redirect_after_login", linkTo);
            return;
        }
        navigate(linkTo);
    };

    return (
        <div>
            <button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                // onMouseOver={handleClick}
            >
                Collection <ExpandMoreIcon />
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    onMouseLeave: () => setAnchorEl(null),
                }}
            >
                <MenuItem onClick={() => handleClose("/collections")}>
                    Collections
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        handleCreateCollectionNavigate("/create-collection")
                    }
                >
                    Create Collection
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </div>
    );
}
