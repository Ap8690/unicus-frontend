// Images
import { type } from "@testing-library/user-event/dist/type";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ethereum from "../../../assets/svgs/ethereum.svg";
import DefaultModal from "../../../components/modals/DefaultModal/DefaultModal";
import { bscChain, ethChain, tronChain } from "../../../config";
import { getChainSymbol } from "../../../utils/utils";

// Element of data of activity table
const TableData = ({ activity }) => {
  const handleClick = () => {
    // logic for clearing activity here
  };
  return (
    <tr className="table-data">
      <td className="table-data-item-name">
        <img
          src={activity.cloudinaryUrl}
          alt={activity.name}
          style={{ width: "80px", marginRight: "15px" }}
        />
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
          <td className="table-data-exp">{getChainSymbol(activity.chain)}</td>
          <td className="table-data-exp">{activity.createdAt}</td>
        </>
      )}
      {/* <button className="clear-listing" onClick={handleClick}>
        X
      </button> */}
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
          {rows.map((row, i) => (
            <Link to={`/nft/${row.chain}/${row.contractAddress? row.contractAddress: row.nftId && row.nftId.contractAddress}/${row.tokenId}`}>
              <TableData activity={row} key={`atd${i}`} />
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
