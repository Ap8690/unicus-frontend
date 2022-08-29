import "./viewnft.scss";

import { Link, useParams } from "react-router-dom";
import nftImg from "../../assets/images/marketPlaceMain.png";
import NftImg from "./NftImg";
import NftInfo from "./NftInfo";
import { useEffect, useState } from "react";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import { AllNFTsElement } from "../AllNFTs/AllNFTsBody/AllNFTsElements";
import { getNftByCollection, getNftById } from "../../services/api/supplier";
import PageLoader from "../../components/Loading/PageLoader";

const filters = ["History", "Properties"];

const topBid = {
    img: nftImg,
    name: "Richard Alpert",
    bid: "2.45",
};
const ViewNft = () => {
    const [activeFilter, setActiveFilter] = useState(filters[0]);
    const [placeBidModal, setPlaceBidModal] = useState(false);
    const [currentLoaded, setCurrentLoaded] = useState(10);
    const [nft, setNft] = useState<any>();
    const [auction, setAuction] = useState("");
    const [nftImg, setNftImg] = useState("");
    const [creator, setCreator] = useState("");
    const [nftStates, setNftStates] = useState<any>();
    const [nftLoading, setNftLoading] = useState<boolean>(false);
    const [nftByCollection, setNftByCollection] = useState<any>();
    const { chain, contractAddress, nftId } = useParams();
    const handleClose = () => setPlaceBidModal(false);

    async function fetchItem() {
        try {
            console.log(chain, contractAddress, nftId);
            setNftLoading(true);
            const res = await getNftById(chain, contractAddress, nftId);
            const resData = await res.data.nft;
            console.log(res, "res");
            

            setNft(resData);
            setNftStates(res.data.nftStates);
            setAuction(res.data.auction);
            setNftImg(res.data.nft.cloudinaryUrl);
            setCreator(res.data.user);
            if (resData.collectionName) {
                const col = await getNftByCollection(resData.collectionName);
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
                    <div className="nft">
                        <NftImg
                            img={nftImg}
                            likes={7}
                            shares={22}
                            views={nft && nft.views ? nft.views : 0}
                        />
                        {nft && (
                            <NftInfo
                                filters={filters}
                                creator={creator}
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter}
                                historyData={nftStates}
                                topBid={topBid}
                                nft={nft}
                                auction={auction}
                                setNftLoading={setNftLoading}
                            />
                        )}
                    </div>
                    {nft && nft?.collectionName && (
                        <div className="nft bottom-grid">
                            <h1>More from this collection</h1>
                            <div>
                                {nftByCollection && nftByCollection.map((item: any) => (
                                    <Link
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
