// Lib
import { useContext, useEffect, useState } from "react";

// Images
import elementImage from "../../assets/images/createselector1.png";
import creatorImage from "../../assets/images/token.png";

// SASS
import "./Explore.scss";

// Components
import ExploreFilters from "./ExploreFilters";
import ExploreElements from "./ExploreElements";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import NotFound from "../../components/404/NotFound";
import Loader from "../../components/Loading/Loader";
//apis
import {
    getMarketplaceNfts,
    verifyEmailApi,
} from "../../services/api/supplier";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createNearSignature, getChainId } from "../../utils/utils";
import { cookieDomain } from "../../config";
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import { ChainContext } from "../../context/ChainContext";
import { useQuery } from "../../Hooks/useQuery";
import { Helmet } from "react-helmet";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

import { initContract } from "../../utils/helpers";
const Explore = () => {
    // HardCoded
    const { filter, setFilter } = useContext(UserContext);
    const [skiploading, setskiploading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [metadata, setmetadata] = useState<any>([]);
    const query = useQuery();
    const searchQuery = query.get("search");
    const nearLoginQuery = query.get("near-login");
    const { chain } = useContext(ChainContext);
    const filters = [
        "All",
        "Art",
        "Nft Collection",
        "Trading Cards",
        "Photography",
        "Carbon Credits",
        "Real Estate",
        "Financial Instruments",
        "Event Tickets",
        "Metaverse",
        "Gaming",
        "Music",
    ];
    const { chainNetwork } = useParams();
    // States
    const [displayElements, setDisplayItems] = useState([]);
    const [sortBy, setsortBy] = useState<any>([["createdAt", -1]]);
    const [sortBy2, setsortBy2] = useState<any>("createdAt");
    const [skip, setskip] = useState(0);
    const [ResetPasswordPopUpShow, setResetPasswordPopUpShow] =
        useState<any>(false);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchItems = async () => {
        if (skiploading) {
            setLoading(true);
            console.log("fetch items chain: ", chain);
            getMarketplaceNfts(
                skip,
                getChainId(chain),
                sortBy,
                filter.toLowerCase()
            )
                .then((res: any) => {
                    console.log("[displayElements ,...res.data.data]: ", [...displayElements ,...res.data.data]);
                    if(displayElements.length>0) {
                        setDisplayItems([...displayElements ,...res.data.data]);
                    }
                    else setDisplayItems(res.data.data);
                    
                    setLoading(false);
                    setskip((prevState) => prevState + 30)
                    query.delete("search");
                    document.body.scrollTop = 0;
                })
                .catch((error) => {
                    //console.log(error);
                    setskiploading(false);
                    setLoading(false);
                });
        }
    };
    useEffect(() => {
        console.log('skiipi',skip)
    },[skip])
    const verifyEmail = async (token: string, email: string) => {
        const res = await verifyEmailApi(token, email);
        Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
            domain: cookieDomain,
            expires: 30,
        });
        Cookies.set("userInfo", JSON.stringify(res.data.user), {
            domain: cookieDomain,
            expires: 30,
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        navigate("/home", { replace: true });
    };
    // window.addEventListener("scroll", async function () {
    //     var root: any;
    //     root = document.querySelector(".market_place")?.getBoundingClientRect();
    //     console.log("root: ", root);
    //     if (root?.top + root?.height - this.window.innerHeight - 4200 < 0) {
    //         if (!skiploading) {
    //             setskiploading(true);
    //             setskip((prevState) => prevState + 30);
    //         }
    //     }
    // });

    // Effect
    useEffect(() => {
        // nothing for now
        fetchItems();
        document.body.scrollTop = 0;
    }, [filter, chain]);

    useEffect(() => {
        if (
            location.pathname.includes("/login") &&
            location.pathname.split("/").length > 3
        ) {
            verifyEmail(
                location.pathname.split("/")[2],
                location.pathname.split("/")[3]
            );
        }
        if (
            location.pathname.includes("/reset-password") &&
            location.pathname.split("/").length > 3
        ) {
            setResetPasswordPopUpShow(true);
        }

        if (chain !== "" && !searchQuery) {
            navigate(`/explore/${chain}`);
        }
        if (searchQuery) {
            setFilter(searchQuery);
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (chain !== "" && !searchQuery) {
            navigate(`/explore/${chain}`);
        }
        window.scrollTo(0, 0);
    }, [chain]);

    async function nearLogin() {
        try {
            const { config, walletConnection, keyStore, networkId } =
                await initContract();
            // let nearWalletConnection = walletConnection;
            // localStorage.setItem("walletChain", "Near");
            let accountId = walletConnection.account().accountId;
            const data = await createNearSignature(
                keyStore,
                networkId,
                accountId
            );
        } catch (error) {
            //console.log(error)
            toast.error("Error:" + error?.message);
        }
    }

    useEffect(() => {
        if (nearLoginQuery === "success") {
            nearLogin();
        }
    }, []);

    return (
        <section className={!skiploading ? "market_place explore" : "explore"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Marketplace</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <BlueBackground />
            <h1 className="explore-heading">Explore Assets</h1>
            <ExploreFilters
                filters={filters}
                setCurrentFilter={setFilter}
                currentFilter={filter}
            />
            <InfiniteScroll
                dataLength={displayElements.length}
                next={fetchItems}
                hasMore={true}
                loader={<NftSkeletonLoader />}
            >
                <ExploreElements elements={displayElements} />
            </InfiniteScroll>
        </section>
    );
};

export default Explore;
