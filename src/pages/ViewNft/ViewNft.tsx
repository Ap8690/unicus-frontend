import "./viewnft.scss";
import { Link, useParams } from "react-router-dom";
import NftImg from "./NftImg";
import NftInfo from "./NftInfo";
import { useEffect, useState } from "react";
import { AllNFTsElement } from "../AllNFTs/AllNFTsBody/AllNFTsElements";
import { getNftByCollection, getNftById } from "../../services/api/supplier";
import PageLoader from "../../components/Loading/PageLoader";
import uuid from "react-uuid";
import { Helmet } from "react-helmet";

const filters = ["Properties","Bids", "History" ];

const ViewNft = () => {
    const [activeFilter, setActiveFilter] = useState(filters[0]);
    const [nft, setNft] = useState<any>();
    const [auction, setAuction] = useState("");
    const [nftImg, setNftImg] = useState("");
    const [creator, setCreator] = useState("");
    const [nftStates, setNftStates] = useState<any>();
    const [nftLoading, setNftLoading] = useState<boolean>(false);
    const [nftByCollection, setNftByCollection] = useState<any>();
    const { chain, contractAddress, nftId } = useParams();
    const [bids,setBids] = useState([])

    async function fetchItem() {
        try {
            setNftLoading(true);
            const res = await getNftById(chain, contractAddress, nftId);
            setNft(res.data.nft);
            setNftStates(res.data.nftStates);
            setAuction(res.data.auction);
            setNftImg(res.data.nft.cloudinaryUrl);
            setBids(res.data.bids)
            setCreator(res.data.user);
            if (res.data.nft.collectionName && res.data.nft.collectionName !== "undefined") {
                const col = await getNftByCollection(res.data.nft.collectionName);
                setNftByCollection(col.data.nft);
            }
            setNftLoading(false);
        } catch (err) {
            console.log("NFT FETCH", err);
            setNftLoading(false);
        }
    }

    useEffect(() => {
        fetchItem();
        
        return () => {
            console.log("This will be logged on unmount");
        };
    }, []);

    return (
        <>
            {nftLoading ? (
                <PageLoader info=""/>
            ) : (
                <div className="view-nft">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>UnicusOne - {nft.name}</title>
                        <link rel="canonical" href={window.location.href} />
                    </Helmet>
                    <div className="nft">
                        <NftImg
                            img={nftImg}
                            likes={7}
                            shares={22}
                            views={nft && nft.views ? nft.views : 0}
                            nftType={nft && nft.nftType}
                        />
                        {nft && (
                            <NftInfo
                                filters={filters}
                                creator={creator}
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter}
                                historyData={nftStates}
                                
                                nft={nft}
                                auction={auction}
                                setNftLoading={setNftLoading}
                                fetchItem={fetchItem}
                                pageChain={chain}
                                bids={bids}
                            />
                        )}
                    </div>
                    {nft && nft?.collectionName && (
                        <div className="nft bottom-grid">
                            <div>
                                {nftByCollection && nftByCollection.map((item: any) => (
                                    <Link
                                        key={uuid()}
                                        to={`/nft/${item.chain}/${item.contractAddress}/${item._id}`}
                                    >
                                        <AllNFTsElement element={item} />s
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ViewNft;
