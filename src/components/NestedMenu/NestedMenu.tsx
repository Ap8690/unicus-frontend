import React from "react";
import Button from "@mui/material/Button";
import { NestedMenuItem } from "mui-nested-menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NestedMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            <button
                onClick={handleClick}
                className="nav-link capitalize font-normal"
            >
                Select Asset <ExpandMoreIcon />
            </button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <NestedMenuItem style={{paddingLeft: '8px'}} label="Collectibles" parentMenuOpen={open}>
                    <MenuItem onClick={handleClose}>Art</MenuItem>
                    <MenuItem onClick={handleClose}>
                        NFT Collection
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        Trading Cards
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Photography</MenuItem>
                </NestedMenuItem>
                <MenuItem onClick={handleClose}>Carbon Credits</MenuItem>
                <MenuItem onClick={handleClose}>Real Estate</MenuItem>
                <MenuItem onClick={handleClose}>Financial Instruments</MenuItem>
                <MenuItem onClick={handleClose}>Event Tickets</MenuItem>
                <MenuItem onClick={handleClose}>Metaverse</MenuItem>
                <MenuItem onClick={handleClose}>Gaming</MenuItem>
                <MenuItem onClick={handleClose}>Music</MenuItem>
            </Menu>
        </div>
    );
};

export default NestedMenu;
