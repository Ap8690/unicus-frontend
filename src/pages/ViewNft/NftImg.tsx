import viewImg from "../../assets/svgs/views.svg";
import shareImg from "../../assets/svgs/share.svg";
import likesImg from "../../assets/svgs/likes.svg";
import flagImg from "../../assets/svgs/flag.svg";
import nftImg from "../../assets/images/marketPlaceMain.png";
import { ReactComponent as FiCopy } from "../../assets/react-icons/FiCopy.svg";
import "./viewnft.scss";
import { useState } from "react";
import ShareProfile from "../../components/modals/Share/Share";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import {
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
} from "react-share";
import { userInfo } from "../../utils/utils";
import useClipboard from "react-use-clipboard";

const NftImg = ({ img, likes, views, shares, nftType }) => {
    const [openShareProfile, setopenShareProfile] = useState(false);
    const [shareUrl, setshareUrl] = useState(window.location.href);
    const [title, settitle] = useState("");
    const [isCopied, setCopied] = useClipboard(window.location.href, {
        successDuration: 20000,
    });
    return (
        <div className="nft-img-box">
            <PlaceBid
                title={"Share NFT"}
                show={openShareProfile}
                handleClose={() => setopenShareProfile(false)}
                type={"success"}
            >
                <div
                    style={{
                        display: "flex!important",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=":: "
                        className="Demo__some-network__share-button mr-3 mb-3"
                    >
                        <WhatsappIcon size={42} round />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button mr-3"
                    >
                        <TwitterIcon size={42} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                        url={shareUrl}
                        className="Demo__some-network__share-button mr-3"
                    >
                        <LinkedinIcon size={42} round />
                    </LinkedinShareButton>
                    <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="Demo__some-network__share-button mr-3"
                    >
                        <FacebookIcon size={42} round />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton
                        url={shareUrl}
                        appId="521270401588372"
                        className="Demo__some-network__share-button mr-3"
                    >
                        <FacebookMessengerIcon size={42} round />
                    </FacebookMessengerShareButton>
                    <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <TelegramIcon size={42} round />
                    </TelegramShareButton>
                    {
                        <div className="user__id">
                            <p
                                onClick={setCopied}
                                className="txt__gray id"
                                style={{ overflow: "auto" }}
                            >
                                {window.location.href}
                                <span>
                                    <FiCopy />
                                </span>
                            </p>
                            <div className="toolt">
                                {isCopied ? "Copied" : "Copy"}
                            </div>
                        </div>
                    }
                </div>
            </PlaceBid>
            {!nftType?.includes("video") ? (
                <img src={img ? img : nftImg} alt="" className="nft-img" />
            ) : (
                <video
                    autoPlay
                    loop
                    className="nft-img"
                >
                    <source
                        src={img ? img : nftImg}
                        type={nftType}
                    />
                </video>
            )}
            <div className="nft-interactions">
                {/* <button>
                    {views} <img src={viewImg} alt="views" />
                </button> */}
                <button onClick={() => setopenShareProfile(true)}>
                    <img src={shareImg} alt="shares" />
                </button>
            </div>
        </div>
    );
};
export default NftImg;
