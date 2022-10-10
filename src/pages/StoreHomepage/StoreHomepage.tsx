import featuredImg from "../../assets/images/marketPlaceMain.png";
import userImg from "../../assets/images/Rectangle 8 (1).png";
import {ChainContext} from "../../context/ChainContext"
import {useContext} from "react"
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "../Marketplace/MarketPlaceMain";
import MarketPlaceDiscover from "../Marketplace/MarketPlaceDiscover/MarketPlaceDiscover";
import StayInLoop from "../../components/StayInLoop/StayInLoop";
import StoreSwiper from "./StoreSwiper/StoreSwiper";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

import { BASE_URL } from "../../config";
import {AssetList} from "../../utils/AssetList";
import {getChainId} from "../../utils/utils";

const StoreHomepage = ({store}:any) => {
    const [recentCreated, setRecentCreated] = useState([]);
    const [availableSale, setAvailableSale] = useState([]);
    const [recentPurchased, setRecentPurchased] = useState([]);
    const [loadingRecent, setLoadingRecent] = useState(true)
    const [loadingPurchased, setLoadingPurchased] = useState(true)
    const [loadingAvailableSale, setLoadingAvailableSale] = useState(true)
    const saleStats = {
        artworks: "37k",
        artists: "27k",
        auctions: "99k",
    };
    const {chain} = useContext(ChainContext)

    const init = async () => {
        await axios
            .get(`${BASE_URL}/nft/getRecent/0`)
            .then((res) => {
                setRecentCreated(res.data.nfts);
                setLoadingRecent(false)
            })
            .catch((err) => {
                setLoadingRecent(false)
            });
        await axios
            .get(
                `${BASE_URL}/auction/getAllExplore/0/${getChainId(chain)}/${encodeURIComponent(
                    JSON.stringify([["createdAt", -1]])
                )}`
            )
            .then((res: any) => {
                setAvailableSale(res.data.data);
                setLoadingAvailableSale(false)
            })
            .catch((err) => {
                toast.error(err.messaage);
                setLoadingAvailableSale(false)
            });
        await axios
            .get(`${BASE_URL}/auction/getRecentPurchased/${getChainId(chain)}`)
            .then((res: any) => {
                setRecentPurchased(res.data.data);
                setLoadingPurchased(false)
            })
            .catch((err) => {
                toast.error(err.messaage);
                setLoadingPurchased(false)
            });
    };

    useEffect(() => {
        init();
    }, []);
    return (
        <section className="market-place">
            <BlueBackground />
            <MarketPlaceMain
                saleStats={saleStats}
                noStats
                storeTitle={"Create, Collect & Sell extraordinary NFTs"}
                noBanner
            />
            <StoreSwiper list={recentCreated} title={"Recently created"} loading={loadingRecent} />
            <StoreSwiper list={recentPurchased} title={"Recently purchased"} loading={loadingPurchased} />
            <StoreSwiper list={availableSale} title={"Availbale for sale"} loading={loadingAvailableSale} />
            {/* <MarketPlaceDiscover chain={chain} categories={categories} /> */}
            <StayInLoop />
        </section>
    );
};

export default StoreHomepage;
