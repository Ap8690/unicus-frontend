import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./filtermenu.scss";
import SearchBar from "../../SearchBar/SearchBar";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function valuetext(value: number) {
  return `${value}°C`;
}

const FilterMenu = ({
  open,
  setOpen,
  activeFilters,
  setActiveFilters,
  search,
  setSearch,
  collections,
  filter,
  price,
  priceRange,
  handlePriceRange,
  currency,
  setCurrency,
}: {
  open: boolean;
  setOpen: any;
  activeFilters: String[];
  setActiveFilters: any;
  search: string;
  setSearch: any;
  collections: any;
  filter: any;
  price?: boolean;
  priceRange?: number[];
  handlePriceRange?: any;
  currency?: string;
  setCurrency?: any;
}) => {
  const toggleDrawer = () => {
    setOpen(false);
  };
  const handleActiveFilters = (event: String) => {
    if (activeFilters.includes(event)) {
      const eventIndex = activeFilters.indexOf(event);
      const tempArr = activeFilters;
      tempArr.splice(eventIndex, 1);
      setActiveFilters([...tempArr]);
    } else {
      setActiveFilters([...activeFilters, event]);
    }
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        className: "menuPaperComponent filterMenuComponent",
      }}
    >
      <div className="header">
        <div className="filter-icon">Filters</div>
        <button onClick={toggleDrawer}>
          <CloseRoundedIcon />
        </button>
      </div>
      {price && (
        <Accordion disableGutters className="menu-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="expandIcon" />}
            aria-controls="Stats"
            className="summary main"
          >
            Price
          </AccordionSummary>
          <AccordionDetails className="accordion-menu">
            <Select
              value={currency}
              onChange={(e: SelectChangeEvent) => setCurrency(e.target.value)}
            >
              <MenuItem value={"usd"}>$ USD</MenuItem>
              <MenuItem value={"euro"}>€ Euro</MenuItem>
              <MenuItem value={"rupee"}>₹ Rupee</MenuItem>
            </Select>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={priceRange}
              onChange={handlePriceRange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion disableGutters className="menu-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="expandIcon" />}
          aria-controls="Stats"
          className="summary main"
        >
          {filter.name}
        </AccordionSummary>
        <AccordionDetails className="accordion-menu">
          {filter.filters.map((event:any,i:number) => (
            <FormControlLabel
            key={`FORM ${i}`}
              control={
                <Checkbox
                  checked={activeFilters.includes(event)}
                  onChange={() => handleActiveFilters(event)}
                />
              }
              label={event}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters className="menu-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="expandIcon" />}
          aria-controls="Stats"
          className="summary main"
        >
          Collections
        </AccordionSummary>
        <AccordionDetails className="accordion-menu">
          <SearchBar handleGlobalSearch={null} search={search} setSearch={setSearch} />
          {collections.map((collection:any,i:number) => (
            <FormControlLabel
              key={`Collections ${i}`}
              control={<Checkbox />}
              label={
                <div className="collection">
                  <img src={collection.image} alt="" />
                  <span>{collection.name}</span>
                </div>
              }
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default FilterMenu;
