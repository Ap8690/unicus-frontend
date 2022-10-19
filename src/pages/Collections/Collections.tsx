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
import PageLoader from "../../components/Loading/PageLoader";
import CollectionCard from "./CollectionCard";

const Collections = () => {
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [totalAssets, setTotalAssets] = useState(1);
    const [filter, setFilter] = useState("all");
    const [collections, setCollections] = useState([]);
    const [loading,setLoading] = useState(false)
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
    const getCollection = async (skip:number,filterApplied:boolean) => {
        try {
            setLoading(true)
            const getData = await getallCollections(limit,skip,filter);
            setTotalAssets(getData.data?.total)
            if(getData.data?.total == 0) {
                setSkip(0)
                setLoading(false)
                return setCollections([])
            }
            setSkip((prevState) => prevState + getData.data?.data.length)
            setLoading(false)
            if(!filterApplied) return setCollections([...collections,...getData.data?.data])
            setCollections(getData.data?.data)
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        //fetch get collections
        
        getCollection(skip,false);
    }, []);
 
    useEffect(() => {
        setSkip(0)
        getCollection(0,true);
        
    },[filter])

    
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
                next={() => getCollection(skip,false)}
                hasMore={totalAssets > collections.length}
                loader={<NftSkeletonLoader />}
                endMessage={<p className="mt-10 text-center"></p>}
            >
                <div className="explore-all-Collections">
                    {collections.map((element: any) => (
                        <CollectionCard key={uuid()} element={element} />
                    ))}
                </div>
            </InfiniteScroll>
            {loading && <NftSkeletonLoader />}
            {totalAssets == 0 && <NotFound message={"Stay tuned for more collections..."} />}
        </div>
    );
};

export default Collections;
