// Lib
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
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
// Icons
import profileCreated from "../../assets/svgs/profileCreated.svg";
import profileListing from "../../assets/svgs/listing.svg";
import profileCollected from "../../assets/svgs/profileCollected.svg";
import profileOffers from "../../assets/svgs/list.svg"; 
// Styles
import "./ProfileMain.scss";
import axios from "axios";
import { BASE_URL } from "../../config";
import { getAccessToken, getNftByUserId } from "../../services/api/supplier";
import toast from 'react-hot-toast';

import { Helmet } from "react-helmet";
import PageLoader from "../../components/Loading/PageLoader"

// Generics
type useStateType<T> = [T, Dispatch<SetStateAction<T>>];

const Profile = (): ReactJSXElement => {
    // add is additional information
    const tabs = [
        { name: "Created", image: profileCreated, add: "" },
        { name: "My Collections", image: profileCollected, add: "" },
        // { name: "Favourited", image: profileFavourited, add: "6" },
        // { name: "Listing", image: profileListing, add: "" },
        { name: "Offers", image: profileOffers, add: "" },
    ];
    // Index of current element
    const location = useLocation();
    const accessToken = getAccessToken();
    // Name of the current tab
    const tabName = decodeURIComponent(location.pathname.slice(
        location.pathname.lastIndexOf("/") + 1
        ));
    const [currentTab, setCurrentTab]: useStateType<Number> = useState(
        tabs.findIndex((tab) => tab.name.toLowerCase() === tabName)
    );
    const [search, setSearch]: useStateType<String> = useState("");

    const createdColumns = ["Item", "Chain","Provenance" ,"Date"];
    const collectionColumn = ["Collection", "Owner", "Date"];
    const offersColumns = ["Item", "Latest Bid", "Chain", "Date"];
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [ordisplayListing, setorDisplayListing] = useState([]);
    const [ordisplayCreated, setorDisplayCreated] = useState([]);
    const [displayListing, setDisplayListing] = useState([]);
    const [displayCreated, setDisplayCreated] = useState([]);
    const [displayCollections,setDisplayCollection] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [metadata,setMetadata] = useState<any>();
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
    const { profileState } = useParams();

    const getNfts = async () => {
        setTableLoading(true)
        try {
            const res = await getNftByUserId(page);
            setMetadata(res.data.metadata);
            setorDisplayCreated(res.data.nfts);
            setorDisplayListing(res.data.auctions);
            setDisplayCreated(res.data.nfts);
            setDisplayListing(res.data.auctions);
            setDisplayCollection(res.data.collections);
            setTableLoading(false);
        } catch (e) {
            //console.log(e);
            toast.error(e);
            setTableLoading(false)
        }
    };
    const getUserProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/users/getUserProfile`, {
                headers: {
                    Authorization: "Bearer " + `${accessToken}`,
                },
            });
            setUser(res.data.user);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            //console.log(err);
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
        console.log("porieu")
        getNfts();
        getUserProfile();
        if (!getAccessToken()) {
            navigate("/explore");
        }
    }, []);
    useEffect(() => {
        getNfts()
    },[page])
    return (
        <>
            {loading ? <PageLoader /> : (
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
                    {/* {profileState === "favourited" && (
                        <Favourited items={items} />
                    )} */}
                    {profileState === "my collections" && (
                        <Listing
                            list={displayCollections}
                            search={search}
                            setSearch={setSearch}
                            columns={collectionColumn}
                            loading={tableLoading}
                            page={page}
                            setPage={setPage}
                            profileState={profileState}
                            metadata={{
                                limit: metadata?.limit,
                                skip: metadata?.skip,
                                total: metadata?.totalCollections
                            }}
                        />
                    )}
                    {profileState === "offers" && (
                        <Listing
                            list={displayListing}
                            search={search}
                            setSearch={setSearch}
                            columns={offersColumns}
                            loading={tableLoading}
                            page={page}
                            setPage={setPage}
                            profileState={profileState}
                            metadata={{
                                limit: metadata?.limit,
                                skip: metadata?.skip,
                                total: metadata?.totalAuctions
                            }}
                        />
                    )}
                    {(profileState === "created" || !profileState) && (
                        <Listing
                            list={displayCreated}
                            search={search}
                            setSearch={setSearch}
                            columns={createdColumns}
                            loading={tableLoading}
                            page={page}
                            profileState={profileState}
                            setPage={setPage}
                            metadata={{
                                limit: metadata && metadata?.limit,
                                skip: metadata && metadata?.skip,
                                total: metadata && metadata?.totalNfts
                            }}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Profile;
