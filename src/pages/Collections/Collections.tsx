import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";
import "../Explore/Explore.scss";
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import NotFound from "../../components/404/NotFound";
import { useState, useEffect } from "react";
import { getallCollections } from "../../services/api/supplier";
import toast from "react-hot-toast";
import NftSkeletonLoader from "../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import ExploreFilters from "../Explore/ExploreFilters";
import "./collection.scss";
import uuid from "react-uuid";
import CollectionCard from "./CollectionCard";

const Collections = () => {
    const [limit, setLimti] = useState(10);
    const [skip, setSkip] = useState(0);
    const [totalAssets, setTotalAssets] = useState(1);
    const [filter, setFilter] = useState("all");
    const [collections, setCollections] = useState([]);
    const filters = ["all"];
    const getCollection = async () => {
        try {
            const getData = await getallCollections(limit,skip);
            setTotalAssets(getData.data?.total)
            setCollections(getData.data?.data)
            setSkip((prevState) => prevState + 30)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        //fetch get collections
        getCollection();
    }, []);
    return (
        <div className="min-h-[100vh] explore">
            <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Collections</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <BlueBackground />
            <div className="relative">
                <h1 className="explore-heading">Explore Collections</h1>
                <ExploreFilters
                    filters={filters}
                    setCurrentFilter={setFilter}
                    currentFilter={filter}
                />
            </div>

            <InfiniteScroll
                dataLength={collections.length}
                next={getCollection}
                hasMore={totalAssets > collections.length}
                loader={<NftSkeletonLoader />}
                endMessage={<p className="mt-10 text-center"></p>}
            >
                <div className="explore-all-Collections">
                    {collections.map((element: any) => (
                        <CollectionCard element={element} />
                    ))}
                </div>
            </InfiniteScroll>

            {!collections && <NotFound message={"Stay tuned for more collections..."} />}
        </div>
    );
};

export default Collections;
