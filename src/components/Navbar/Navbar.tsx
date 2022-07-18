import "./navbar.scss";
import { useState } from "react";
import unicusLogo from "../../assets/images/Unicus-logo.png";
import profileLogo from "../../assets/svgs/profileIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie'

import { ACCESS_TOKEN } from "../../utils/constants";
import { disConnectWallet } from "../../utils/utils";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [solidNav, setSolidNav] = useState(false);

    const [anchorStats, setAnchorStats] = useState<null | HTMLElement>(null);
    const [anchorChains, setAnchorChains] = useState<null | HTMLElement>(null);
    const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(
        null
    );

    const openStats = Boolean(anchorStats);
    const openChains = Boolean(anchorChains);
    const openProfile = Boolean(anchorProfile);

    const accessToken = Cookies.get(ACCESS_TOKEN);

    const handleClickStats = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
        setAnchorStats(event.currentTarget);
    };
    const handleCloseStats = () => {
        setAnchorStats(null);
    };
    const handleClickChains = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget);
        setAnchorChains(event.currentTarget);
    };
    const handleCloseChains = () => {
        setAnchorChains(null);
    };
    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        accessToken
          ? setAnchorProfile(event.currentTarget)
          : navigate(`../connect-wallet${location.pathname}`, { replace: true });
    };
    const handleCloseProfile = () => {
        disConnectWallet()
        setAnchorProfile(null);

    };

    window.addEventListener("scroll", function () {
        if (window.scrollY === 0) return setSolidNav(false);
        if (window.scrollY > 0) return setSolidNav(true);
        setSolidNav(false);
    });

    return (
      <nav className={solidNav ? "solid-nav" : ""}>
        <div className={`navbar`}>
          <Link to={"/"} className="brand-link">
            <img src={unicusLogo} className="navbar-brand" alt="unicus" />
          </Link>
          <SearchBar search={search} setSearch={setSearch} />
          {location.pathname === "/" || location.pathname === "/blog" ? (
            <div className="nav-links">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
              <Link to={"/for-creator"} className="nav-link">
                For Creators
              </Link>
              <Link to={"/token"} className="nav-link">
                Token
              </Link>
              <Link to={"/blog"} className="nav-link">
                Blog
              </Link>
              <Link to={"/create-store"} className="btn nav-link">
                Create Store
              </Link>
              <Link to={"/launchpad"} className="btn nav-link">
                Launchpad
              </Link>
              <Link to={"/marketplace"} className="btn nav-link">
                Marketplace
              </Link>
            </div>
          ) : (
            <div className="nav-links">
              <Link to={"/explore"} className="nav-link">
                Explore
              </Link>

              <Button
                id="basic-button"
                aria-controls={openStats ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openStats ? "true" : undefined}
                onClick={handleClickStats}
                className="nav-link"
              >
                Stats
              </Button>
              <Menu
                anchorEl={anchorStats}
                open={openStats}
                onClose={handleCloseStats}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseStats}>
                  <Link to={"/stats/ranking"} className="menu-link">
                    Ranking
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseStats}>
                  <Link to={"/stats/activity"} className="menu-link">
                    Activity
                  </Link>
                </MenuItem>
              </Menu>
              <button className="nav-link" onClick={handleClickChains}>
                Chains
              </button>
              <Menu
                anchorEl={anchorChains}
                open={openChains}
                onClose={handleCloseChains}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseChains}>Ethereum</MenuItem>
                <MenuItem onClick={handleCloseChains}>Polygon</MenuItem>
                <MenuItem onClick={handleCloseChains}>Tron</MenuItem>
                <MenuItem onClick={handleCloseChains}>Binance</MenuItem>
                <MenuItem onClick={handleCloseChains}>Solana</MenuItem>
                <MenuItem onClick={handleCloseChains}>Avalanche</MenuItem>
              </Menu>
              <Link to={"/create-nft"} className="nav-link">
                Create NFT
              </Link>
              <button className="nav-link" onClick={handleClickProfile}>
                <img src={profileLogo} alt="profile" className="nav-icons" />
              </button>
              <Menu
                anchorEl={anchorProfile}
                open={openProfile}
                onClose={handleCloseProfile}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile"} className="menu-link" replace>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile/favourite"} className="menu-link">
                    Favourites
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile/my-tickets"} className="menu-link">
                    My Tickets
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile/my-collections"} className="menu-link">
                    My Collections
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile/notification"} className="menu-link">
                    Notification
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                  <Link to={"/profile/settings"} className="menu-link">
                    Account Settings
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>Logout</MenuItem>
                <div className="balance-box">
                  <div className="balance">$ 0.000 USD</div>
                  <div>Total Balance</div>
                </div>
              </Menu>
              <button
                onClick={() => navigate("/create-store")}
                className="btn nav-link"
              >
                Create Store
              </button>
              
              <button
                onClick={() => navigate(`/connect-wallet${location.pathname}`)}
                className="btn nav-link"
              >
                {accessToken? "Connected":"Connect Wallet"}
              </button>
            </div>
          )}
        </div>
      </nav>
    );
};

export default Navbar;
