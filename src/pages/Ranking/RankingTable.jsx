// Images
import ethereum from "../../assets/svgs/ethereum.svg";

// Ranking Table Data
const RankingTableData = ({ item, i }) => {
  return (
    <tr>
      <td>
        {i + 1}{" "}
        <img
          src={item.image}
          alt={item.collection}
          className="collection-image"
        />
        {item.collection}
      </td>
      <td>
        <img
          src={ethereum}
          alt="ethereum"
          style={{
            position: "relative",
            bottom: "0.1rem",
            verticalAlign: "middle",
          }}
        />
        {item.volume}
      </td>
      <td className={item.h24 < 0 ? "red" : "green"}>{item.h24}%</td>
      <td className={item.d7 < 0 ? "red" : "green"}>{item.d7}%</td>
      <td>
        <img
          src={ethereum}
          alt="ethereum"
          style={{
            position: "relative",
            bottom: "0.1rem",
            verticalAlign: "middle",
          }}
        />
        {item.floorPrice}
      </td>
      <td>{item.owners}K</td>
      <td>{item.assets}K</td>
    </tr>
  );
};
// Ranking Table
const RankingTable = ({ items, currRangeStart }) => {
  return (
    <div className="ranking-table">
      <table>
        <thead>
          <tr>
            <th>Collection</th>
            <th>Volume</th>
            <th>24h%</th>
            <th>7d%</th>
            <th>Floor Price</th>
            <th>Owners</th>
            <th>Assets</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <RankingTableData
              item={item}
              key={item.id}
              i={currRangeStart + i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
