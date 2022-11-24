import userImg from "../../assets/images/Rectangle 8 (1).png";
import bannerImg from "../../assets/images/allNFTImage.png";
import {useNavigate} from 'react-router';
import {trimString} from "../../utils/utils";

const CollectionCard = ({ element }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/collection/${element._id}`)} className="market-place-trending-element hover:cursor-pointer">
            <div className="nft-image-size">
                {element.bannerUrl ? (
                    <img className="cursor-pointer hover:scale-110 ease-in duration-200" src={element.bannerUrl} alt={element.name} />
                ) : (
                    <img className="cursor-pointer hover:scale-110 ease-in duration-200" src={bannerImg} alt={"collection-banner"} />
                )}
            </div>
            <div className="info">
                {element.logoUrl ? (
                    <img
                        src={element.logoUrl}
                        alt={element.collectionName}
                        className="creator-image"
                        
                    />
                ) : (
                    <img
                        src={userImg}
                        alt={"collection"}
                        className="creator-image"
                    />
                )}
                <div className="info-text">
                    <h3 className="heading">
                        {element?.collectionName.length > 15
                            ? element?.collectionName.slice(0, 15) + "..."
                            : element?.collectionName}
                    </h3>
                    <p className="credit">
                        By{" "}
                        <span className="creator-name">
                            {element.owner && trimString(element.owner.wallets[0])}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;
