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
import ChainLogo from "../../components/ChainLogo/ChainLogo";

const Navbar = ({ store }) => {
    const [search, setSearch] = useState("");
    const { chain, setChain, showChains, setShowChains, setShowCategory } =
        useContext(ChainContext);
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
        if (getUserInfo()) navigate("/create-store");
        else setShowChains(true);
    };
    const handleRedirectToTokenzie = () => {
        // if(sessionStorage.getItem("CATEGORY")) {
        //     navigate('/create-nft')
        //     return
        // }
        setShowCategory(true);
    };

    useEffect(() => {
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
                setShowChains={setShowChains}
                showChains={showChains}
                chain={chain}
                handleGlobalSearch={handleGlobalSearch}
                handleRedirectToTokenzie={handleRedirectToTokenzie}
            />
            <nav className={solidNav ? "solid-nav" : ""}>
                <div className={`navbar`}>
                    <Link to={"/home"} className="brand-link">
                        <img
                            src={unicusLogo}
                            className={
                                window.location.pathname.includes("explore")
                                    ? "navbar-brand logo--fix"
                                    : "navbar-brand"
                            }
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
                        <ChainLogo />
                        <ProfileButton
                            accessToken={accessToken}
                            store={store}
                            setShowChains={setShowChains}
                            showChains={showChains}
                            handleAuthenticateClick={handleAuthenticateClick}
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
                            <NestedMenu chain={chain} />
                            <Link to={"/marketplace"} className="btn nav-link">
                                Marketplace
                            </Link>
                            <div className="chainLogo">
                                <ChainLogo />
                            </div>
                        </div>
                    ) : (
                        <div className="nav-links">
                            <NestedMenu chain={chain} />
                            {!getUserInfo() ? (
                                <button
                                    onClick={() => setShowChains(!showChains)}
                                    className="btn nav-link"
                                >
                                    Tokenize Asset
                                </button>
                            ) : location.pathname.includes("create-nft") ? (
                                <Link
                                    to={"/marketplace"}
                                    className="btn nav-link"
                                >
                                    Marketplace
                                </Link>
                            ) : (
                                <button
                                    onClick={handleRedirectToTokenzie}
                                    className="btn nav-link"
                                >
                                    Tokenize Asset
                                </button>
                            )}

                            {getUserInfo() && (
                                <ProfileButton
                                    accessToken={accessToken}
                                    store={store}
                                    setShowChains={setShowChains}
                                    showChains={showChains}
                                    handleAuthenticateClick={
                                        handleAuthenticateClick
                                    }
                                />
                            )}
                            <div className="chainLogo">
                                <ChainLogo />
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

const ProfileButton = ({
    accessToken,
    store,
    setShowChains,
    showChains,
    handleAuthenticateClick,
}) => {
    const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(
        null
    );
    const openProfile = Boolean(anchorProfile);
    const location = useLocation();
    const navigate = useNavigate();
    const { disconnect } = useWallet();

    const handleDisconnect = async () => {
        try {
            await disConnectWallet();
            await disconnect();
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        accessToken
            ? setAnchorProfile(event.currentTarget)
            : setShowChains(!showChains);
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
                        My Assets
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                    <Link to={"/profile/listing"} className="menu-link">
                        My Listings
                    </Link>
                </MenuItem>
                {isMainStore() && store && Object.keys(store).length !== 0 ? (
                    <MenuItem onClick={handleCloseProfile}>
                        <a
                            href={
                                store.domain && store.domain.length > 0
                                    ? `http://${store.domain[0]}`
                                    : ""
                            }
                            target="_blank"
                        >
                            <button>Go to My Store</button>
                        </a>
                    </MenuItem>
                ) : (
                    isMainStore() && (
                        <MenuItem onClick={handleCloseProfile}>
                            <button
                                onClick={handleAuthenticateClick}
                                // className="btn nav-link"
                            >
                                Create Store
                            </button>
                        </MenuItem>
                    )
                )}
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
                    <p className="menu-link">Logout</p>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Navbar;
