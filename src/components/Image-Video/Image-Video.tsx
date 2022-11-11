
const ImageVideo = ({ nftType, img }) => {
    //console.log("nftType: ", nftType);
    return (
        <div className="explore-element-item-image">
            {!(nftType?.includes("video")) ? (
                <img src={img} alt="" className="nft-img  cursor-pointer hover:scale-110 ease-in duration-200" />
            ) : (
                <video controls className="nft-img flex justify-center items-center h-full  cursor-pointer hover:scale-110 ease-in duration-200">
                    <source src={img} type={nftType} />
                </video>
            )}
        </div>
    );
};

export default ImageVideo;
