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
import { getChainId } from "../../utils/utils";
import { cookieDomain } from "../../config";
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import { ChainContext } from "../../context/ChainContext";
import { useQuery } from "../../Hooks/useQuery";
import { Helmet } from "react-helmet";
const Explore = () => {
    // HardCoded
    const [skiploading, setskiploading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [metadata, setmetadata] = useState<any>([]);
    const query = useQuery();
    const searchQuery = query.get("search");
    const { chain, setChain } = useContext(ChainContext);
    const filters = [
        "all",
        "funny",
        "art",
        "nature",
        "animal",
        "sports",
        "photography",
        "music",
        "metaverse",
    ];

    const { chainNetwork } = useParams();

    // States
    const [currentFilter, setCurrentFilter] = useState(searchQuery || "all");
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
            getMarketplaceNfts(skip, getChainId(chain), sortBy, currentFilter)
                .then((res: any) => {
                    setDisplayItems(res.data.data);
                    console.log(res.data.data);
                    setLoading(false);
                    query.delete("search");
                    document.body.scrollTop = 0;
                })
                .catch((error) => {
                    console.log(error);
                    setskiploading(false);
                    setLoading(false);
                });
        }
    };

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
    const resetPassword = async () => {};
    window.addEventListener("scroll", async function () {
        var root: any;
        root = document.querySelector(".market_place")?.getBoundingClientRect();
        if (root?.top + root?.height - this.window.innerHeight - 4200 < 0) {
            if (!skiploading) {
                setskiploading(true);
                setskip((prevState) => prevState + 30);
            }
        }
    });

    // Effect
    useEffect(() => {
        // nothing for now
        fetchItems();
        document.body.scrollTop = 0;
    }, [currentFilter, chain]);

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
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        if (chain !== "" && !searchQuery) {
            navigate(`/explore/${chain}`);
        }
        document.body.scrollTop = 0;
    }, [chain]);

    return (
        <section className={!skiploading ? "market_place explore" : "explore"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Marketplace</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <BlueBackground />
            <h1 className="explore-heading">Explore Collections</h1>
            <ExploreFilters
                filters={filters}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
            />
            {loading ? (
                <NftSkeletonLoader />
            ) : displayElements.length > 0 ? (
                <ExploreElements elements={displayElements} />
            ) : (
                <NotFound />
            )}
        </section>
    );
};

export default Explore;
