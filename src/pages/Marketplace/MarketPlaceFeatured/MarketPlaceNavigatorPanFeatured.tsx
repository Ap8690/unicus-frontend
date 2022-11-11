// Custom Hook
import { useNavigate } from "react-router-dom";
import { getNftContractAddress } from "../../../utils/utils";
import useExplorer from "../useExplorer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import NftSkeletonLoader from "../../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import uuid from "react-uuid";
import ImageVideo from "../../../components/Image-Video/Image-Video"

const Element = ({ element }) => 
{
return (

    <div className="market-place-featured-element">
        <div className="nft-image-size"> 
            {/* <img src={element.cloudinaryUrl} alt={element.heading} /> */}
            
            {!(element.nftType?.includes("video")) ? (
                <img src={element.cloudinaryUrl} alt="" className="nft-img  cursor-pointer hover:scale-110 ease-in duration-200" />
            ) : (
                <video controls className="nft-img flex justify-center items-center h-full  cursor-pointer hover:scale-110 ease-in duration-200">
                    <source src={element.cloudinaryUrl} type={element.nftType} />
                </video>
            )}
        </div>
        <h3 className="heading">
            {element.heading?.length > 15
                ? element.heading?.slice(0, 15)
                : element.heading}
        </h3>
        <p className="text text-center">{element.name}</p>
    </div>
);}
const MarketPlaceNavigatorPanFeatured = ({ list, currentScroll, loading }) => {
    // const holderRef = useExplorer(currentScroll);
    const navigate = useNavigate();
    return loading ? (
        <NftSkeletonLoader singleRow className="loader-margin" />
    ) : list && list.length > 0 ? (
        <Swiper
            modules={[Navigation, Pagination]}
            className="market-place-featured-elements"
            navigation={{
                prevEl: "#featured-nav-left",
                nextEl: "#featured-nav-right",
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            }}
        >
            {list.map((element: any, i: number) => (
                <SwiperSlide
                    key={uuid()}
                    onClick={() =>
                        navigate(
                            `/nft/${element.chain}/${getNftContractAddress(
                                element,"721"
                            )}/${element.tokenId}`
                        )
                    }
                >
                    <Element key={uuid()} element={element} />
                </SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <div className="min-h-[300px] text-xl font-bold flex justify-center items-center">
            No Assets Found
        </div>
    );
};
export default MarketPlaceNavigatorPanFeatured;
