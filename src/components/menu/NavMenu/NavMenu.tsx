import Drawer from "@mui/material/Drawer";
import SearchBar from "../../SearchBar/SearchBar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./navmenu.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../utils/utils";
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
    chain
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
                    handleGlobalSearch={null}
                    search={search}
                    setSearch={setSearch}
                />
                <button onClick={toggleDrawer}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="nav-links main">
                <NestedMenu chain={chain}/>
                <Link
                    to={"/explore"}
                    className="nav-link"
                    onClick={toggleDrawer}
                >
                    Explore
                </Link>

                <Link
                    to={"/create-nft"}
                    className="nav-link main"
                    onClick={toggleDrawer}
                >
                    Tokenize Asset
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
                        onClick={toggleDrawer}
                        className="btn nav-link"
                    >
                        Go to My Store
                    </a>
                ) : (
                    <Link
                        to={"/create-store"}
                        className="btn nav-link"
                        onClick={toggleDrawer}
                    >
                        Create Store
                    </Link>
                )}

                {!getUserInfo() ? (
                    <button
                        onClick={() => setShowChains(!showChains)}
                        className="btn nav-link"
                    >
                        Select Chain
                    </button>
                ) : (
                    <Link to={"/marketplace"} className="btn nav-link">
                        Marketplace
                    </Link>
                )}
            </div>
        </Drawer>
    );
};

export default NavMenu;
