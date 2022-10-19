import { useNavigate } from "react-router-dom";
import { getChainLogo, getChainSymbol } from "../../../utils/utils";
import { getSimpleDate } from "../../../utils/date";
import uuid from "react-uuid";
import { Skeleton } from "@mui/material";
import { getDecimal } from "../../../utils/helpers";
import Pagination from "@mui/material/Pagination";

// Element of data of activity table
const TableData = ({ activity, link }) => {
    //console.log("activity: ", activity);
    let navigate = useNavigate();

    return (
        <tr
            className="table-data cursor-pointer pb-6"
            onClick={() => navigate(link)}
        >
            <td className="table-data-item-name">
                {activity.hasOwnProperty("nftId") ? (
                    activity &&
                    activity?.nftId &&
                    activity?.nftId.nftType?.match(/image/) ? (
                        <img
                            src={activity.cloudinaryUrl}
                            alt={activity.name}
                            className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md"
                        />
                    ) : (
                        <video
                            controls
                            className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md"
                        >
                            <source
                                src={activity.cloudinaryUrl}
                                type={activity && activity?.nftType}
                            />
                        </video>
                    )
                ) : activity &&
                  activity.hasOwnProperty("nftType") &&
                  activity?.nftType?.match(/image/) ? (
                    <img
                        src={activity.cloudinaryUrl}
                        alt={activity.name}
                        className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md"
                    />
                ) : (
                    <video
                        controls
                        className="w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md"
                    >
                        <source
                            src={activity.cloudinaryUrl}
                            type={activity && activity?.nftType}
                        />
                    </video>
                )}

                {activity.name}
            </td>
            {activity.startBid ? (
                <>
                    <td className="table-data-price ">
                        <span className="eth-price ">
                            <img
                                className="w-[23px] mr-2"
                                src={getChainLogo(activity.chain)}
                                alt="Ethereum"
                            />
                            <span className="flex justify-center items-center">
                                {activity.startBid / getDecimal(activity.chain)}
                            </span>
                        </span>
                        {/* <span className="dollar-price">${activity.priceDollar}</span> */}
                    </td>
                    <td className="table-data-fd">{activity.auctionType}</td>
                    <td className="table-data-exp">
                        {activity.createdAt &&
                            getSimpleDate(activity.createdAt)}
                    </td>
                </>
            ) : (
                <>
                    <td className="table-data-exp">
                        {getChainSymbol(activity.chain)}
                    </td>
                    {activity?.nftStatus == 1 ? (
                        <td>
                            {activity?.uploadedBy &&
                            activity?.uploadedBy ===
                                JSON.parse(localStorage.getItem("userInfo"))
                                    ?._id
                                ? "Minted"
                                : "Purchased"}
                        </td>
                    ) : (
                        <td>
                            {activity?.nftStatus == 2
                                ? "On Sale"
                                : activity?.nftStatus == 3 && "On Auction"}
                        </td>
                    )}
                    <td className="table-data-exp">
                        {activity?.createdAt &&
                            getSimpleDate(activity.createdAt)}
                    </td>
                </>
            )}
        </tr>
    );
};
const Table = ({ rows, columns, loading, page, setPage, metadata }) => {
    //console.log("metadata: ", metadata);
    return (
        <div className="table">
            <table>
                <thead className="tableHeadBorder">
                    <tr>
                        {columns.map((column: String, index: Number) => (
                            <th key={`${column}${index}`}>{column}</th>
                        ))}
                    </tr>
                </thead>
                {loading ? (
                    <tbody>
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                        <NftTableLoad columns={columns} />
                    </tbody>
                ) : (
                    <tbody>
                        {rows && rows.length > 0 ? (
                            rows
                                .map((row: any, i: number) => (
                                    <TableData
                                        link={`/nft/${row.chain}/${
                                            row.contractAddress
                                                ? row.contractAddress
                                                : row.nftId &&
                                                  row.nftId.contractAddress
                                        }/${row.tokenId}/${row?._id}`}
                                        activity={row}
                                        key={uuid()}
                                    />
                                ))
                               
                        ) : (
                            <tr>
                                <td>No Assets Found</td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
            <Pagination
                count={Math.ceil(
                    Number(metadata?.total) / Number(metadata?.limit)
                )}
                defaultPage={page}
                page={page}
                onChange={(e: any, v: any) => setPage(v)}
                color="primary"
                sx={{ button: { color: "#ffffff" } }}
            />
        </div>
    );
};

const NftTableLoad = ({ columns }: any) => {
    return (
        <tr className="table-data cursor-pointer pb-6">
            <td className="table-data-item-name">
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "20px",
                        bgcolor: "#66666666",
                    }}
                />
                <Skeleton
                    sx={{
                        bgcolor: "#66666666",
                        fontSize: "20px",
                    }}
                />
            </td>
            {columns
                .map((item: any, i: any) => {
                    if (i === columns.length - 2) return;
                    return (
                        <td key={item + i}>
                            <Skeleton
                                sx={{
                                    bgcolor: "#66666666",
                                    fontSize: "20px",
                                }}
                            />
                        </td>
                    );
                })
                .reverse()}
        </tr>
    );
};

export default Table;
