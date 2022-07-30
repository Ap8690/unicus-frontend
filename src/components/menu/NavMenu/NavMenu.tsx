import Drawer from "@mui/material/Drawer";
import SearchBar from "../../SearchBar/SearchBar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./navmenu.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavMenu = ({ open, setOpen, search, setSearch, store }) => {
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
        <SearchBar search={search} setSearch={setSearch} />
        <button onClick={toggleDrawer}>
          <CloseRoundedIcon />
        </button>
      </div>
      {location.pathname === "/home" || location.pathname === "/blog" ? (
        <div className="nav-links">
          <Link to={"/about"} className="nav-link main" onClick={toggleDrawer}>
            About
          </Link>
          <Link
            to={"/for-creator"}
            className="nav-link main"
            onClick={toggleDrawer}
          >
            For Creators
          </Link>
          <Link to={"/token"} className="nav-link main" onClick={toggleDrawer}>
            Token
          </Link>
          <Link to={"/blog"} className="nav-link main" onClick={toggleDrawer}>
            Blog
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
              className="btn nav-link"
              onClick={toggleDrawer}
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
          <Link
            to={"/launchpad"}
            className="btn nav-link"
            onClick={toggleDrawer}
          >
            Launchpad
          </Link>
          <Link
            to={"/marketplace"}
            className="btn nav-link"
            onClick={toggleDrawer}
          >
            Marketplace
          </Link>
        </div>
      ) : (
        <div className="nav-links main">
          <Link to={"/explore"} className="nav-link" onClick={toggleDrawer}>
            Explore
          </Link>

          <Accordion disableGutters className="menu-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expandIcon" />}
              aria-controls="Stats"
              className="summary main"
            >
              Stats
            </AccordionSummary>
            <AccordionDetails className="accordion-menu">
              <Link
                to={"/stats/ranking"}
                className="menu-link"
                onClick={toggleDrawer}
              >
                Ranking
              </Link>
              <Link
                to={"/stats/activity"}
                className="menu-link"
                onClick={toggleDrawer}
              >
                Activity
              </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters className="menu-accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="expandIcon" />}
              aria-controls="chains"
              className="summary main"
            >
              Chains
            </AccordionSummary>
            <AccordionDetails className="accordion-menu">
              <button
                className="menu-link"
                name="ethereum"
                onClick={handleChain}
              >
                Ethereum
              </button>
              <button
                className="menu-link"
                name="polygon"
                onClick={handleChain}
              >
                Polygon
              </button>
              <button
                className="menu-link"
                name="binance"
                onClick={handleChain}
              >
                Binance
              </button>
              <button className="menu-link" name="tron" onClick={handleChain}>
                Tron
              </button>
              <button className="menu-link" name="near" onClick={handleChain}>
                Near
              </button>
              <button className="menu-link" name="solana" onClick={handleChain}>
                Solona
              </button>
            </AccordionDetails>
          </Accordion>
          <Link
            to={"/create-nft"}
            className="nav-link main"
            onClick={toggleDrawer}
          >
            Create NFT
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

          <Link
            to={`/connect-wallet${location.pathname}`}
            className="btn nav-link"
            onClick={toggleDrawer}
          >
            {"Connect Wallet"}
          </Link>
        </div>
      )}
    </Drawer>
  );
};

export default NavMenu;
