import { Skeleton } from "@mui/material"

const ExploreLoader = () => {
    return (
        <div className="explore-elements">
            <LoaderCard />
            <LoaderCard />
            <LoaderCard />
            <LoaderCard />
            <LoaderCard />
            <LoaderCard />
        </div>
    )
}

const LoaderCard = () => {
    return (
        <div className="explore-element">
            <div className="explore-element-item-image">
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px",
                        bgcolor: "#66666666",
                    }}
                />
            </div>
            <div className="explore-element-name">
                <Skeleton
                    sx={{
                        bgcolor: "#66666666",
                        fontSize: "20px",
                    }}
                />
            </div>
            <div className="explore-element-price">
                <Skeleton
                    sx={{
                        bgcolor: "#66666666",
                        fontSize: "20px",
                    }}
                />
            </div>
        </div>
    )
}

export default ExploreLoader
