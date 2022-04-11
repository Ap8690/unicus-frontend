import { ReactComponent as BsFillHandbagFill } from "../../../Assets/react-icons/BsFillHandbagFill.svg";
import { ReactComponent as AiFillEye } from "../../../Assets/react-icons/AiFillEye.svg";
import { AuctionCardProps } from "./AuctionCard";
// svg
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNftType } from "../../../Redux/Profile/actions";
import ViewModal from "../../Modals/ViewModal/ViewModal";
import { ethChain, polygonChain } from "../../../config";

const NFTCardAuctions = ({ item }: AuctionCardProps) => {
    const { walletType, networkID, userAddress, userInfo } = useSelector(
        (state: any) => state.profile
    );

    // redux state
    const dispatch = useDispatch();
    const [done, setDone] = useState(false);
    const [time, setTime] = useState<any>(0);
    const [price, setprice] = useState("");
    const [contractAddress, setcontractAddress] = useState("");
    const [viewModal, setviewModal] = useState(false);
    const [projectLoaded, setprojectLoaded] = useState(false);

    useEffect(() => {
        if (networkID === ethChain) {
            setprice("Eth");
        } else if (networkID === polygonChain) {
            setprice("Matic");
        } else {
            setprice("BNB");
        }
    }, []);

    useEffect(() => {
        if (item.chain == 56) {
            setcontractAddress("0x2f376c69feEC2a4cbb17a001EdB862573898E95a");
        } else if (item.chain == 1) {
            setcontractAddress("0x424bb7731c056a52b45CBD613Ef08c69c628735f");
        } else if (item.chain == 137) {
            setcontractAddress("0x1549EabD2a47762413ee1A11e667E67A5825ff44");
        } 
        // else if (item.chain == 97) {
        //     setcontractAddress("0x451853f88ec565F04F40d74DBbC45C9C8Ff32793");
        // }
    }, []);
    useEffect(() => {
        console.log("contract address ", contractAddress);
        console.log("chain ", item.chain);
    }, [contractAddress]);

    useEffect(() => {
        if (time?.timeleft > 0) {
            setDone(false);
        }
    }, [time]);

    return (
        <>
            <div className={projectLoaded ? "nft_card" : "nft_card loading"}>
                <Link
                    to={{
                        pathname: `/auction/${item.chain}/${contractAddress}/${item.tokenId}`,
                    }}
                >
                    <div className="nft_card_image_wrapper">
                        {!projectLoaded &&
                            item.cloudinaryUrl.split(".").pop() !== "mp4" && (
                                <div className="nft_card_image skeleton"></div>
                            )}
                        {
                            <div
                                className="nft_card_image"
                                style={
                                    projectLoaded &&
                                    item.cloudinaryUrl.split(".").pop() !==
                                        "mp4"
                                        ? {}
                                        : { display: "none" }
                                }
                            >
                                <img
                                    src={item.cloudinaryUrl}
                                    onLoad={() => setprojectLoaded(true)}
                                    alt={item.name}
                                />
                            </div>
                        }
                        {item.cloudinaryUrl.split(".").pop() == "mp4" && (
                            <div className="nft_card_image">
                                <video width="100%" autoPlay loop>
                                    <source
                                        src={item.cloudinaryUrl}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        )}
                    </div>
                </Link>
                <h6 title={item?.name}>{item?.name}</h6>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        marginTop: "-0.25rem",
                    }}
                >
                    <h6>
                        {item && item?.lastBid
                            ? (item?.lastBid / Math.pow(10, 18)).toFixed(4)
                            : (item?.startBid / Math.pow(10, 18)).toFixed(
                                  4
                              )}{" "}
                        {price}
                    </h6>
                    <span
                        className="hover"
                        onClick={() => setviewModal(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "7px",
                        }}
                    >
                        <AiFillEye /> {item.views}
                    </span>
                </div>
                <Link
                    to={{
                        pathname: `/auction/${item.chain}/${contractAddress}/${item.tokenId}`,
                    }}
                >
                    <div>
                        <button
                            onClick={() => dispatch(getNftType(1))}
                            className="btn_brand"
                        >
                            <BsFillHandbagFill />
                            {item.sellerInfo === userInfo.username
                                ? "End Auction"
                                : "Place a Bid"}
                        </button>
                    </div>
                </Link>
            </div>
            <ViewModal
                show={viewModal}
                handleClose={() => setviewModal(false)}
                nftId={item.nftId}
            />
        </>
    );
};

export default NFTCardAuctions;
