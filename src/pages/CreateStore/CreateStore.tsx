// Types
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
// Styles
import "./CreateStore.scss";
// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";
// Images
import placeHolder from "../../assets/svgs/uploadImage.svg";
import toast from "react-hot-toast";

import { createStore, getAccessToken } from "../../services/api/supplier";
import countryList from "react-select-country-list";
import validator from "validator";
import { useNavigate, Navigate } from "react-router-dom";
import uuid from "react-uuid";
import { getUserInfo, userInfo } from "../../utils/utils";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FullBlurLoading from "../../components/Loading/FullBlurLoading";
import { Helmet } from "react-helmet";

const chains = [
    "Ethereum",
    "Binance",
    "Polygon",
    "Avalanche",
    "Tron",
    "Near",
    "Solana",
];

const CreateStoreForm = ({ loading, setLoading }): ReactJSXElement => {
    let navigate = useNavigate();
    //@ts-ignore
    const [generals, setGeneral] = useState<IGeneral>({
        storeName: "",
        email: "",
        logoUrl: "",
    });
    const [country, setCountry] = useState({ country: "US" });
    const [chainName, setChainName] = useState("Ethereum");
    const [open, setOpen] = useState(false);
    const options = useMemo(() => countryList().getData(), []);
    const inputFile = useRef(null);
    const uploadImage = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    useEffect(() => {
        if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
            setOpen(true);
            return;
        }
        let email = "";
        if (userInfo.email) {
            email = userInfo.email;
        }

        setGeneral({
            ...generals,
            storeName: "",
            email: email,
            logoUrl: "",
        });
    }, [userInfo]);

    const getImageUrl = (e: any) => {
        setGeneral({
            ...generals,
            country: country,
            logoUrl: e.target.files[0],
        });
    };
    const handleStoreName = (e: any) => {
        setGeneral({ ...generals, storeName: e });
    };

    const handleEmail = (e: any) => {
        setGeneral({ ...generals, email: e });
    };
    const handleCountry = (e: any) => {
        setCountry({ country: e });
    };
    const handleCreateStore = async (e: any) => {
        e.preventDefault();
        try {
            if(!generals.logoUrl) {
                return toast.error("Logo is required!")
            }
            setLoading(true);
            if (!generals.email && !generals.storeName) {
                throw new Error("Please fill all fields.");
            }
            if (!validator.isEmail(generals.email)) {
                throw new Error("Invalid Email");
            }

            const storeFormData = new FormData();
            storeFormData.append("chainName", chainName);
            storeFormData.append("country", JSON.stringify(generals.country));
            storeFormData.append("email", generals.email);
            storeFormData.append("logoUrl", generals.logoUrl);
            storeFormData.append("storeName", generals.storeName);

            let res = await createStore(storeFormData);

            if (res) {
                const redirectUrl = `http://${res.data.createStore.domain[0]}`;
                toast.success("Store Created");
                setTimeout(function () {
                    toast("Redirecting to your store");
                    setLoading(false);
                    window.open(redirectUrl, "_blank");
                    navigate("/marketplace");
                }, 1000);
            } else {
                throw new Error("Store creation failed!");
            }
        } catch (err) {
            //console.log("err", err.response.data.err)
            setLoading(false);
            if (err.response) {
                if (err.response.status === 401) {
                    return toast.error("Login expired. Please Login again.");
                }
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.msg
                ) {
                    return toast.error(err.response.data.msg);
                }
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.err
                ) {
                    return toast.error(err.response.data.err);
                }
            }
            toast.error("Bad request...");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!getAccessToken()) {
            navigate("/explore");
        }
    }, []);
    return (
        <>
            <div className="create-store-form-holder">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>UnicusOne - Get your store online</title>
                    <link rel="canonical" href={window.location.href} />
                </Helmet>
                <div className="w-full gap-4 flex flex-col">
                    <h3 className="form-heading">Upload File</h3>
                    <div className="create-store-image-holder">
                        <button
                            className="upload-image-button"
                            onClick={uploadImage}
                        >
                            {generals && !generals?.logoUrl ? (
                                <img src={placeHolder} alt="Upload Image" />
                            ) : (
                                <img
                                    src={URL.createObjectURL(generals?.logoUrl)}
                                    alt=""
                                />
                            )}

                            <input
                                type="file"
                                id="file"
                                ref={inputFile}
                                accept="image/jpeg, image/png , image/svg+xml"
                                onChange={getImageUrl}
                                className="d-none"
                                required
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
                            required
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
                            required
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
                                {chains.map((curr: any) => (
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
    );
};
const CreateStore = ({ userStore }: any): ReactJSXElement => {
    //console.log("userStore: ", userStore);
    const [loadingImage, setLoadingImage] = useState(false);
    if (
        !getAccessToken() ||
        (userStore &&
            Object.keys(userStore).length === 0 &&
            userStore?.domain &&
            userStore?.domain[0])
    ) {
        //console.log("NAVIGATE")
        return <Navigate to="/explore" />;
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
    );
};

export default CreateStore;
