// Images
import { type } from "@testing-library/user-event/dist/type";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ethereum from "../../../assets/svgs/ethereum.svg";
import DefaultModal from "../../../components/modals/DefaultModal/DefaultModal";
import { bscChain, ethChain, tronChain } from "../../../config";
import { getChainSymbol } from "../../../utils/utils";
import { getCompleteDate } from "../../../utils/date";
// Element of data of activity table
const TableData = ({ activity }) => {
    const handleClick = () => {
        // logic for clearing activity here
    };
    return (
        <tr className="table-data">
            <td className="table-data-item-name">
                {activity?.nftType?.includes("image") ? (
                    <img
                        src={activity.cloudinaryUrl}
                        alt={activity.name}
                        style={{ width: "80px", marginRight: "15px" }}
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        style={{ width: "80px", marginRight: "15px" }}
                    >
                        <source
                            src={activity.cloudinaryUrl}
                            type={activity?.nftType}
                        />
                    </video>
                )}

                {activity.name}
            </td>
            {activity.startBid ? (
                <>
                    <td className="table-data-price">
                        <span className="eth-price">
                            <img src={ethereum} alt="Ethereum" />
                            {activity.startBid / 10 ** 18}
                        </span>
                        {/* <span className="dollar-price">${activity.priceDollar}</span> */}
                    </td>
                    <td className="table-data-fd">{activity.auctionType}</td>
                    <td className="table-data-exp">{activity.createdAt}</td>
                </>
            ) : (
                <>
                    <td className="table-data-exp">
                        {getChainSymbol(activity.chain)}
                    </td>
                    <td className="table-data-exp">
                        {activity?.createdAt &&
                            getCompleteDate(activity.createdAt)}
                    </td>
                </>
            )}
        </tr>
    );
};
const Table = ({ rows, columns }) => {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {columns.map((column: String, index: Number) => (
                            <th key={`tch${index}`}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.length > 0 ? (
                        rows.map((row: any, i: number) => (
                            <Link
                                to={`/nft/${row.chain}/${
                                    row.contractAddress
                                        ? row.contractAddress
                                        : row.nftId && row.nftId.contractAddress
                                }/${row.tokenId}`}
                            >
                                <TableData activity={row} key={`atd${i}`} />
                            </Link>
                        ))
                    ) : (
                        <div>No NFTs Found</div>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
