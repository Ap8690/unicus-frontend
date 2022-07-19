import { useState } from "react"
import { IOSSwitch } from "../GeneralSettings/GeneralBasic"
import uploadImg from "../../../assets/svgs/uploadImage.svg"

const AppearanceOther = () => {
    const [footer, setFooter] = useState(true)
    const [storeLoader, setStoreLoader] = useState()
    const handleStoreLoader = (e) => {
        setStoreLoader(e.target.value)
    }
    return (
        <div className="advanced-supported">
            <div className="switch-box">
                <IOSSwitch
                    defaultChecked
                    checked={footer}
                    onChange={(e: any) => setFooter(e.target.checked)}
                />
                <div className="terms">
                    <span className="large-text">Footer Section</span>
                    <span>Turn this ON/off to show Footer section</span>
                </div>
            </div>
            <div className="file-upload-container">
                <div className="title">Store Loader</div>
                <label className="file-upload-box">
                    <img src={uploadImg} alt="" />
                    <input type="file" value={storeLoader} onChange={handleStoreLoader} />
                </label>
            </div>
            <button className="btn">Save Changes</button>
        </div>
    )
}

export default AppearanceOther
