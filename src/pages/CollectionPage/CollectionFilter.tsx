import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Checkbox from "@mui/material/Checkbox"
import Input from "../../components/Input/Input"

const CollectionFilter = ({ status, setStatus, priceRange, setPriceRange }) => {
    const handlePriceChange = (e) => {
        const { name, value } = e.target
        console.log({
            name,
            value,
        })
        setPriceRange({
            ...priceRange,
            [name]: value,
        })
    }
    return (
        <div className="collection-side-filter">
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Status
                </AccordionSummary>
                <AccordionDetails className="flex flex-col">
                    <button
                        className="flex justify-start items-center"
                        onChange={() =>
                            setStatus({
                                ...status,
                                onSale: !status.onSale,
                            })
                        }
                    >
                        <Checkbox checked={status.onSale} /> On Sale
                    </button>
                    <button className="flex justify-start items-center">
                        <Checkbox
                            checked={status.onAuction}
                            onChange={() =>
                                setStatus({
                                    ...status,
                                    onAuction: !status.onAuction,
                                })
                            }
                        />{" "}
                        On Auction
                    </button>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Price
                </AccordionSummary>
                <AccordionDetails className="flex items-center gap-2">
                    <div>USD</div>
                    <input
                        type="number"
                        value={priceRange.min}
                        onChange={handlePriceChange}
                        name="min"
                        placeholder="MIN"
                        min={0}
                        className="filter-price-input"
                    />
                    <div>to</div>
                    <input
                        type="number"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                        name="max"
                        placeholder="MAX"
                        min={priceRange.min}
                        className="filter-price-input"
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CollectionFilter
