import { Link, Navigate, useNavigate } from "react-router-dom";
import ethereum from "../../../assets/svgs/ethereum.svg";
import DefaultModal from "../../../components/modals/DefaultModal/DefaultModal";
import { bscChain, ethChain, tronChain } from "../../../config";
import { getChainSymbol } from "../../../utils/utils";
import { getCompleteDate } from "../../../utils/date";
import uuid from "react-uuid";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
// Element of data of activity table
const TableData = ({ activity, link }) => {
    let navigate = useNavigate();

    return (
        <tr
            className="table-data cursor-pointer pb-6"
            onClick={() => navigate(link)}
        >
            <td className="table-data-item-name">
                {activity.hasOwnProperty('nftId') ? ( activity?.nftId.nftType?.match(/image/) ? (
                    <img
                        src={activity.cloudinaryUrl}
                        alt={activity.name}
                        className='w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md'
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        className='w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md'
                    >
                        <source
                            src={activity.cloudinaryUrl}
                            type={activity?.nftType}
                        />
                    </video>
                ))
                : activity.hasOwnProperty('nftType') && activity?.nftType?.match(/image/) ? (
                    <img
                        src={activity.cloudinaryUrl}
                        alt={activity.name}
                        className='w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md'
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        className='w-[80px] h-[80px] min-w-[80px] min-h-[80px] overflow-hidden object-cover mr-4 rounded-md'
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
const Table = ({ rows, columns, loading }) => {
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
                {loading 
                ? <tbody>
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
                        {columns.map((item, i)=>{
                            if(i === columns.length - 2) return
                            return(
                                <td key={item+i}>
                                    <Skeleton
                                        sx={{
                                            bgcolor: "#66666666",
                                            fontSize: "20px",
                                        }}
                                    />
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
                : <tbody>
                    {rows && rows.length > 0 ? (
                        rows.map((row: any, i: number) => (
                            <TableData
                                link={`/nft/${row.chain}/${
                                    row.contractAddress
                                        ? row.contractAddress
                                        : row.nftId && row.nftId.contractAddress
                                }/${row.tokenId}`}
                                activity={row}
                                key={uuid()}
                            />
                        ))
                    ) : (
                        <tr>
                            <td>No NFTs Found</td>
                        </tr>
                    )}
                </tbody>
                }
            </table>
        </div>
    );
};

export default Table;
