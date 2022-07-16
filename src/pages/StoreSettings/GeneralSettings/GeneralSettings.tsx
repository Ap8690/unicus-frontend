import { useState } from "react"
import GeneralBasic from "./GeneralBasic"
import GeneralContact from "./GeneralContact"
import GeneralNameAndLogo from "./GeneralNameAndLogo"
import GeneralSocial from "./GeneralSocial"

const GeneralSettings = () => {
    const [currentFilter, setCurrentFilter] = useState("nameLogo")
    return (
        <div className="generalSettings">
            <h2>General Settings</h2>
            <div className="setting-box">
                <div className="filter">
                    <button
                        className={currentFilter === "nameLogo" && "active"}
                        onClick={() => setCurrentFilter("nameLogo")}
                    >
                        Name & Logo
                    </button>
                    <button
                        className={currentFilter === "basic" && "active"}
                        onClick={() => setCurrentFilter("basic")}
                    >
                        Basic Settings
                    </button>
                    <button
                        className={currentFilter === "contactUs" && "active"}
                        onClick={() => setCurrentFilter("contactUs")}
                    >
                        Contact Us
                    </button>
                    <button
                        className={currentFilter === "social" && "active"}
                        onClick={() => setCurrentFilter("social")}
                    >
                        Social Links
                    </button>
                </div>
                {currentFilter === "nameLogo" && <GeneralNameAndLogo />}
                {currentFilter === "basic" && <GeneralBasic />}
                {currentFilter === "contactUs" && <GeneralContact />}
                {currentFilter === "social" && <GeneralSocial />}
            </div>
        </div>
    )
}

export default GeneralSettings
