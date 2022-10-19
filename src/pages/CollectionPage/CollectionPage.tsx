import { useEffect, useState } from "react";
import dummyImg from "../../assets/images/allNFTImage.png";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FaDiscord } from "react-icons/fa";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import CollectionFilter from "./CollectionFilter";
import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import "./collection.scss";
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import { ExploreElement } from "../Explore/ExploreElements";
import uuid from "react-uuid";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useParams } from "react-router-dom";
import {
    getCollectionUsingId,
    getCollections,
} from "../../services/api/supplier";
import PageLoader from "../../components/Loading/PageLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import {getSimpleDate} from "../../utils/date";
import NotFound from "../../components/404/NotFound";


const CollectionPage = () => {
    const { id } = useParams();
    const [lessDesc, setLessDesc] = useState(true);
    const [totalAssets,setTotalAssets] = useState<any>(1)
    const [descriprion, setDescription] = useState(
        "A handpicked collection of 10,000 NFTs created by artist Ramdaram. You can participate in a journey of nostalgia as a way to be true to yourself. VEE yourself and see you at the pool party."
    );
    const [pageState, setPageState] = useState("assets");
    const [collection, setCollection] = useState<any>("");
    const [keyword, setKeyword] = useState("");
    const [view, setView] = useState("grid1");
    const [sortBy, setSortBy] = useState("NONE");
    const [loading, setLoading] = useState(true);
    const [itemLoading,setItemLoading] = useState(true);
    const [nfts, setNfts] = useState([]);
    const [status, setStatus] = useState({
        onSale: false,
        onAuction: false,
    });
    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: 100000000000000,
    });
    const [skip, setSkip] = useState(0);
    const [filterDrawer, setFilterDrawer] = useState(false);

    const collectionWebsite = "";
    const telegramLink = "";
    const twitterLink = "";
    const discordLink = "";

    const getCollectionById = async () => {
        try {
            setLoading(true);
            const collection = await getCollectionUsingId(id);
            setCollection(collection.data);
            
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchCollectionItems = async () => {
        try {
            setItemLoading(true)
            const g = await getCollections(id, 10, skip);
            // const gdata = await g.data.data[0]
            console.log("g: ", g);
            setTotalAssets(g.data.total)
            setNfts([...nfts,...g.data.data]);
            setSkip((prev)=>prev+30)
            setItemLoading(false)

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCollectionById();
        fetchCollectionItems();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <>
            <Drawer
                anchor={"right"}
                open={filterDrawer}
                onClose={() => setFilterDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#000",
                        padding: "2rem 2rem",
                    },
                }}
            >
                <div className="text-white text-2xl mb-6 font-semibold relative">
                    Filter
                    <button
                        className="absolute right-0"
                        onClick={() => setFilterDrawer(false)}
                    >
                        <CloseRoundedIcon />
                    </button>
                </div>
                <CollectionFilter
                    status={status}
                    setStatus={setStatus}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />
            </Drawer>
            <div className="flex flex-col w-full max-w-[1290px]">
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full pb-8 relative">
                        <img
                            src={collection?.bannerUrl}
                            alt="collection-banner"
                            className="h-[350px] w-full object-cover"
                        />
                        <div className="rounded-full drop-shadow-lg p-[6px] absolute bottom-0 md:left-10 md:right-auto mx-auto max-w-fit left-0 right-0 from-[#7460ed] to-[#a7a9fa] bg-gradient-to-r">
                            <img
                                src={collection?.logoUrl}
                                alt="collection-logo"
                                className="rounded-full h-[180px] w-[180px] object-fill"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between md:items-center  px-8">
                        <h1 className="text-3xl font-semibold">
                            {collection?.collectionName}
                        </h1>
                        
                        <div className="flex gap-2">
                            {collection?.websiteUrl ? (
                                <a
                                    href={collection?.websiteUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <LanguageOutlinedIcon />
                                </a>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/50 rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <LanguageOutlinedIcon />
                                </a>
                            )}
                            {collection?.telegramUrl ? (
                                <a
                                    href={collection?.telegramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <TelegramIcon />
                                </a>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/50 rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <TelegramIcon />
                                </a>
                            )}
                            {collection?.twitterUrl ? (
                                <a
                                    href={collection?.twitterUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <TwitterIcon />
                                </a>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/50 rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <TwitterIcon />
                                </a>
                            )}
                            {collection?.discordUrl ? (
                                <a
                                    href={collection?.discordUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xl text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <FaDiscord />
                                </a>
                            ) : (
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xl text-white/50 rounded-full aspect-square w-10 p-1 flex items-center justify-center"
                                >
                                    <FaDiscord />
                                </a>
                            )}
                        </div>
                    </div>
                    <p className="px-8 text-xl font-medium capitalize text-white/70">Category - {collection?.category}</p>
                    <div className="px-8">
                    {totalAssets > 1 ? "Assets" : "Asset"} <span className="font-medium text-white/70">{!itemLoading && totalAssets}</span> · Created{" "}
                        <span className="font-medium text-white/70">{getSimpleDate(collection.createdAt)}</span>
                    </div>
                    <div className="px-8">
                        {collection?.description.length > 100 ? (
                            <>
                                {collection?.description.substring(0, 100)}...
                                <div
                                    className="cursor-pointer text-sm"
                                    onClick={() => setLessDesc(false)}
                                >
                                    See More <ExpandMoreRoundedIcon />
                                </div>
                            </>
                        ) : (
                            <>
                                {collection?.description}
                                {collection?.description.length > 100 && (
                                    <div
                                        className="cursor-pointer text-sm"
                                        onClick={() => setLessDesc(true)}
                                    >
                                        See Less <ExpandLessRoundedIcon />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-6 p-8 pb-0 relative collection-page-filter">
                    <button
                        onClick={() => setPageState("assets")}
                        className={`cursor-pointer relative pb-3 ${
                            pageState === "assets" &&
                            "collection-page-filter-btn"
                        }`}
                    >
                        Assets
                    </button>
                    {/* <button
                        onClick={() => setPageState("activity")}
                        className={`cursor-pointer relative pb-3 ${
                            pageState === "activity" &&
                            "collection-page-filter-btn"
                        }`}
                    >
                        Activity
                    </button> */}
                    <button
                        className="d-none absolute right-8"
                        onClick={() => setFilterDrawer(true)}
                    >
                        <FilterAltIcon />
                    </button>
                </div>
                <div className="flex gap-6 justify-between p-8">
                    <div className="min-w-[300px] w-[300px] d-vis">
                        <CollectionFilter
                            status={status}
                            setStatus={setStatus}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-8">
                        <div className="results-sort">
                            <div className="search-bar w-full">
                                <TextField
                                    placeholder="Search"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    sx={{ width: "100%" }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon
                                                    sx={{ color: "#fff" }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="sort-layout h-full relative">
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    sx={{ width: "180px" }}
                                    placeholder="Sort By"
                                >
                                    <MenuItem disabled value="NONE">
                                        Sort By
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        Price: Low to High
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        Price: High to Low
                                    </MenuItem>
                                </Select>
                                <div className="switch">
                                    <button
                                        onClick={() => setView("grid1")}
                                        className={`switch ${
                                            view === "grid1" && "active"
                                        }`}
                                    >
                                        <GridViewRoundedIcon className="icon" />
                                    </button>
                                    <button
                                        onClick={() => setView("grid2")}
                                        className={`switch ${
                                            view === "grid2" && "active"
                                        }`}
                                    >
                                        <GridOnRoundedIcon className="icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <InfiniteScroll
                            dataLength={nfts.length}
                            next={fetchCollectionItems}
                            hasMore={totalAssets > nfts.length}
                            loader={<NftSkeletonLoader />}
                            endMessage={
                                <p className="mt-10 text-center">
                                    <b></b>
                                </p>
                            }
                        >
                            <div className={`${view} collection-page-grid`}>
                                {nfts.map((element: any) => (
                                    <ExploreElement
                                        key={uuid()}
                                        element={element}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                        {itemLoading && nfts.length === 0 && <NftSkeletonLoader />}

                        {!itemLoading && totalAssets === 0 && <NotFound />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionPage;
