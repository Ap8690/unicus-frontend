// Custom Hook
import { useNavigate } from "react-router-dom";
import { getNftContractAddress } from "../../../utils/utils";
import useExplorer from "../useExplorer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import uuid from 'react-uuid'

const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <div className="nft-image-size">
      <img src={element.cloudinaryUrl} alt={element.heading} />
    </div>
    <h3 className="heading">{element.heading?.length > 15 ? element.heading?.slice(0,15) : element.heading}</h3>
    <p className="text text-center">{element.name}</p>
  </div> 
);
const MarketPlaceNavigatorPanFeatured = ({ list, currentScroll }) => {
  // const holderRef = useExplorer(currentScroll);
  const navigate = useNavigate()
  return (
    <Swiper 
      modules={[Navigation, Pagination]}  
      className="market-place-featured-elements"
      navigation={{
        prevEl: '#featured-nav-left',
        nextEl: '#featured-nav-right'
      }}
      breakpoints={{
        320: {
            slidesPerView: 1,
        },
        900: {
            slidesPerView: 2,
        },
        1250: {
            slidesPerView: 3,
        },
    }}
    >
      {list.map((element: any, i: number) => (
        <SwiperSlide
        key={uuid()}
          onClick={()=>navigate(`/nft/${element.chain}/${getNftContractAddress(
              element
            )}/${element.tokenId}`,
      )}
        >
          <Element key={`mpfe${i}`} element={element} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MarketPlaceNavigatorPanFeatured;
