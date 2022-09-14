import "./navbar.scss";
import { useEffect, useState, useContext } from "react";
import unicusLogo from "../../assets/images/Unicus-logo.png";
import profileLogo from "../../assets/svgs/profileIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import searchIcon from "../../assets/svgs/searchIcon.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { ChainContext } from "../../context/ChainContext";
import { ACCESS_TOKEN } from "../../utils/constants";
import { disConnectWallet, isMainStore, getUserInfo } from "../../utils/utils";
import { capitalize, getLocalStorage } from "../../utils/helpers";
import NavMenu from "../menu/NavMenu/NavMenu";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { getLocation } from "../../utils/helpers";
import NestedMenu from "../NestedMenu/NestedMenu";

const Navbar = ({ store }) => {
    const [search, setSearch] = useState("");
    const { chain, setChain, showChains, setShowChains } = useContext(ChainContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [solidNav, setSolidNav] = useState(false);
    const [menu, setMenu] = useState(false);
    const [anchorStats, setAnchorStats] = useState<null | HTMLElement>(null);
    const [anchorChains, setAnchorChains] = useState<null | HTMLElement>(null);
    const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(
        null
    );
    const openChains = Boolean(anchorChains);
    const accessToken = Cookies.get(ACCESS_TOKEN);

    
    const handleCloseChains = (chain: any) => {
        setAnchorChains(null);
        if (chain !== "") {
            setChain(chain);
            toast.dismiss();
            if (chain !== "all")
                toast.info(`You are on ${capitalize(chain)} network`);
        }
    };

    const handleGlobalSearch = (e: any) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    };
    const handleAuthenticateClick = () => {
        if(getUserInfo()) navigate("/create-store")
        else setShowChains(true)
                                        
    }
    useEffect(() => {
        console.log("accessToken ", accessToken);
        function new_bg() {
            if (window.scrollY === 0) return setSolidNav(false);
            if (window.scrollY > 0) return setSolidNav(true);
            setSolidNav(false);
        }
        window.addEventListener("scroll", new_bg);

        return () => {
            window.removeEventListener("scroll", new_bg);
        };
    }, []);

    return (
        <>
            <NavMenu
                open={menu}
                setOpen={setMenu}
                search={search}
                setSearch={setSearch}
                store={store}
            />
            <nav className={solidNav ? "solid-nav" : ""}>
                <div className={`navbar`}>
                    <Link to={"/home"} className="brand-link">
                        <img
                            src={unicusLogo}
                            className="navbar-brand"
                            alt="unicus"
                        />
                    </Link>
                    {getLocation("/explore") && (
                        <div className="search-bar-box">
                            <SearchBar
                                handleGlobalSearch={handleGlobalSearch}
                                search={search}
                                setSearch={setSearch}
                            />
                        </div>
                    )}
                    <div className="nav-menu-icons">
                        <ProfileButton
                            accessToken={accessToken}
                            store={store}
                            setShowChains={setShowChains}
                            showChains={showChains}
                        />
                        <button
                            className="nav-menu-icon"
                            onClick={() => setMenu(true)}
                        >
                            <MenuRoundedIcon />
                        </button>
                    </div>
                    {isMainStore() &&
                    (location.pathname === "/home" ||
                        location.pathname === "/blog") ? (
                        <div className="nav-links">
                            <Link to={"/about-us"} className="nav-link">
                                About
                            </Link>
                            <Link to={"/resources"} className="nav-link">
                                Resources
                            </Link>
                            <Link to={"/explore"} className="nav-link">
                                Explore
                            </Link>
                            <Link to={"/marketplace"} className="btn nav-link">
                                Marketplace
                            </Link>
                            {store && Object.keys(store).length !== 0 ? (
                                <a
                                    href={
                                        store.domain && store.domain.length > 0
                                            ? `http://${store.domain[0]}`
                                            : ""
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="btn nav-link">
                                        Go to My Store
                                    </span>
                                </a>
                            ) : (
                                isMainStore() && (
                                    <button
                                        onClick={handleAuthenticateClick}
                                        className="btn nav-link"
                                    >
                                        Create Store
                                    </button>
                                )
                            )}
                            {/* <Link to={"/launchpad"} className="btn nav-link">
                                Launchpad
                            </Link> */}
                        </div>
                    ) : (
                        <div className="nav-links">
                            <NestedMenu chain={chain}/>
                            <Link to={`/explore/${chain}`} className="nav-link">
                                Explore
                            </Link>
                           {/* {!getUserInfo() && <button
                                className="nav-link"
                                onClick={handleClickChains}
                            >
                                Chains
                            </button>} */}

                            {getUserInfo() ? 
                            getLocalStorage("walletChain") === "Tron" ? (
                                <Menu
                                    anchorEl={anchorChains}
                                    open={openChains}
                                    onClose={() => handleCloseChains("")}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("tron")
                                        }
                                        selected={chain === "tron"}
                                    >
                                        Tron
                                    </MenuItem>
                                </Menu>
                            ) : getLocalStorage("walletChain") === "Near" ? (
                                <Menu
                                    anchorEl={anchorChains}
                                    open={openChains}
                                    onClose={() => handleCloseChains("")}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("near")
                                        }
                                        selected={chain === "near"}
                                    >
                                        Near
                                    </MenuItem>
                                </Menu>
                            ) : getLocalStorage("walletChain") === "Solana" ? (
                                <Menu
                                    anchorEl={anchorChains}
                                    open={openChains}
                                    onClose={() => handleCloseChains("")}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("solana")
                                        }
                                        selected={chain === "solana"}
                                    >
                                        Solana
                                    </MenuItem>
                                </Menu>
                            ) : (
                                <Menu
                                    anchorEl={anchorChains}
                                    open={openChains}
                                    onClose={() => handleCloseChains("")}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    {" "}
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("ethereum")
                                        }
                                        selected={chain === "ethereum"}
                                    >
                                        Ethereum
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("polygon")
                                        }
                                        selected={chain === "polygon"}
                                    >
                                        Polygon
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("binance")
                                        }
                                        selected={chain === "binance"}
                                    >
                                        Binance
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("avalanche")
                                        }
                                        selected={chain === "avalanche"}
                                    >
                                        Avalanche
                                    </MenuItem>
                                </Menu>
                            ) : 
                            <Menu
                                    anchorEl={anchorChains}
                                    open={openChains}
                                    onClose={() => handleCloseChains("")}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                            <MenuItem
                                        onClick={() =>
                                            handleCloseChains("ethereum")
                                        }
                                        selected={chain === "ethereum"}
                                    >
                                        Ethereum
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("polygon")
                                        }
                                        selected={chain === "polygon"}
                                    >
                                        Polygon
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("binance")
                                        }
                                        selected={chain === "binance"}
                                    >
                                        Binance
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("avalanche")
                                        }
                                        selected={chain === "avalanche"}
                                    >
                                        Avalanche
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("solana")
                                        }
                                        selected={chain === "solana"}
                                    >
                                        Solana
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("near")
                                        }
                                        selected={chain === "near"}
                                    >
                                        Near
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            handleCloseChains("tron")
                                        }
                                        selected={chain === "tron"}
                                    >
                                        Tron
                                    </MenuItem>
                                </Menu>
                                
                                }

                            {/* <Link to={"/create-nft"} className="nav-link">
                                Create NFT
                            </Link> */}
                            {!getUserInfo() ? (
                                <button
                                    onClick={
                                        () => setShowChains(!showChains)
                                    }
                                    className="btn nav-link"
                                >
                                    Select Chain
                                </button>
                            ) : (
                                <Link
                                    to={"/marketplace"}
                                    className="btn nav-link"
                                >
                                    Marketplace
                                </Link>
                            )}
                            {isMainStore() &&
                            store &&
                            Object.keys(store).length !== 0 ? (
                                <a
                                    href={
                                        store.domain && store.domain.length > 0
                                            ? `http://${store.domain[0]}`
                                            : ""
                                    }
                                    target="_blank"
                                >
                                    <button className="btn nav-link">
                                        Go to My Store
                                    </button>
                                </a>
                            ) : (
                                isMainStore() && (
                                    <button
                                        onClick={handleAuthenticateClick}
                                        className="btn nav-link"
                                    >
                                        Create Store
                                    </button>
                                )
                            )}

                            {getUserInfo() && <ProfileButton
                                accessToken={accessToken}
                                store={store}
                                setShowChains={setShowChains}
                                showChains={showChains}
                            />}
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

const ProfileButton = ({ accessToken, store,setShowChains,showChains }) => {
    const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(
        null
    );
    const openProfile = Boolean(anchorProfile);
    const location = useLocation();
    const navigate = useNavigate();
    const { disconnect } = useWallet();

    const handleDisconnect = async () => {
        disConnectWallet();
        await disconnect();
    };

    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        accessToken
            ? setAnchorProfile(event.currentTarget)
            : setShowChains(!showChains)
    };
    const handleCloseProfile = () => {
        setAnchorProfile(null);
    };

    return (
        <>
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
                    <Link to={"/profile/created"} className="menu-link">
                        My NFTs
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                    <Link to={"/profile/listing"} className="menu-link">
                        My Listings
                    </Link>
                </MenuItem>
                {!isMainStore() &&
                    store.general &&
                    store.general.user === getUserInfo()._id && (
                        <MenuItem onClick={handleCloseProfile}>
                            <Link to={"/store/settings"} className="menu-link">
                                My Store
                            </Link>
                        </MenuItem>
                    )}
                <MenuItem onClick={() => handleDisconnect()}>
                    <p
                        className="menu-link"
                    >
                        Logout
                    </p>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Navbar;
