import { Link } from "react-router-dom";
import { getDecimal } from "../../utils/helpers";
import { getChainSymbol, getNftContractAddress } from "../../utils/utils";
import uuid from "react-uuid";

const ExploreElement = ({ element }) => {
    return (
        <Link
            to={{
                pathname: `/nft/${element.chain}/${getNftContractAddress(
                    element.nftId
                )}/${element.tokenId}`,
            }}
        >
            <div className="explore-element">
                <div className="explore-element-item-image">
                    <img src={element.cloudinaryUrl} alt={element.name} />
                </div>

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

const ExploreElements = ({ elements }) => {
    return (
        <div className="explore-elements">
            {elements.map((element: any) => (
                <ExploreElement key={uuid()} element={element} />
            ))}
        </div>
    );
};

export default ExploreElements;
