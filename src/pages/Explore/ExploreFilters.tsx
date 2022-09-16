import { capitalize } from "../../utils/helpers";
import uuid from "react-uuid";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const Filter = ({ filter, currentFilter, setCurrentFilter }) => {
    const onClick = (filter: any) => setCurrentFilter(filter);
    const className =
        filter.toLowerCase() === currentFilter.toLowerCase() ? " active" : "";
    return (
        <button
            className={"explore-filter" + className}
            onClick={() => onClick(filter)}
        >
            {capitalize(filter)}
        </button>
    );
};

const ExploreFilters = ({ filters, currentFilter, setCurrentFilter }) => {
    console.log("currentFilter: ", currentFilter);
    return (
        <div className="relative">
            <div className="explore-filters relative !overflow-hidden flex justify-between z-20">
                <div className="cursor-pointer" id="exploreNavigation-left">
                    <ChevronLeftRoundedIcon />
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    navigation={{
                        prevEl: "#exploreNavigation-left",
                        nextEl: "#exploreNavigation-right",
                    }}
                    modules={[FreeMode, Navigation]}
                    // className="w-fit min-w-min"
                >
                    {filters.map((filter: any, i: number) => (
                        <SwiperSlide key={uuid()} className="!w-auto swiper-slide">
                            <Filter
                                filter={filter}
                                setCurrentFilter={setCurrentFilter}
                                currentFilter={currentFilter}
                                key={uuid()}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="cursor-pointer" id="exploreNavigation-right">
                    <ChevronRightRoundedIcon />
                </div>
            </div>
            <div className="bottom-filter-border"></div>
        </div>
    );
};

export default ExploreFilters;
