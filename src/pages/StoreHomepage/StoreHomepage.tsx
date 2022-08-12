import featuredImg from "../../assets/images/marketPlaceMain.png"
import userImg from "../../assets/images/Rectangle 8 (1).png";

import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "../Marketplace/MarketPlaceMain";
import MarketPlaceDiscover from "../Marketplace/MarketPlaceDiscover/MarketPlaceDiscover";
import StayInLoop from "../../components/StayInLoop/StayInLoop";
import StoreSwiper from "./StoreSwiper/StoreSwiper";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const StoreHomepage = () => {
    const [recentCreated, setRecentCreated] = useState([]);
    const [availableSale, setAvailableSale] = useState([]);
    const [recentPurchased, setRecentPurchased] = useState([]);
    const saleStats = {
        artworks: "37k",
        artists: "27k",
        auctions: "99k",
    };
    const recentlyCreatedList = [
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Art",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Coins",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Game",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Art",
        },
    ];
    const categories = [
        "Art",
        "Music",
        "Sport",
        "Virtual Worlds",
        "Utility",
        "Trading Cards",
        "Domain Names",
        "Collectibles",
      ];

      useEffect(() => {
        init();
      }, []);

      const init = async () => {
        await axios
          .get(`${BASE_URL}/nft/getRecent/0`)
          .then((res) => {
            console.log("recent", res.data.nfts);
            setRecentCreated(res.data.nfts);
          })
          .catch((err) => {});
        await axios
          .get(
            `${BASE_URL}/auction/getAllExplore/0/0/${encodeURIComponent(
              JSON.stringify([["createdAt", -1]])
            )}`
          )
          .then((res: any) => {
            console.log("available", res.data.data);
            setAvailableSale(res.data.data);
          })
          .catch((err) => {
            toast.error(err.messaage);
          });
        await axios
          .get(`${BASE_URL}/auction/getRecentPurchased/0`)
          .then((res: any) => {
            console.log("recent purchased", res.data.data);
            setRecentPurchased(res.data.data);
          })
          .catch((err) => {
            toast.error(err.messaage);
          });
      };

    return (
        <section className="market-place">
            <BlueBackground />
            <MarketPlaceMain saleStats={saleStats} noStats storeTitle={'Create, Collect & Sell extraordinary NFTs'} noBanner />
            <StoreSwiper list={recentCreated} title={'Recently created'} />
            <StoreSwiper list={recentPurchased} title={'Recently purchased'} />
            <StoreSwiper list={availableSale} title={'Availbale for sale'} />
            <MarketPlaceDiscover categories={categories} />
            <StayInLoop />
        </section>
    );
};

export default StoreHomepage;