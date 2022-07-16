import { useState } from "react"
import Input from "../../../components/Input/Input"
import uploadImg from "../../../assets/svgs/uploadImage.svg"

const GeneralNameAndLogo = () => {
    const [storeName, setStoreName] = useState("")
    const [storeEmail, setStoreEmail] = useState("")
    const [storeCountry, setStoreCountry] = useState("")
    const [logo, setLogo] = useState()

    const handleLogo = (e) => {
        setLogo(e.target.value)
    }

    return (
        <div className="general-name-logo">
            <div>
                <Input
                    title="Store Name"
                    placeholder="Enter Store Name"
                    state={storeName}
                    setState={setStoreName}
                />
                <Input
                    title="Email"
                    placeholder="Enter Email"
                    state={storeEmail}
                    setState={setStoreEmail}
                />
                <Input
                    title="Country"
                    placeholder="Enter Country"
                    state={storeCountry}
                    setState={setStoreCountry}
                />
                <button className="btn">Save Changes</button>
            </div>
            <div>
                <div className="title">Logo</div>
                <label className="file-upload-box">
                    <img src={uploadImg} alt="" />
                    <input type="file" value={logo} onChange={handleLogo} />
                </label>
                <div className="file-size-info">
                    Please upload a jpeg, png or svg file for your logo in
                    400x300 pixel size or similar ratio
                </div>
            </div>
        </div>
    )
}

export default GeneralNameAndLogo
