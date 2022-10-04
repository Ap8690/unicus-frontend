// Types
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react"
// Styles
import "./CreateStore.scss"
// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground"
// Images
import placeHolder from "../../assets/svgs/uploadImage.svg"
import toast from 'react-hot-toast';

import { createStore, getAccessToken } from "../../services/api/supplier"
import countryList from "react-select-country-list"
import validator from "validator"
import { useNavigate, Navigate } from "react-router-dom"
import uuid from "react-uuid"
import { getUserInfo, userInfo } from "../../utils/utils"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import FullBlurLoading from "../../components/Loading/FullBlurLoading"

const chains =['Ethereum', 'Binance', 'Polygon', 'Avalanche', 'Tron', 'Near', 'Solana']

const CreateStoreForm = ({ loading, setLoading }): ReactJSXElement => {
    let navigate = useNavigate()
    //@ts-ignore
    const [generals, setGeneral] = useState<IGeneral>({})
    const [country, setCountry] = useState({country: "US"})
    const [chainName, setChainName] = useState('Ethereum')
    const [open, setOpen] = useState(false)
    const options = useMemo(() => countryList().getData(), [])
    const inputFile = useRef(null)
    const uploadImage = () => {
        // `current` points to the mounted file input element
        inputFile.current.click()
    }
    useEffect(() => {
        if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
            setOpen(true)
            return
        }
        let email = ""
        if (userInfo.email) {
            email = userInfo.email
        }

        setGeneral({
            ...generals,
            storeName: "",
            email: email,
            logoUrl: "",
        })
    }, [userInfo])

    const getImageUrl = async (e: any) => {
        //uploading to cloudinary
        try {
            setLoading(true)
            let cloudinaryFormData = new FormData()
            cloudinaryFormData.append("file", e.target.files[0])
            cloudinaryFormData.append("upload_preset", `Unicus___User`)
            cloudinaryFormData.append("public_id", uuid())

            const cloudinaryRes = await fetch(
                "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
                {
                    method: "POST",
                    body: cloudinaryFormData,
                }
            )
            const JSONdata = await cloudinaryRes.json()
            setGeneral({ ...generals,country: country, logoUrl: JSONdata.url })
            setLoading(false)
        } catch (err) {
            console.log("Cloudinary User Image Upload Error ->", err)
            setLoading(false)
            toast.error("Image upload error!")
        }
        
    }
    const handleStoreName = (e: any) => {
        setGeneral({ ...generals, storeName: e })
    }

    const handleEmail = (e: any) => {
        setGeneral({ ...generals, email: e })
    }
    const handleCountry = (e: any) => {
        setCountry({ country: e })
    }
    const handleCreateStore = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!generals.email && !generals.storeName) {
                throw new Error("Please fill all fields.")
            }
            if (!validator.isEmail(generals.email)) {
                throw new Error("Invalid Email")
            }
            const obj = {
                ...generals,
                chainName
            }
            let res = await createStore(obj)
            
            if (res) {
                const redirectUrl = `http://${res.data.createStore.domain[0]}`
                toast.success("Store Created")
                setTimeout(function () {
                    toast("Redirecting to your store")
                    setLoading(false)
                    window.open(redirectUrl,'_blank')
                    navigate("/home")
                }, 1000)
            } else {
                throw new Error("Store creation failed!")
                
            }
        } catch (err) {
            console.log("err", err.response.data.err)
            setLoading(false)
            if (err.response) {
                if (err.response.status === 401) {
                    return toast.error("Login expired. Please Login again.")
                }
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.msg
                ) {
                    return toast.error(err.response.data.msg)
                }
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.err
                ) {
                    return toast.error(err.response.data.err)
                }
            }
            toast.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/explore")
        }

    }, [])
    return (
        <>
            <div className="create-store-form-holder">
                <div className="w-full gap-4 flex flex-col">
                    <h3 className="form-heading">Upload File</h3>
                    <div className="create-store-image-holder">
                        <button
                            className="upload-image-button"
                            onClick={uploadImage}
                        >
                            {generals.logoUrl === "" && (
                                <img src={placeHolder} alt="Upload Image" />
                            )}
                            {generals.logoUrl !== "" && (
                                <img
                                    src={generals.logoUrl}
                                    alt=""
                                    style={{ width: "90%" }}
                                />
                            )}
                            <input
                                type="file"
                                id="file"
                                ref={inputFile}
                                accept="image/jpeg, image/png , image/svg+xml"
                                onChange={(e) => getImageUrl(e)}
                                className="d-none"
                            />
                        </button>
                    </div>
                    <p className="upload-instructions">
                        Please upload a jpeg, png or svg file for your logo in
                        400x300 pixel size or similar ratio{" "}
                    </p>
                </div>

                <form
                    action=""
                    className="create-store-form w-full"
                    onSubmit={(e) => handleCreateStore(e)}
                >
                    <div className="form-input">
                        <label htmlFor="store-name">Store Name</label>
                        <input
                            type="text"
                            id="store-name"
                            value={generals.storeName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleStoreName(e.target.value)}
                            placeholder="Enter Store Name"
                            maxLength={25}
                        />
                        <div className="store-name-length">
                            {generals.storeName
                                ? generals.storeName.length
                                : "0"}
                            /25
                        </div>
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={generals.email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="country">Select Chain</label>
                        <FormControl
                            variant="standard"
                            sx={{ m: 0, minWidth: 120, width: "100%" }}
                        >
                            <Select
                                labelId="chain-select-label"
                                id="chain-select"
                                value={chainName}
                                onChange={(e) => setChainName(e.target.value)}
                            >
                                {chains.map((curr:any) => (
                                    <MenuItem key={uuid()} value={curr}>
                                        {curr}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-input">
                        <label htmlFor="country">Country</label>
                        <FormControl
                            variant="standard"
                            sx={{ m: 0, minWidth: 120, width: "100%" }}
                        >
                            <Select
                                labelId="chain-select-label"
                                id="chain-select"
                                value={country.country}
                                onChange={(e) => handleCountry(e.target.value)}
                            >
                                {options.map((item) => (
                                    <MenuItem key={uuid()} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <button className="btn mt-4" type="submit">
                        Create Store
                    </button>
                </form>
            </div>
        </>
    )
}
const CreateStore = ({userStore}: any): ReactJSXElement => {
    console.log("userStore: ", userStore);
    const [loadingImage, setLoadingImage] = useState(false)
    if(!getAccessToken() || (userStore && Object.keys(userStore).length === 0 && userStore?.domain && userStore?.domain[0])) {
        console.log("NAVIGATE")
        return <Navigate to="/explore" />
    }
    return (
        <>
            {loadingImage ? (
                <FullBlurLoading />
            ) : (
                <div className="create-store">
                    <BlueBackground />
                    <h2 className="heading">Create Store</h2>
                    <p className="intro">
                        Launch your own white-label NFT store or NFT Marketplace
                        without any technical knowledge.
                    </p>
                    <CreateStoreForm
                        loading={loadingImage}
                        setLoading={setLoadingImage}
                    />
                </div>
            )}
        </>
    )
}

export default CreateStore
