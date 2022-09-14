import React, { useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { NestedMenuItem } from "mui-nested-menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useNavigate} from "react-router-dom"
import {UserContext} from "../../context/UserContext"

const NestedMenu = ({chain}) => {
    let navigate = useNavigate()
    const {filter,setFilter} = useContext(UserContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent) => setAnchorEl(e.currentTarget);
    const handleClose = (redirect:any) => {
        setAnchorEl(null)

        navigate(`/explore/${chain}?search=${redirect.toLowerCase()}`)
        setFilter(redirect.toLowerCase())
    }

    return (
        <div>
            <button
                onClick={handleClick}
                className="nav-link capitalize font-normal"
            >
                Select Asset <ExpandMoreIcon />
            </button>
            <Menu anchorEl={anchorEl} open={open} onClose={() =>setAnchorEl(null)}>
                <NestedMenuItem style={{paddingLeft: '8px'}} label="Collectibles" parentMenuOpen={open}>
                    <MenuItem onClick={() =>handleClose('Art')}>Art</MenuItem>
                    <MenuItem onClick={() =>handleClose('NFT Collection')}>
                        NFT Collection
                    </MenuItem>
                    <MenuItem onClick={() =>handleClose(' Trading Cards')}>
                        Trading Cards
                    </MenuItem>
                    <MenuItem onClick={() =>handleClose('Photography')}>Photography</MenuItem>
                </NestedMenuItem>
                <MenuItem onClick={() =>handleClose('Carbon Credits')}>Carbon Credits</MenuItem>
                <MenuItem onClick={() =>handleClose('Real Estate')}>Real Estate</MenuItem>
                <MenuItem onClick={() =>handleClose('Financial Instruments')}>Financial Instruments</MenuItem>
                <MenuItem onClick={() =>handleClose('Event Tickets')}>Event Tickets</MenuItem>
                <MenuItem onClick={() =>handleClose('Metaverse')}>Metaverse</MenuItem>
                <MenuItem onClick={() =>handleClose('Gaming')}>Gaming</MenuItem>
                <MenuItem onClick={() =>handleClose('Music')}>Music</MenuItem>
            </Menu>
        </div>
    );
};

export default NestedMenu;
