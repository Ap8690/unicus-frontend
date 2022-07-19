import { useState } from "react"
import AdvancedCustom from "./AdvancedCustom"
import AdvancedSupported from "./AdvancedSupported"

const AdvancedSettings = () => {
    const [currentFilter, setCurrentFilter] = useState("supportedNetworks")
    return (
        <div className="generalSettings advance">
            <h2>Advance Settings</h2>
            <div className="setting-box">
                <div className="filter">
                    <button
                        className={currentFilter === "supportedNetworks" && "active"}
                        onClick={() => setCurrentFilter("supportedNetworks")}
                    >
                        Supported Networks
                    </button>
                    <button
                        className={currentFilter === "custom" && "active"}
                        onClick={() => setCurrentFilter("custom")}
                    >
                        Custom Store Pages
                    </button>
                </div>
                {currentFilter === "supportedNetworks" && <AdvancedSupported />}
                {currentFilter === "custom" && <AdvancedCustom />}
            </div>
        </div>
    )
}

export default AdvancedSettings
