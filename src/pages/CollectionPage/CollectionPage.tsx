import dummyImg from "../../assets/images/allNFTImage.png"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import TwitterIcon from "@mui/icons-material/Twitter"
import TelegramIcon from "@mui/icons-material/Telegram"
import { FaDiscord } from "react-icons/fa"
import { useState } from "react"
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded"
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded"
import CollectionFilter from "./CollectionFilter"
import { InputAdornment, MenuItem, Select, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded"
import "./collection.scss"
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader"
import { ExploreElement } from "../Explore/ExploreElements"
import uuid from "react-uuid"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import Drawer from "@mui/material/Drawer"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

const ALL_NFTS = [
    {
        _id: "633d6c7104be88dbd6e0ec8d",
        auctionType: "Sale",
        auctionId: "17",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-10-05T11:37:21.126Z",
        auctionStartTxnHash:
            "0xf64843d1f94f202624a1ff4c8f85180855ecc4fd5e7582b91889472221f6d7fb",
        tokenId: "29",
        nftId: {
            _id: "633d6c1c04be88dbd6e0ec75",
            name: "Asset #019 mWEB",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmX1dXqjzB1nZHxhuCQuR1AVCYJLstCHaEXgnjTwTNqVvF",
            nftType: "video/webm",
            description:
                "Pocket Pay cards designed by Davide Pacilio. Connect with them on Dribbble; the global community for designers and creative professionals.",
            tags: [],
            isApproved: false,
            tokenId: "29",
            views: 7,
            uploadedBy: "6316340eff9da735d2665724",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/QmP62V5vf2nymuH443HgGcCdbGecF9Cd1HtzX5rEH9FQQW",
            mintedBy: "6316340eff9da735d2665724",
            mintedInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            userInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 5,
            category: "music",
            owner: "6316340eff9da735d2665724",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-10-05T11:35:56.586Z",
            updatedAt: "2022-10-05T14:38:31.779Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 4000000000000000,
        name: "Asset #019 mWEB",
        sellerInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerWallet: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerId: "6316340eff9da735d2665724",
        views: 7,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/QmP62V5vf2nymuH443HgGcCdbGecF9Cd1HtzX5rEH9FQQW",
        category: "music",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-10-05T11:37:21.130Z",
        updatedAt: "2022-10-05T14:38:31.845Z",
        __v: 0,
    },
    {
        _id: "633d4c4fa64d676de5ca04b3",
        auctionType: "Sale",
        auctionId: "16",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-10-05T09:20:15.549Z",
        auctionStartTxnHash:
            "0xbe4d1e5c7757ef704d89671a1414bb437db9f82b14de96c278f9008171b45918",
        tokenId: "27",
        nftId: {
            _id: "633d4b86a64d676de5ca0454",
            name: "boat on life",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmNm5WSkUmMcgwC8h4erqRUaEVs6ZAAAP2gxLGy7fiEn2X",
            nftType: "image/jpeg",
            description: "testing",
            tags: [
                {
                    property: "Test",
                    value: "22",
                },
            ],
            isApproved: false,
            tokenId: "27",
            views: 7,
            uploadedBy: "6316340eff9da735d2665724",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/QmSkRTqsRCT7xx3wSEce28c39Q6GMfg4Nfh95FGRSsPj6F",
            mintedBy: "6316340eff9da735d2665724",
            mintedInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            userInfo: "aps",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 5,
            category: "art",
            owner: "6207751c8c0ac5aa9e171ab5",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-10-05T09:16:54.660Z",
            updatedAt: "2022-10-14T15:12:14.497Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 100000000000000000,
        name: "boat on life",
        sellerInfo: "aps",
        sellerWallet: "0x50Ca1fde29D62292a112A72671E14a5d4f05580f",
        sellerId: "6207751c8c0ac5aa9e171ab5",
        views: 4,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/QmSkRTqsRCT7xx3wSEce28c39Q6GMfg4Nfh95FGRSsPj6F",
        category: "art",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-10-05T09:20:15.550Z",
        updatedAt: "2022-10-05T09:20:15.550Z",
        __v: 0,
    },
    {
        _id: "633d47f6a64d676de5ca0241",
        auctionType: "Sale",
        auctionId: "13",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-10-05T09:01:42.483Z",
        auctionStartTxnHash:
            "0x2e23826c489f24644f9d9e7f2eb8c09c223de01346bddeb5cee0c0b612d38b83",
        tokenId: "25",
        nftId: {
            _id: "633d47958cdd10daf69c776f",
            name: "Asset #005 M",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmXV7xNKWeQmXKsAZVybyCvM1KS8euLaNbr4rfxzKTccQo",
            nftType: "image/jpeg",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aut",
            tags: [
                {
                    property: "",
                    value: "",
                },
            ],
            isApproved: false,
            tokenId: "25",
            views: 25,
            uploadedBy: "6316340eff9da735d2665724",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/Qmf29SA3yLjN4vhKcaregi3EsLzvFRyGxNaq5nTJGTxWCK",
            mintedBy: "6316340eff9da735d2665724",
            mintedInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            userInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 4,
            category: "music",
            owner: "6316340eff9da735d2665724",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-10-05T09:00:05.798Z",
            updatedAt: "2022-10-10T13:56:14.522Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 2730000000000000,
        name: "Asset #005 M",
        sellerInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerWallet: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerId: "6316340eff9da735d2665724",
        views: 25,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/Qmf29SA3yLjN4vhKcaregi3EsLzvFRyGxNaq5nTJGTxWCK",
        category: "music",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-10-05T09:01:42.489Z",
        updatedAt: "2022-10-10T13:56:14.832Z",
        __v: 0,
    },
    {
        _id: "633d32ca04be88dbd6e0e942",
        auctionType: "Sale",
        auctionId: "12",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-10-05T07:31:22.309Z",
        auctionStartTxnHash:
            "0x6a1e42c87fa2e86b91cee4d990d303d3ee5d726c9af3969f2bb56a1202f84b78",
        tokenId: "18",
        nftId: {
            _id: "63203a80063aba10889e1825",
            name: "Gamble kingdom",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmSbBPbkTUTsoznrXswYs8mWosEiXj3b6BhYLNJn19iY2U",
            nftType: "image/png",
            description: "0x2871E9DfD851169284F86c6838C9De07B148aF97",
            tags: [
                {
                    property: "",
                    value: "",
                },
            ],
            isApproved: false,
            tokenId: "18",
            views: 15,
            uploadedBy: "6318c974c8e00dde86bdb3fa",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/QmRTGPeTGhYqtv5FYM1webcmGuFV1SPNjZJfKqKasXMJYv",
            mintedBy: "6318c974c8e00dde86bdb3fa",
            mintedInfo: "0x2871e9dfd851169284f86c6838c9de07b148af97",
            userInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 5,
            category: "art",
            owner: "6316340eff9da735d2665724",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-09-13T08:08:32.764Z",
            updatedAt: "2022-10-05T07:45:46.405Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 7770000000000000,
        name: "Gamble kingdom",
        sellerInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerWallet: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerId: "6316340eff9da735d2665724",
        views: 7,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/QmRTGPeTGhYqtv5FYM1webcmGuFV1SPNjZJfKqKasXMJYv",
        category: "art",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-10-05T07:31:22.310Z",
        updatedAt: "2022-10-05T07:31:22.310Z",
        __v: 0,
    },
    {
        _id: "633c51a576a8c1431f94c76e",
        auctionType: "Sale",
        auctionId: "10",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-10-04T15:30:45.359Z",
        auctionStartTxnHash:
            "0xcaf8099f6b594a3d2c10323df141415091518a01690162d13a467235ee784cf6",
        tokenId: "21",
        nftId: {
            _id: "633c502b76a8c1431f94c751",
            name: "Asset #01",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmYsj1A7Eurxfek89EJxUuCdsy23e2NRFX6kkq2iqd9AFU",
            nftType: "image/jpeg",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen ",
            tags: [
                {
                    property: "Green",
                    value: "Color",
                },
            ],
            isApproved: false,
            tokenId: "21",
            views: 15,
            uploadedBy: "6316340eff9da735d2665724",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/QmTZGwwuQG94BmoFBKGECuqrh3fbj4Zno6sfKJRhpCdHSN",
            mintedBy: "6316340eff9da735d2665724",
            mintedInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            userInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 6,
            category: "music",
            owner: "6316340eff9da735d2665724",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-10-04T15:24:27.167Z",
            updatedAt: "2022-10-05T07:29:30.615Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 14700000000000000,
        name: "Asset #01",
        sellerInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerWallet: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerId: "6316340eff9da735d2665724",
        views: 15,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/QmTZGwwuQG94BmoFBKGECuqrh3fbj4Zno6sfKJRhpCdHSN",
        category: "music",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-10-04T15:30:45.362Z",
        updatedAt: "2022-10-05T07:29:30.906Z",
        __v: 0,
    },
    {
        _id: "6321cae888b2d842abdaa37b",
        auctionType: "Sale",
        auctionId: "9",
        auctionTimer: "1970-01-01T00:00:00.000Z",
        auctionStatus: 2,
        auctionStartOn: "2022-09-14T12:36:56.274Z",
        auctionStartTxnHash:
            "0xedf7ab072ed5e981d09acf7d49c7213c323d6968b3ab35a4d8053fca9922c75c",
        tokenId: "20",
        nftId: {
            _id: "6321c88a66184476e5a8cd41",
            name: "Carbon A",
            jsonHash:
                "https://unicus.mypinata.cloud/ipfs/QmfTpR6nt2pMoJwa8QM5Ta88pajMR7jZeFSZ2QTLqDe9sU",
            nftType: "image/jpeg",
            description: "test",
            tags: [
                {
                    property: "Carbon",
                    value: "Test",
                },
            ],
            isApproved: false,
            tokenId: "20",
            views: 9,
            uploadedBy: "6316340eff9da735d2665724",
            cloudinaryUrl:
                "https://unicus.mypinata.cloud/ipfs/QmUVKgi7nkB7Jr6iuktUVU8TXwhjY6jENazEv3xjKJvRrc",
            mintedBy: "6316340eff9da735d2665724",
            mintedInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            userInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
            contractType: "721",
            contractAddress: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            nftStatus: 2,
            chain: 4,
            royalty: 5,
            category: "carbon credits",
            owner: "6316340eff9da735d2665724",
            active: true,
            storefront: "624a951c1db000b674636777",
            createdAt: "2022-09-14T12:26:50.492Z",
            updatedAt: "2022-10-06T04:29:54.669Z",
            __v: 0,
        },
        chain: 4,
        lastBid: 0,
        bidsPlaced: 0,
        startBid: 3000000000000000000,
        name: "Carbon A",
        sellerInfo: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerWallet: "0xa42D259b70F5C5831dE885D266455396e81065F7",
        sellerId: "6316340eff9da735d2665724",
        views: 9,
        cloudinaryUrl:
            "https://unicus.mypinata.cloud/ipfs/QmUVKgi7nkB7Jr6iuktUVU8TXwhjY6jENazEv3xjKJvRrc",
        category: "carbon credits",
        active: true,
        storefront: "624a951c1db000b674636777",
        createdAt: "2022-09-14T12:36:56.275Z",
        updatedAt: "2022-10-06T04:29:54.735Z",
        __v: 0,
    },
]

const CollectionPage = () => {
    const [lessDesc, setLessDesc] = useState(true)
    const [descriprion, setDescription] = useState(
        "A handpicked collection of 10,000 NFTs created by artist Ramdaram. You can participate in a journey of nostalgia as a way to be true to yourself. VEE yourself and see you at the pool party."
    )
    const [pageState, setPageState] = useState("items")
    const [keyword, setKeyword] = useState("")
    const [view, setView] = useState("grid1")
    const [sortBy, setSortBy] = useState("NONE")
    const [loading, setLoading] = useState(false)
    const [nfts, setNfts] = useState(ALL_NFTS)
    const [status, setStatus] = useState({
        onSale: false,
        onAuction: false,
    })
    const [priceRange, setPriceRange] = useState({
        min: null,
        max: null,
    })
    const [filterDrawer, setFilterDrawer] = useState(false)

    const collectionWebsite = ""
    const telegramLink = ""
    const twitterLink = ""
    const discordLink = ""

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
                    <button className="absolute right-0" onClick={() => setFilterDrawer(false)}>
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
                            src={dummyImg}
                            alt="collection-banner"
                            className="h-[350px] w-full object-cover"
                        />
                        <div className="rounded-full drop-shadow-lg p-[6px] absolute bottom-0 md:left-10 md:right-auto mx-auto max-w-fit left-0 right-0 from-[#7460ed] to-[#a7a9fa] bg-gradient-to-r">
                            <img
                                src={dummyImg}
                                alt="collection-logo"
                                className="rounded-full h-[180px] w-[180px] object-fill"
                            />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between md:items-center pb-2 px-8">
                        <h1 className="text-3xl font-semibold">
                            Be VEE - Summer Collection
                        </h1>
                        <div className="flex gap-2">
                            <a
                                href={collectionWebsite}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center button-hover-link"
                            >
                                <LanguageOutlinedIcon />
                            </a>
                            <a
                                href={telegramLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center button-hover-link"
                            >
                                <TelegramIcon />
                            </a>
                            <a
                                href={twitterLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center button-hover-link"
                            >
                                <TwitterIcon />
                            </a>
                            <a
                                href={discordLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xl text-white rounded-full aspect-square w-10 p-1 flex items-center justify-center button-hover-link"
                            >
                                <FaDiscord />
                            </a>
                        </div>
                    </div>
                    <div className="px-8">
                        Items {10000} · Created{" "}
                        {new Date().toLocaleDateString()}
                    </div>
                    <div className="px-8">
                        {lessDesc ? (
                            <>
                                {descriprion.substring(0, 100)}...
                                <div
                                    className="cursor-pointer text-sm"
                                    onClick={() => setLessDesc(false)}
                                >
                                    See More <ExpandMoreRoundedIcon />
                                </div>
                            </>
                        ) : (
                            <>
                                {descriprion}
                                <div
                                    className="cursor-pointer text-sm"
                                    onClick={() => setLessDesc(true)}
                                >
                                    See Less <ExpandLessRoundedIcon />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-6 p-8 pb-0 relative collection-page-filter">
                    <button
                        onClick={() => setPageState("items")}
                        className={`cursor-pointer relative pb-3 ${
                            pageState === "items" &&
                            "collection-page-filter-btn"
                        }`}
                    >
                        Items
                    </button>
                    <button
                        onClick={() => setPageState("activity")}
                        className={`cursor-pointer relative pb-3 ${
                            pageState === "activity" &&
                            "collection-page-filter-btn"
                        }`}
                    >
                        Activity
                    </button>
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
                        {loading ? (
                            <NftSkeletonLoader />
                        ) : (
                            <div className={`${view} collection-page-grid`}>
                                {nfts.map((element: any) => (
                                    <ExploreElement
                                        key={uuid()}
                                        element={element}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionPage
