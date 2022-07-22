// Lib
import { useState } from "react"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Slider from "@mui/material/Slider"

// Images
import chevronDown from "../../assets/svgs/chevronDown.svg"

// SASS
import "./dropdownprice.scss"

function valuetext(value: number) {
    return `${value}°C`
}

const DropDownPrice = ({
    priceRange,
    handlePriceRange,
    currency,
    setCurrency,
}) => {
    const [ifOpen, setIfOpen] = useState(true)

    return (
        <div className="drop-down-price">
            <h2 className="drop-down-price-heading">
                <div className="text">Price</div>
                <button onClick={() => setIfOpen(!ifOpen)}>
                    <img src={chevronDown} alt="Expand List" />
                </button>
            </h2>
            <div
                className="drop-down-price-holder"
                style={
                    !ifOpen
                        ? {
                              height: 0,
                          }
                        : null
                }
            >
                <Select
                    value={currency}
                    onChange={(e: SelectChangeEvent) =>
                        setCurrency(e.target.value)
                    }
                >
                    <MenuItem value={"usd"}>United States Dollar</MenuItem>
                    <MenuItem value={"pound"}>British Pound</MenuItem>
                    <MenuItem value={"rupee"}>Indian Rupee</MenuItem>
                </Select>
                <div className="slider-box">
                    <Slider
                        getAriaLabel={() => "Minimum distance"}
                        value={priceRange}
                        onChange={handlePriceRange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        className="slider"
                    />
                </div>
            </div>
        </div>
    )
}

export default DropDownPrice
