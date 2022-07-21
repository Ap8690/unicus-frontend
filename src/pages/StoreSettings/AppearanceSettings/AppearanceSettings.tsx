import { useState } from "react"
import AppearanceHeader from "./AppearanceHeader"
import AppearanceOther from "./AppearanceOther"

const AppearanceSettings = () => {
    const [currentFilter, setCurrentFilter] = useState("header")
    return (
        <div className="generalSettings advance">
            <h2>Appearance</h2>
            <div className="setting-box">
                <div className="filter">
                    {/* <button
                        className={currentFilter === "header" && "active"}
                        onClick={() => setCurrentFilter("header")}
                    >
                        Header Sections
                    </button> */}
                    <button
                        className={currentFilter === "other" && "active"}
                        onClick={() => setCurrentFilter("other")}
                    >
                        Others
                    </button>
                </div>
                {currentFilter === "header" && <AppearanceHeader />}
                {currentFilter === "other" && <AppearanceOther />}
            </div>
        </div>
    )
}

export default AppearanceSettings
