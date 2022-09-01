
const ImageVideo = ({ nftType, img }) => {
    return (
        <div className="explore-element-item-image">
            {!(nftType?.includes("video")) ? (
                <img src={img} alt="" className="nft-img" />
            ) : (
                <video autoPlay loop className="nft-img">
                    <source src={img} type={nftType} />
                </video>
            )}
        </div>
    );
};

export default ImageVideo;
