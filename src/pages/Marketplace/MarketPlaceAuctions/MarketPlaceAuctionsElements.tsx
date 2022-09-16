// Libs
import { useEffect, useState } from "react";

// Some utils
import getTime from "./getTime";

// Images
import verified from "../../../assets/svgs/verified.svg";
import useExplorer from "../useExplorer";
import { useNavigate } from "react-router-dom";
import { getNftContractAddress } from "../../../utils/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import NftSkeletonLoader from "../../../components/Loading/SkeletonLoading/NftSkeletonLoader";
import uuid from "react-uuid";

const getTimeString = (days, hours, minutes) => {
  return `${days}d ${hours}h ${minutes}m`;
};

// Element for the list
const Element = ({ element, currentType }) => {
  // Need to keep updating time string as per clock
  // so need to use setInterval
  // const { days, hours, minutes } = getTime(new Date().getTime(), element.date);
  // const [timeString, setTimeString] = useState(
  //   getTimeString(days, hours, minutes)
  // );
  // useEffect(() => {
  //   // Check every second
  //   setInterval(() => {
  //     const { days, hours, minutes } = element.auctionTimer.getTime();
  //     setTimeString(getTimeString(days, hours, minutes));
  //   }, 1000);
  // }, []);
  return (
    <div className="market-place-auction-element">
      <div className="nft-image-size">
        <img src={element.cloudinaryUrl} alt={element.name} /></div>
      <h2 className="name">{element.name}</h2>
      <p className="seller-name">
        {element?.sellerInfo.length<10 ? element?.sellerInfo : element?.sellerInfo.slice(0,4) + "..." + element?.sellerInfo.slice(-6)}{" "}
        {element.ifVerified ? <img src={verified} alt="Verified" /> : null}
      </p>
      <div className="info">
        <span className="type">{currentType}</span>
        {/* {currentType == "live" && <span className="time">Ends in {element.auctionStartOn}</span>}
        {currentType == "upcoming" && <span className="time">Starts in {element.auctionStartOn}</span>} */}
      </div>
    </div>
  );
};

const MarketPlaceAuctionsElements = ({ list, currentScroll,currentType, loading }) => {
  // const holderRef = useExplorer(currentScroll);
  const navigate = useNavigate()
  return (
    loading ? (
      <NftSkeletonLoader singleRow className='loader-margin'/>
    ) : (
   list && list.length>0 ? <Swiper 
      modules={[Navigation, Pagination]}  
      className="market-place-auctions-elements"
      navigation={{
        prevEl: '#auction-nav-left',
        nextEl: '#auction-nav-right'
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
          onClick={()=>navigate(`/nft/${element.chain}/${getNftContractAddress(
              element
            )}/${element.tokenId}`,
      )}
        >
          <Element
            element={element}
            key={uuid()}
            currentType={currentType}
          />
        </SwiperSlide>
      ))}
    </Swiper> : <div className="min-h-[300px] text-xl font-bold flex justify-center items-center">No Nfts Found</div>

  ))
};

export default MarketPlaceAuctionsElements;
