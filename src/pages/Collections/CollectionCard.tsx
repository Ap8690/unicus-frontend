import userImg from "../../assets/images/Rectangle 8 (1).png";
import bannerImg from "../../assets/images/allNFTImage.png";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/api/supplier";

const CollectionCard = ({ element }) => {
    const [user, setUser] = useState("");
    const getUserName = async () => {
        const res = await getUserById(element.owner);
        setUser(res.data.user.username)
    };
    useEffect(() => {
        getUserName();
    }, []);
    return (
        <div className="market-place-trending-element">
            <div className="nft-image-size">
                {element.bannerUrl ? (
                    <img src={element.bannerUrl} alt={element.name} />
                ) : (
                    <img src={bannerImg} alt={"collection-banner"} />
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
                            {user.length > 12
                                ? user.slice(0, 12) + "..."
                                : user}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;