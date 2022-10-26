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
import {
    disConnectWallet,
    isMainStore,
    getUserInfo,
    getChainId,
} from "../../utils/utils";
import { capitalize, getLocalStorage } from "../../utils/helpers";
import NavMenu from "../menu/NavMenu/NavMenu";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { getLocation, getEnabledStore } from "../../utils/helpers";
import NestedMenu from "../NestedMenu/NestedMenu";
import ChainLogo from "../../components/ChainLogo/ChainLogo";
import CollectinMenu from "../../components/CollectionMenu/CollectionMenu";

const Navbar = ({ store }) => {
    const [search, setSearch] = useState("");
    const { chain, showChains, setShowChains, setShowCategory } =
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

    const handleGlobalSearch = (e: any) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    };
    const handleAuthenticateClick = () => {
        if (getUserInfo()) navigate("/create-store");
        else setShowChains(true);
    };
    const handleRedirectToTokenzie = () => {
        const linkTo = `/asset/tokenise/option_selection`;
        if (!isMainStore()) {
            if (!getUserInfo()) {
                sessionStorage.setItem("redirect_after_login", linkTo);
                // setShowCategory(true);
                let storeEnabled = getEnabledStore(store.advance); // returns enabled chain
                // let nchain: any = getChainId(storeEnabled); // pass enabled chain for storefront
                // localStorage.setItem("CHAIN", nchain); // store enabled chain
                setShowChains(!showChains);
            }
            sessionStorage.setItem("redirect_after_login", linkTo);
            setShowCategory(true);
            return;
        }

        if (!getUserInfo()) {
            setShowChains(!showChains);
            sessionStorage.setItem("redirect_after_login", linkTo);
            return;
        }
        setShowCategory(true);
        sessionStorage.setItem("redirect_after_login", linkTo);
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
                    <Link to={"/marketplace"} className="brand-link">
                        <img
                            src={
                                isMainStore()
                                    ? unicusLogo
                                    : store?.general.logoUrl
                            }
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
                            {/* <CollectinMenu /> */}
                            <Link className="nav-link" to="/collections">
                                Collections
                            </Link>

                            <Link to={"/marketplace"} className="btn nav-link">
                                {getUserInfo() ? "Marketplace" : "Enter App"}
                            </Link>
                            <div className="chainLogo">
                                <ChainLogo />
                            </div>
                        </div>
                    ) : (
                        <div className="nav-links">
                            <NestedMenu chain={chain} />
                            {/* <CollectinMenu /> */}
                            <Link className="nav-link" to="/collections">
                                Collections
                            </Link>
                            {!getUserInfo() ? (
                                <button
                                    onClick={handleRedirectToTokenzie}
                                    className="btn nav-link"
                                >
                                    Tokenise Asset
                                </button>
                            ) : location.pathname.includes("asset") ? (
                                <Link
                                    to={"/marketplace"}
                                    className="btn nav-link"
                                >
                                    {getUserInfo()
                                        ? "Marketplace"
                                        : "Enter App"}
                                </Link>
                            ) : (
                                <button
                                    onClick={handleRedirectToTokenzie}
                                    className="btn nav-link"
                                >
                                    Tokenise Asset
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
            //console.log(err);
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
            <button
                // onMouseOver={handleClickProfile}
                className="nav-link"
                onClick={handleClickProfile}
            >
                <img src={profileLogo} alt="profile" className="nav-icons" />
            </button>
            <Menu
                anchorEl={anchorProfile}
                open={openProfile}
                onClose={handleCloseProfile}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                    onMouseLeave: handleCloseProfile,
                }}
            >
                <MenuItem onClick={handleCloseProfile}>
                    <Link to={"/profile/created"} className="menu-link" replace>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseProfile}>
                    <Link to={"/profile/created"} className="menu-link">
                        My Assets
                    </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleCloseProfile}>
                    <Link to={"/profile/listing"} className="menu-link">
                        My Listings
                    </Link>
                </MenuItem> */}
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
                    store &&
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
