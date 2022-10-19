import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/Loading/PageLoader";

export default function CollectinMenu() {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (linkTo: string) => {
        setAnchorEl(null);
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
                <MenuItem onClick={() => handleClose("/create-collection")}>
                    Create Collections
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
        </div>
    );
}
