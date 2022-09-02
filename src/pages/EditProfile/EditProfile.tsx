import userImg from "../../assets/images/userImage.png";
import twitterImg from "../../assets/svgs/twitter.svg";
import facebookImg from "../../assets/svgs/facebook.svg";
import instagramImg from "../../assets/svgs/instagramFooter.svg";
import { useEffect, useState } from "react";
// import Input from "../../components/Input/Input";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import WalletAdd from "../../components/Wallet/WalletAdd";
import axios from "axios";
import "./editprofile.scss";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import {
    changePasswordApi,
    updateProfileSocial,
    updateProfile,
    getAccessToken,
} from "../../services/api/supplier";
import Input from "../../components/Input/Input";
import Cookies from "js-cookie";
import { cookieDomain } from "../../config";
import validator from 'validator';

const EditProfile = (props: any) => {
    const [active, setActive] = useState("general");
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState<any>();
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let navigate = useNavigate()
    const accessToken = getAccessToken();
    const getUserProfile = async () => {
        try {
            console.log("BASE_URL: ", BASE_URL);
            const res = await axios.get(`${BASE_URL}/users/getUserProfile`, {
                headers: {
                    Authorization: "Bearer " + `${accessToken}`,
                },
            });
            console.log("User Data: ", res.data);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancel = () => {
      navigate("/profile")
    }
    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="mt-[70px] px-24 pb-12 screen7:pt-0 screen18:px-12 screen3:px-8 w-full">
            <div className=" w-full pt-12">
                <div className="flex gap-8 screen11:flex-col">
                    <div className="relative felx justify-center items-center screen11:flex-col screen11:ml-0">
                        <div className="w-32 h-32 relative rounded-full overflow-hidden m-auto">
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
                    <div className="flex justify-between w-full screen11:flex-col screen11:justify-center screen11:items-center">
                        <div className="flex flex-col items-start gap-2 relative mt-4">
                            <span className="text-lg w-full screen11:text-center font-semibold">
                                {user
                                    ? user.username
                                        ? user.username
                                        : user.email
                                    : "Loading..."}
                            </span>
                            <span className="text-DarkColor w-full screen11:text-center">
                                {user && user.wallets.length > 0
                                    ? user.wallets[0]
                                    : "No wallet added"}{" "}
                            </span>
                            <div className="mt-2 flex gap-4 items-center">
                                <img
                                    src={twitterImg}
                                    alt="socials"
                                    className="h-6 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                />
                                <img
                                    src={facebookImg}
                                    alt="socials"
                                    className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                />
                                <img
                                    src={instagramImg}
                                    alt="socials"
                                    className="h-8 left-0 screen11:left-auto screen11:m-auto cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="my-4 screen11:mr-0 d-none">
                            <button
                                onClick={handleClick}
                                className="bg-GreyButton p-2 text-lg font-semibold rounded-md d-none"
                            >
                                ...
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
                                <MenuItem onClick={handleClose}>
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
                                </MenuItem>
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
                                <MenuItem onClick={handleClose}>
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
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-12 mt-8">
                <div className="flex flex-col gap-4 screen7:hidden">
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
                    <span
                        onClick={() => setActive("walletAddress")}
                        className={`font-semibold cursor-pointer ${
                            active === "walletAddress"
                                ? "text-[#7460ed] underline"
                                : "text-DarkColor"
                        }`}
                    >
                        WalletAddress
                    </span>
                </div>
                <div className="w-full">
                    {active === "general" && (
                        <GeneralSettings resUser={user} />
                    )}
                    {active === "password" && (
                        <ChangePassword handleCancel={handleCancel} />
                    )}
                    {active === "social" && <AddSocials handleCancel={handleCancel} resUser={user} />}
                    {active === "walletAddress" && (
                        <WalletAdd isLogin={accessToken} />
                    )}
                </div>
            </div>
        </div>
    );
};

const GeneralSettings = ({ resUser }) => {
    console.log("resUser: ", resUser);
    const [username, setUserName] = useState<string>();
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState<string>();
    let navigate = useNavigate();
    const getUserProfile = async () => {
        setUserName(resUser?.username);
        setEmail(resUser?.email);
        setBio(resUser?.bio);
    };
    const updateUserProfile = async () => {
        try {
            if (!(username?.length > 0) && !(bio?.length > 0))
                return toast.error("Please enter either username or bio");
            const res = await updateProfile(username, bio);
            toast.success("Profile updated Successfully", {
                position: "bottom-center",
            });
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };
    useEffect(() => {
        getUserProfile();
    }, [resUser]);

    return (
        <div className="flex flex-col gap-4">
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
                <button onClick={() => navigate("/profile")} className="btn">
                    Cancel
                </button>
                <button className="btn" onClick={updateUserProfile}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const ChangePassword = ({handleCancel}) => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const changePass = async () => {
        try {
            const res = await changePasswordApi(oldPass, newPass);
            toast.success("Password changed Successfully", {
                position: "bottom-center",
            });
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };
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
                <button className="btn" onClick={handleCancel}>Cancel</button>
                <button className="btn" onClick={changePass}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const AddSocials = ({ resUser,handleCancel }) => {
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [discord, setDiscord] = useState("");
    const [linkedIn, setLinkedIn] = useState("");

    const getUserProfile = async () => {
        setTwitter(resUser?.twitter);
        setFacebook(resUser?.facebook);
        setInstagram(resUser?.instagram);
        setDiscord(resUser?.discord);
        setLinkedIn(resUser?.linkedIn);
    };
    const updateProfile = async () => {
        try {
          if(!validator.isURL(twitter)) {
            return toast.error("Please enter a valid url link to twitter")
          }
          if(!validator.isURL(facebook)){
            return toast.error("Please enter a valid url link to facebook")
          }
          if(!validator.isURL(instagram)){
            return toast.error("Please enter a valid url link to instagram")
          }
          if(!validator.isURL(discord)){
            return toast.error("Please enter a valid url link to discord")
          }
          if(!validator.isURL(linkedIn)){
            return toast.error("Please enter a valid url link to linkedIn")
          }
            const res = await updateProfileSocial(
                instagram,
                facebook,
                twitter,
                discord,
                linkedIn
            );

            if (res.data && res.data?.msg) {
                localStorage.setItem("userInfo", JSON.stringify(res.data?.msg));
                Cookies.set("userInfo", JSON.stringify(res.data?.msg), {
                    domain: cookieDomain,
                    expires: 30,
                });
            }
            toast.success("Socials Updated Successfully", {
                position: "bottom-center",
            });
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [resUser]);
    useEffect(() => {
        getUserProfile();
    }, []);
    return (
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
                <button className="btn" onClick={handleCancel}>Cancel</button>
                <button className="btn" onClick={() => updateProfile()}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
// export {}
