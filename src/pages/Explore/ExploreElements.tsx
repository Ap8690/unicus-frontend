import { Link } from "react-router-dom";
import { getDecimal } from "../../utils/helpers";
import { getChainSymbol, getNftContractAddress } from "../../utils/utils";
import uuid from "react-uuid";
import ImageVideo from "../../components/Image-Video/Image-Video"

export const ExploreElement = ({ element }) => {
    return (
        <Link
            to={{
                pathname: `/nft/${element.chain}/${getNftContractAddress(
                    element.nftId
                )}/${element.tokenId}`,
            }}
        >
            <div className="explore-element">
                <ImageVideo img={element.cloudinaryUrl} nftType={element.nftId.nftType} />
                <div className="explore-element-name">{element.name}</div>
                <div className="explore-element-price">
                    {element && element.lastBid > 0
                        ? (element.lastBid / getDecimal(element.chain)).toFixed(
                              4
                          )
                        : (
                              element.startBid / getDecimal(element.chain)
                          ).toFixed(4)}{" "}
                    {getChainSymbol(element.chain)}
                </div>
                <div className="explore-element-creators"></div>
            </div>
        </Link>
    );
};

export const ExploreElements = ({ elements }) => {
    return (
        <div className="explore-elements">
            {elements.map((element: any) => (
                <ExploreElement key={uuid()} element={element} />
            ))}
        </div>
    );
};

export default ExploreElements;
