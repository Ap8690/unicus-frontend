import { useState } from "react"
import SettingsMenu from "./SettingsMenu"
import "./storesettings.scss"
import emptyImg from "../../assets/svgs/emptyImg.svg"
import GeneralSettings from "./GeneralSettings/GeneralSettings"
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings"
import AppearanceSettings from "./AppearanceSettings/AppearanceSettings"

const StoreSettings = () => {
    const [currentSetting, setCurrentSetting] = useState("general")
    const handleSettingChange = (newSetting: any) => {
        setCurrentSetting(newSetting)
    }
    return (
        <div className="store-settings-page">
            <div className="store-settings">
                <h1 className="blue-head">My Store</h1>
                <div className="settings">
                    <SettingsMenu
                        currentSetting={currentSetting}
                        handleSettingChange={handleSettingChange}
                        storeName={"Store Name"}
                        storeImg={emptyImg}
                    />
                    {currentSetting === "general" && <GeneralSettings />}
                    {currentSetting === "advanced" && <AdvancedSettings />}
                    {currentSetting === "appearance" && <AppearanceSettings />}
                </div>
            </div>
        </div>
    )
}

export default StoreSettings
