// Custom Hook
import useExplorer from "../useExplorer";
import userImg from "../../../assets/images/Rectangle 8 (1).png";
import { useNavigate } from "react-router-dom";
import { getNftContractAddress } from "../../../utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import NftSkeletonLoader from "../../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import uuid from "react-uuid";

const Element = ({ element }) => {
    return (
        <div className="market-place-trending-element">
            <div className="nft-image-size">
                <img src={element.cloudinaryUrl} alt={element.name} />
            </div>
            <div className="info">
                <img
                    src={userImg}
                    alt={element.userInfo}
                    className="creator-image"
                />
                <div className="info-text">
                    <h3 className="heading">
                        {element?.name.length > 15
                            ? element?.name.slice(0, 15) + "..."
                            : element?.name}
                    </h3>
                    <p className="credit">
                        By{" "}
                        <span className="creator-name">
                            {element.userInfo
                                ? element?.userInfo.slice(0, 9)
                                : element?.owner.slice(0, 9)}
                            ...
                        </span>
                    </p>
                </div>
            </div>
            <div className="text text-center">
                {element?.description.length > 36
                    ? element?.description.slice(0, 35)
                    : element?.description}
                ...
            </div>
        </div>
    );
};
const MarketPlaceTrendingElements = ({
    list,
    currentScroll,
    loading,
}: {
    list: any[];
    currentScroll: number;
    loading: boolean;
}) => {
    // const holderRef = useExplorer(currentScroll);
    const navigate = useNavigate();
    return loading ? (
        <NftSkeletonLoader singleRow className="loader-margin" />
    ) : (
        <Swiper
            modules={[Navigation, Pagination]}
            className="market-place-trending-elements"
            navigation={{
                prevEl: "#trending-nav-left",
                nextEl: "#trending-nav-right",
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
            // pagination={{ clickable: true }}
        >
            {list.map((element: any, i: number) => (
                <SwiperSlide
                    key={uuid()}
                    onClick={() =>
                        navigate(
                            `/nft/${element.chain}/${getNftContractAddress(
                                element
                            )}/${element.tokenId}`
                        )
                    }
                >
                    <Element element={element} key={uuid()} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MarketPlaceTrendingElements;
