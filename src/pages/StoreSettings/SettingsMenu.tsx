import userIcon from "../../assets/svgs/userIcon.svg"
import advanceIcon from "../../assets/svgs/advanceIcon.svg"
import tagIcon from "../../assets/svgs/tagIcon.svg"
import bellIcon from "../../assets/svgs/bellIcon.svg"
import helpIcon from "../../assets/svgs/helpIcon.svg"

const SettingsMenu = ({
    handleSettingChange,
    currentSetting,
    storeName,
    storeImg,
}) => {
    return (
        <div className="settings-menu">
            <div className="store-info">
                <img src={storeImg} alt="" />
                <span>{storeName}</span>
            </div>
            <button
                onClick={()=>handleSettingChange('general')}
                className={`setting-btn ${
                    currentSetting === "general" && "active"
                }`}
            >
                <img src={userIcon} alt="" />
                <span>General</span>
            </button>
            <button
                onClick={()=>handleSettingChange('advanced')}
                className={`setting-btn ${
                    currentSetting === "advanced" && "active"
                }`}
            >
                <img src={advanceIcon} alt="" />
                <span>Advance</span>
            </button>
            <button
                onClick={()=>handleSettingChange('appearance')}
                className={`setting-btn ${
                    currentSetting === "appearance" && "active"
                }`}
            >
                <img src={bellIcon} alt="" />
                <span>Appearance</span>
            </button>
            {/* <button
                onClick={()=>handleSettingChange('team')}
                className={`setting-btn ${
                    currentSetting === "team" && "active"
                }`}
            >
                <img src={tagIcon} alt="" />
                <span>Team</span>
            </button> */}
            <button
                onClick={()=>handleSettingChange('support')}
                className={`setting-btn ${
                    currentSetting === "support" && "active"
                }`}
            >
                <img src={helpIcon} alt="" />
                <span>Support</span>
            </button>
        </div>
    )
}

export default SettingsMenu
