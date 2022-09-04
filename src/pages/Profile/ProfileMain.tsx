// Lib
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

// Components
import User from "./User/User";
import Activity from "../Activity/Activity";
import ProfileNavigation from "./Navigation/ProfileNavigation";
import Favourited from "./Favourited/Favourited";
import Listing from "./Listing/Listing";

// Images

import favouritedImg from "../../assets/images/favouritedImage.png";
import itemPic from "../../assets/images/itemPic.png";

// Icons
import profileCollected from "../../assets/svgs/profileCollected.svg";
import profileCreated from "../../assets/svgs/profileCreated.svg";
import profileFavourited from "../../assets/svgs/profileFavourited.svg";
import profileActivity from "../../assets/svgs/profileActivity.svg";
import profileListing from "../../assets/svgs/listing.svg";
import profileOffers from "../../assets/svgs/list.svg";

// Styles
import "./ProfileMain.scss";
import axios from "axios";
import { tronChain, BASE_URL } from "../../config";
import { setNotification } from "../../Redux/Blockchain/contracts";
import {
  connectWallet,
  getMarketPlace,
  getMarketPlaceContractAddress,
} from "../../utils/utils";
import web3 from "../../web3";
import { getAccessToken, getNftByUserId } from "../../services/api/supplier";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { userInfo } from "../../utils/utils";
// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const Profile = (): ReactJSXElement => {
    // add is additional information
    const tabs = [
        // { name: "Collected", image: profileCollected, add: "5" },
        { name: "Created", image: profileCreated, add: "" },
        // { name: "Favourited", image: profileFavourited, add: "6" },
        { name: "Listing", image: profileListing, add: "" },
        { name: "Offers", image: profileOffers, add: "" },
    ];
    // Index of current element
    const location = useLocation();
    const accessToken = getAccessToken();
    // Name of the current tab
    const tabName = location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
    );
    const [currentTab, setCurrentTab]: useStateType<Number> = useState(
        tabs.findIndex((tab) => tab.name.toLowerCase() === tabName)
    );
    const [search, setSearch]: useStateType<String> = useState("");

    const items = [
        {
            image: favouritedImg,
            eventName: "Event Name 1",
            eventDescription:
                "OpenSea is the world's first and largest NFT marketplace",
        },
        {
            image: favouritedImg,
            eventName: "Event Name 1",
            eventDescription:
                "OpenSea is the world's first and largest NFT marketplace",
        },
        {
            image: favouritedImg,
            eventName: "Event Name 1",
            eventDescription:
                "OpenSea is the world's first and largest NFT marketplace",
        },
        {
            image: favouritedImg,
            eventName: "Event Name 1",
            eventDescription:
                "OpenSea is the world's first and largest NFT marketplace",
        },
    ];

    const createdColumns = ["Item", "Chain", "Created"];
    const listingColumns = ["Item", "Unit Price", "Status", "Created"];
    const offersColumns = ["Item", "Lastest Bid", "Chain", "Created"];
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [ordisplayListing, setorDisplayListing] = useState([]);
    const [ordisplayCreated, setorDisplayCreated] = useState([]);
    const [displayListing, setDisplayListing] = useState([]);
    const [displayCreated, setDisplayCreated] = useState([]);
    const navigate = useNavigate();
    const { profileState } = useParams();

    const getNfts = async () => {
        try {
            const res = await getNftByUserId();
            console.log("res nfts", res);
            setorDisplayCreated(res.data.nfts);
            setorDisplayListing(res.data.auctions);
            setDisplayCreated(res.data.nfts);
            setDisplayListing(res.data.auctions);
        } catch (e) {
            console.log(e);
            toast.error(e);
        }
    };
    const getUserProfile = async () => {
        try {
            setLoading(true);
            console.log("BASE_URL: ", BASE_URL);
            const res = await axios.get(`${BASE_URL}/users/getUserProfile`, {
                headers: {
                    Authorization: "Bearer " + `${accessToken}`,
                },
            });
            setUser(res.data.user);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    useEffect(() => {
        if (currentTab === 0) {
            const q = search.toLowerCase();
            const temp = ordisplayCreated.filter((item) =>
                item.name.toLowerCase().includes(q)
            );

            setDisplayCreated(temp);
            if (search === "") {
                setDisplayCreated(ordisplayCreated);
            }
        } else {
            const q = search.toLowerCase();
            const temp = ordisplayListing.filter((item) =>
                item.name.toLowerCase().includes(q)
            );
            setDisplayListing(temp);

            if (search === "") {
                setDisplayListing(ordisplayListing);
            }
        }
    }, [search]);

    useEffect(() => {
        getNfts();
        getUserProfile();
        if (!getAccessToken()) {
            navigate("/connect-wallet/profile");
        }
    }, []);

    return (
        <>
            {!loading && (
                <div className="profile">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>UnicusOne - Dashboard</title>
                        <link rel="canonical" href={window.location.href} />
                    </Helmet>
                    <User user={user} />
                    <ProfileNavigation
                        tabs={tabs}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />
                    {profileState === "activity" && <Activity />}
                    {profileState === "favourited" && (
                        <Favourited items={items} />
                    )}
                    {profileState === "listing" && (
                        <Listing
                            list={displayListing}
                            search={search}
                            setSearch={setSearch}
                            columns={listingColumns}
                        />
                    )}
                    {profileState === "offers" && (
                        <Listing
                            list={displayListing}
                            search={search}
                            setSearch={setSearch}
                            columns={offersColumns}
                        />
                    )}
                    {(profileState === "created" || !profileState) && (
                        <Listing
                            list={displayCreated}
                            search={search}
                            setSearch={setSearch}
                            columns={createdColumns}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Profile;
