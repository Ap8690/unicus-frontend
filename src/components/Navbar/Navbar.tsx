import "./navbar.scss";
import { useEffect, useState } from "react";
import unicusLogo from "../../assets/images/Unicus-logo.png";
import profileLogo from "../../assets/svgs/profileIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie'
import searchIcon from '../../assets/svgs/searchIcon.svg'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

import { ACCESS_TOKEN } from "../../utils/constants";
import { disConnectWallet, isMainStore } from "../../utils/utils";

const 
Navbar = ({store}) => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [solidNav, setSolidNav] = useState(false);

  const [anchorStats, setAnchorStats] = useState<null | HTMLElement>(null);
  const [anchorChains, setAnchorChains] = useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);

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
  const handleCloseChains = (chain:any) => {
    setAnchorChains(null);
    if(chain != ""){
      navigate(`/explore/${chain}`)
    }
  };
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    accessToken
      ? setAnchorProfile(event.currentTarget)
      : navigate(`../connect-wallet${location.pathname}`, { replace: true });
  };
  const handleCloseProfile = () => {
    disConnectWallet();
    setAnchorProfile(null);
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY === 0) return setSolidNav(false);
    if (window.scrollY > 0) return setSolidNav(true);
    setSolidNav(false);
  });

  useEffect(() => {
    console.log("store",store);
    
  }, [])
  

  return (
    <nav className={solidNav ? "solid-nav" : ""}>
      <div className={`navbar`}>
        <Link to={"/home"} className="brand-link">
          <img src={unicusLogo} className="navbar-brand" alt="unicus" />
        </Link>
        <div className="search-bar-box">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="nav-menu-icons">
          <button className="nav-menu-icon">
            <img src={searchIcon} alt="" />
          </button>
          <button className="nav-menu-icon">
            <MenuRoundedIcon />
          </button>
        </div>
        {isMainStore() &&
        (location.pathname === "/home" || location.pathname === "/blog") ? (
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
            {store && Object.keys(store).length !== 0 ? (
              <a
                href={
                  store.domain && store.domain.length > 0
                    ? `https://${store.domain[0]}`
                    : ""
                }
                target="_blank"
              >
                <span className="btn nav-link">Go to My Store</span>
              </a>
            ) : (
              <Link to={"/create-store"} className="btn nav-link">
                Create Store
              </Link>
            )}
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

            {/* <Button
              id="basic-button"
              aria-controls={openStats ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openStats ? "true" : undefined}
              onClick={handleClickStats}
              className="nav-link"
            >
              Stats
            </Button> */}
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
              onClose={() => handleCloseChains("")}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleCloseChains("ethereum")}>
                Ethereum
              </MenuItem>
              <MenuItem onClick={() => handleCloseChains("polygon")}>
                Polygon
              </MenuItem>
              <MenuItem onClick={() => handleCloseChains("binance")}>
                Binance
              </MenuItem>
              <MenuItem onClick={() => handleCloseChains("tron")}>
                Tron
              </MenuItem>
              <MenuItem onClick={() => handleCloseChains("near")}>
                Near
              </MenuItem>
              <MenuItem onClick={() => handleCloseChains("solona")}>
                Solona
              </MenuItem>
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
              {/* <MenuItem onClick={handleCloseProfile}>
                <Link to={"/profile/favourite"} className="menu-link">
                  Favourites
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleCloseProfile}>
                <Link to={"/profile/created"} className="menu-link">
                My NFTs
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseProfile}>
                <Link to={"/profile/listings"} className="menu-link">
                  My Listings
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseProfile}>
                <Link to={"/profile/notification"} className="menu-link">
                  Notification
                </Link>
              </MenuItem> */}
              {!isMainStore() && <MenuItem onClick={handleCloseProfile}>
                <Link to={"/store/settings"} className="menu-link">
                  My Store Settings
                </Link>
              </MenuItem>}
              {/* <MenuItem onClick={handleCloseProfile}>
                <Link to={"/profile/settings"} className="menu-link">
                  Account Settings
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleCloseProfile}>Logout</MenuItem>
              {/* <div className="balance-box">
                <div className="balance">$ 0.000 USD</div>
                <div>Total Balance</div>
              </div> */}
            </Menu>
            {isMainStore() && store && Object.keys(store).length !== 0 ? (
              <a
                href={
                  store.domain && store.domain.length > 0
                    ? `https://${store.domain[0]}`
                    : ""
                }
                target="_blank"
              >
                <button className="btn nav-link">Go to My Store</button>
              </a>
            ) : (
              <button
                onClick={() => navigate("/create-store")}
                className="btn nav-link"
              >
                Create Store
              </button>
            )}

            <button
              onClick={() => navigate(`/connect-wallet${location.pathname}`)}
              className="btn nav-link"
            >
              {accessToken ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
