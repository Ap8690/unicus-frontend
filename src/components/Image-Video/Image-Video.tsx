
const ImageVideo = ({ nftType, img }) => {
    console.log("nftType: ", nftType);
    return (
        <div className="explore-element-item-image">
            {!(nftType?.includes("video")) ? (
                <img src={img} alt="" className="nft-img" />
            ) : (
                <video controls className="nft-img flex justify-center items-center h-full">
                    <source src={img} type={nftType} />
                </video>
            )}
        </div>
    );
};

export default ImageVideo;
