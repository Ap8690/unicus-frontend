import userImg from "../../assets/images/userImage.png"
import {
    updateProfileBg,
    updateProfilePic,
} from "../../services/api/supplier";
import uuid from "react-uuid";
import twitterImg from "../../assets/svgs/profileTwitter.svg"
import instagramImg from "../../assets/svgs/profileInstagram.svg"
import facebookImg from "../../assets/svgs/profileFacebook.svg"
import discord from "../../assets/images/discord.svg"
import linkedin from "../../assets/images/linkedin.png"
import { useEffect, useRef, useState } from "react"
// import Input from "../../components/Input/Input"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import WalletAdd from "../../components/Wallet/WalletAdd"
import axios from "axios"
import "./editprofile.scss"
import Loader from "../../components/Loading/Loader"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../config"
import {
    changePasswordApi,
    updateProfileSocial,
    updateProfile,
    getAccessToken,
} from "../../services/api/supplier"
import Input from "../../components/Input/Input"
import Cookies from "js-cookie"
import { cookieDomain } from "../../config"
import validator from "validator"

const EditProfile = (props: any) => {
    const [active, setActive] = useState("general")
    const [anchorEl, setAnchorEl] = useState(null)
    const [user, setUser] = useState<any>()
    const open = Boolean(anchorEl)
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    let navigate = useNavigate()
    const accessToken = getAccessToken()
    const getUserProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/users/getUserProfile`, {
                headers: {
                    Authorization: "Bearer " + `${accessToken}`,
                },
            })
            setUser(res.data.user)
        } catch (err) {
            console.log(err)
        }
    }
    const handleCancel = () => {
        navigate("/profile")
    }
    useEffect(() => {
        getUserProfile()
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="md:mt-[70px] px-8 pb-12 screen7:pt-0 screen18:px-12 screen3:px-8 w-full">
            <div className="w-full pt-12">
                <div className="editPage-info flex gap-8 screen11:flex-col">
                    <div className="relative felx items-center screen11:flex-col screen11:ml-0 min-w-[200px] editPage-main-image">
                        <div className="w-32 h-32 relative rounded-full overflow-hidden">
                            <img
                                src={
                                    user && user.profileUrl
                                        ? user.profileUrl
                                        : userImg
                                }
                                alt="user"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full screen11:flex-col screen11:justify-center screen11:items-center editPage-main-info-box">
                        <div className="flex flex-col items-start gap-2 relative mt-4 editPage-main-info">
                            <span className="text-lg w-full screen11:text-center font-semibold">
                                {user
                                    ? user?.username
                                        ? user.username
                                        : user?.email || ""
                                    : "Loading..."}
                            </span>
                            <span className="text-DarkColor w-full screen11:text-center wallet-address-edit-page">
                                {user && user.wallets.length > 0
                                    ? user.wallets[0]
                                    : "No wallet added"}{" "}
                            </span>
                            <div className="mt-2 flex gap-4 items-center">
                                <img
                                    src={twitterImg}
                                    alt="socials"
                                    className="h-6 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                    onClick={() => setActive("social")}
                                />
                                <img
                                    src={instagramImg}
                                    alt="socials"
                                    className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                    onClick={() => setActive("social")}
                                />
                                <img
                                    src={facebookImg}
                                    alt="socials"
                                    className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                    onClick={() => setActive("social")}
                                />

                                <img
                                    src={discord}
                                    alt="socials"
                                    className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                    onClick={() => setActive("social")}
                                />
                                <img
                                    src={linkedin}
                                    alt="socials"
                                    className="h-6 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                    onClick={() => setActive("social")}
                                />
                            </div>
                        </div>
                        <div className="my-4 screen11:mr-0 d-none">
                            <button
                                onClick={handleClick}
                                className="bg-GreyButton p-2 text-lg font-semibold rounded-md d-none"
                            >
                                <span className="capitalizeFirst">{active}</span> ...
                            </button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <span
                                        onClick={() => setActive("general")}
                                        className={`font-semibold cursor-pointer ${
                                            active === "general"
                                                ? "text-[#7460ed] underline"
                                                : "text-DarkColor"
                                        }`}
                                    >
                                        General
                                    </span>
                                </MenuItem>
                                {user?.email && (
                                    <MenuItem onClick={handleClose}>
                                        <span
                                            onClick={() =>
                                                setActive("password")
                                            }
                                            className={`font-semibold cursor-pointer ${
                                                active === "password"
                                                    ? "text-[#7460ed] underline"
                                                    : "text-DarkColor"
                                            }`}
                                        >
                                            Password
                                        </span>
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleClose}>
                                    <span
                                        onClick={() => setActive("social")}
                                        className={`font-semibold cursor-pointer ${
                                            active === "social"
                                                ? "text-[#7460ed] underline"
                                                : "text-DarkColor"
                                        }`}
                                    >
                                        Add Social Links
                                    </span>
                                </MenuItem>
                                {/* <MenuItem onClick={handleClose}>
                                    <span
                                        onClick={() =>
                                            setActive("walletAddress")
                                        }
                                        className={`font-semibold cursor-pointer ${
                                            active === "walletAddress"
                                                ? "text-[#7460ed] underline"
                                                : "text-DarkColor"
                                        }`}
                                    >
                                        Wallet Address
                                    </span>
                                </MenuItem> */}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 mt-8">
                <div className="flex flex-col gap-6 text-lg screen7:hidden min-w-[200px] settings-sidebar">
                    <span
                        onClick={() => setActive("general")}
                        className={`font-semibold cursor-pointer ${
                            active === "general"
                                ? "text-[#7460ed] underline"
                                : "text-DarkColor"
                        }`}
                    >
                        General
                    </span>
                    {user?.email && (
                        <span
                            onClick={() => setActive("password")}
                            className={`font-semibold cursor-pointer ${
                                active === "password"
                                    ? "text-[#7460ed] underline"
                                    : "text-DarkColor"
                            }`}
                        >
                            Password
                        </span>
                    )}
                    <span
                        onClick={() => setActive("social")}
                        className={`font-semibold cursor-pointer ${
                            active === "social"
                                ? "text-[#7460ed] underline"
                                : "text-DarkColor"
                        }`}
                    >
                        Add Social Links
                    </span>
                    {/* <span
                        onClick={() => setActive("walletAddress")}
                        className={`font-semibold cursor-pointer ${
                            active === "walletAddress"
                                ? "text-[#7460ed] underline"
                                : "text-DarkColor"
                        }`}
                    >
                        WalletAddress
                    </span> */}
                </div>
                <div className="w-full">
                    {active === "general" && <GeneralSettings resUser={user} />}
                    {active === "password" && (
                        <ChangePassword handleCancel={handleCancel} />
                    )}
                    {active === "social" && (
                        <AddSocials
                            handleCancel={handleCancel}
                            resUser={user}
                        />
                    )}
                    {active === "walletAddress" && <WalletAdd />}
                </div>
            </div>
        </div>
    )
}

const GeneralSettings = ({ resUser }) => {
    const [username, setUserName] = useState<string>()
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [profileImg, setProfileImg] = useState()
    const [bannerImg, setBannerImg] = useState()
    let navigate = useNavigate()
    const getUserProfile = async () => {
        setUserName(resUser?.username)
        setEmail(resUser?.email)
        setBio(resUser?.bio)
    }
    const profilePicFile = useRef(null);
    const bannerPicFile = useRef(null);

    const uploadImage = (inputFile: any) => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const uploadUserImage = async (e: any) => {
        try {
            setLoading(true);
            let cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", e.target.files[0]);
            cloudinaryFormData.append("upload_preset", `Unicus___User`);
            cloudinaryFormData.append("public_id", uuid());
            const cloudinaryRes = await fetch(
                "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
                {
                    method: "POST",
                    body: cloudinaryFormData,
                }
            );
            const JSONdata = await cloudinaryRes.json();
            setProfileImg(JSONdata.url);
            // now sendig cloudinary url to backend server
            const res = await updateProfilePic(JSONdata.url);

            if (res && res.data && res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    domain: cookieDomain,
                    expires: 30,
                });
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            toast.error(err?.response.data || "Image upload error");
            console.log("Cloudinary User Image Upload Error ->", err);
        }
    };

    // PORTFOLIO TO HEADER IMAGE
    const uploadBackgroundImage = async (e: any) => {
        try {
            setLoading(true);
            //set loading true
            let cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", e.target.files[0]);
            cloudinaryFormData.append("upload_preset", `Unicus___User`);
            cloudinaryFormData.append("public_id", uuid());

            const cloudinaryRes = await fetch(
                "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
                {
                    method: "POST",
                    body: cloudinaryFormData,
                }
            );
            const JSONdata = await cloudinaryRes.json();

            setBannerImg(JSONdata.url);
            // sending to backend
            const res = await updateProfileBg(JSONdata.url);
            if (res && res.data && res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    domain: cookieDomain,
                    expires: 30,
                });
            }
            setLoading(false);
        } catch (err) {
            console.log("Cloudinary User Image Upload Error ->", err);
            setLoading(false);
            toast.error(err?.response.data || "Image upload error");
        }
    };
    const updateUserProfile = async () => {
        try {
            if (!(username?.length > 0) && !(bio?.length > 0))
                return toast.error("Please enter either username or bio")

            setLoading(true)
            const res = await updateProfile(username, bio)
            toast.success("Profile updated Successfully", {
                position: "bottom-center",
            })
            navigate('/profile')
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error(err)
        }
    }
    useEffect(() => {
        getUserProfile()
    }, [resUser])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex gap-8 edit-userInfo">
                <div className="flex flex-col gap-4 w-[300px] min-w-[300px] edit-details">
                    <Input
                        title="Username"
                        placeholder="Enter your name"
                        state={username}
                        setState={setUserName}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <Input
                        title="Bio"
                        placeholder="Enter your Bio"
                        multi
                        state={bio}
                        setState={setBio}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />

                    <div className="flex justify-between">
                        <button
                            onClick={() => navigate("/profile")}
                            className="btn"
                        >
                            Cancel
                        </button>
                        <button className="btn" onClick={updateUserProfile}>
                            Save Changes
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <div>Profile Image</div>
                        <div className="flex gap-4 items-center mt-2">
                            <div className="w-[120px] h-[120px] rounded-lg bg-[#ffffff22]">
                                {profileImg && <img src={profileImg} alt='' className="w-full h-full object-cover"/>}
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <button 
                                    className="btn"
                                    onClick={() => uploadImage(profilePicFile)}
                                >
                                    Upload New
                                </button>
                                <button className="btn">Delete</button>
                            </div>
                            <input
                                type="file"
                                id="file"
                                ref={profilePicFile}
                                accept="image/jpeg, image/png , image/svg+xml"
                                onChange={(e) => uploadUserImage(e)}
                                className="d-none"
                            />
                        </div>
                    </div>
                    <div>
                        <div>Banner Image</div>
                        <div className="flex gap-4 items-center mt-2">
                            <div className="w-[190px] h-[120px] rounded-lg bg-[#ffffff22]">
                                {bannerImg && <img src={bannerImg} alt='' className="w-full h-full object-cover"/>}
                            </div>
                            <div className="flex flex-col gap-3 ">
                                <button 
                                    className="btn" 
                                    onClick={() => uploadImage(bannerPicFile)}
                                >
                                    Upload New
                                </button>
                                <button className="btn">Delete</button>
                            </div>
                            <input
                                type="file"
                                id="file"
                                ref={bannerPicFile}
                                accept="image/jpeg, image/png , image/svg+xml"
                                onChange={(e) => uploadBackgroundImage(e)}
                                className="d-none"
                            />
                        </div>
                    </div>
                    
                </div>
                </div>
            )}
        </>
    )
}

const ChangePassword = ({ handleCancel }) => {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const changePass = async () => {
        try {
            const res = await changePasswordApi(oldPass, newPass)
            toast.success("Password changed Successfully", {
                position: "bottom-center",
            })
        } catch (err) {
            console.log(err)
            toast.error(err)
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <Input
                title="Current Password"
                placeholder="Enter current password"
                state={oldPass}
                setState={setOldPass}
                multi={undefined}
                date={undefined}
                time={undefined}
                password={undefined}
                required={undefined}
                disabled={undefined}
            />
            <Input
                title="New Password"
                placeholder="Enter new password"
                state={newPass}
                setState={setNewPass}
                multi={undefined}
                date={undefined}
                time={undefined}
                password={undefined}
                required={undefined}
                disabled={undefined}
            />
            <Input
                title="Confirm Password"
                placeholder="Confirm new password"
                state={confirmPass}
                setState={setConfirmPass}
                multi={undefined}
                date={undefined}
                time={undefined}
                password={undefined}
                required={undefined}
                disabled={undefined}
            />
            <div className="flex justify-between">
                <button className="btn" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="btn" onClick={changePass}>
                    Save Changes
                </button>
            </div>
        </div>
    )
}

const AddSocials = ({ resUser, handleCancel }) => {
    const [twitter, setTwitter] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [discord, setDiscord] = useState("")
    const [linkedIn, setLinkedIn] = useState("")
    const [loading, setLoading] = useState(false)
    const getUserProfile = async () => {
        setTwitter(resUser?.twitter)
        setFacebook(resUser?.facebook)
        setInstagram(resUser?.instagram)
        setDiscord(resUser?.discord)
        setLinkedIn(resUser?.linkedIn)
    }
    const updateProfile = async () => {
        try {
            if (
                twitter &&
                twitter.length > 0 &&
                !validator.isURL(twitter) &&
                !twitter.includes("twitter")
            ) {
                return toast.error("Please enter a valid url link to twitter")
            }
            if (
                facebook &&
                facebook.length > 0 &&
                !validator.isURL(facebook) &&
                !facebook.includes("facebook")
            ) {
                return toast.error("Please enter a valid url link to facebook")
            }
            if (
                instagram &&
                instagram.length > 0 &&
                !validator.isURL(instagram) &&
                !instagram.includes("instagram")
            ) {
                return toast.error(
                    "Please enter a valid url link to instagram"
                )
            }
            if (
                discord &&
                discord.length > 0 &&
                !validator.isURL(discord) &&
                !discord.includes("discord")
            ) {
                return toast.error("Please enter a valid url link to discord")
            }
            if (
                linkedIn &&
                linkedIn.length > 0 &&
                !validator.isURL(linkedIn) &&
                !linkedIn.includes("linkedIn")
            ) {
                return toast.error("Please enter a valid url link to linkedIn")
            }
            setLoading(true)
            const res = await updateProfileSocial(
                instagram,
                facebook,
                twitter,
                discord,
                linkedIn
            )

            if (res.data && res.data?.msg) {
                localStorage.setItem("userInfo", JSON.stringify(res.data?.msg))
                Cookies.set("userInfo", JSON.stringify(res.data?.msg), {
                    domain: cookieDomain,
                    expires: 30,
                })
            }
            toast.success("Socials Updated Successfully", {
                position: "bottom-center",
            })
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(err)
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [resUser])
    useEffect(() => {
        getUserProfile()
    }, [])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col gap-4">
                    <Input
                        title="Add Twitter"
                        placeholder="Enter Twitter link"
                        state={twitter}
                        setState={setTwitter}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <Input
                        title="Add Facebook"
                        placeholder="Enter facebook link"
                        state={facebook}
                        setState={setFacebook}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <Input
                        title="Add Instagram"
                        placeholder="Enter Instagram link"
                        state={instagram}
                        setState={setInstagram}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <Input
                        title="Add Discord"
                        placeholder="Enter Discord link"
                        state={discord}
                        setState={setDiscord}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <Input
                        title="Add LinkedIn"
                        placeholder="Enter LinkedIn link"
                        state={linkedIn}
                        setState={setLinkedIn}
                        multi={undefined}
                        date={undefined}
                        time={undefined}
                        password={undefined}
                        required={undefined}
                        disabled={undefined}
                    />
                    <div className="flex justify-between">
                        <button className="btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn" onClick={() => updateProfile()}>
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile
// export {}
