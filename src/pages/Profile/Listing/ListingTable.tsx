// Images
import ethereum from "../../../assets/svgs/ethereum.svg";

// Element of data of activity table
const TableData = ({ activity }) => {
  const handleClick = () => {
    // logic for clearing activity here
  };
  return (
    <tr className="table-data">
      <td className="table-data-item-name">
        <img src={activity.image} alt={activity.item} />
        {activity.item}
      </td>
      <td className="table-data-price">
        <span className="eth-price">
          <img src={ethereum} alt="Ethereum" />
          {activity.priceEth}
        </span>
        <span className="dollar-price">${activity.priceDollar}</span>
      </td>
      <td className="table-data-fd">{activity.fd}</td>
      <td className="table-data-exp">{activity.exp}</td>
      <button className="clear-listing" onClick={handleClick}>
        X
      </button>
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
            <TableData activity={row} key={`atd${i}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
