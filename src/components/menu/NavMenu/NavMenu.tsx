import Drawer from "@mui/material/Drawer";
import SearchBar from "../../SearchBar/SearchBar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./navmenu.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo, isMainStore } from "../../../utils/utils";
import { Link } from "react-router-dom";
import NestedMenu from "../../NestedMenu/NestedMenu";

const NavMenu = ({
    open,
    setOpen,
    search,
    setSearch,
    store,
    setShowChains,
    showChains,
    chain,
    handleRedirectToTokenzie,
    handleGlobalSearch
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const toggleDrawer = () => {
        setOpen(false);
    };

    const handleChain = (e: any) => {
        const { name } = e.target;
        navigate(`/explore/${name}`);
        toggleDrawer();
    };
    return (
        <Drawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer}
            PaperProps={{
                className: "menuPaperComponent navMenuComponent",
            }}
        >
            <div className="search-close">
                <SearchBar
                    handleGlobalSearch={handleGlobalSearch}
                    search={search}
                    setSearch={setSearch}
                />
                <button onClick={toggleDrawer}>
                    <CloseRoundedIcon />
                </button>
            </div>

            {isMainStore() &&
            (location.pathname === "/home" || location.pathname === "/blog") ? (
                <div className="nav-links main">
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
                </div>
            ) : (
                <div className="nav-links main">
                    <NestedMenu chain={chain} />
                    
                    {!getUserInfo() ? (
                        <button
                            onClick={() => setShowChains(!showChains)}
                            className="btn nav-link"
                        >
                            Tokenise Asset
                        </button>
                    ) : location.pathname.includes("create-nft") ? (
                        <Link to={"/marketplace"} className="btn nav-link">
                            Marketplace
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                handleRedirectToTokenzie();
                                toggleDrawer();
                            }}
                            className="btn nav-link"
                        >
                            Tokenise Asset
                        </button>
                    )}
                </div>
            )}
        </Drawer>
    );
};

export default NavMenu;
