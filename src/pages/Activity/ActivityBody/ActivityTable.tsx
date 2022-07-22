// Images
import shoppingCart from "../../../assets/svgs/shoppingCart.svg";
import transfer from "../../../assets/svgs/transfer.svg";
import list from "../../../assets/svgs/list.svg";
import ethereum from "../../../assets/svgs/ethereum.svg";
import { useEffect, useState } from "react";

// Util Function
const getImage = (type) => {
  switch (true) {
    case type === "sale" || type === "minted":
      return shoppingCart;
    case type === "transfer":
      return transfer;
    default:
      return list;
  }
};

// Element of data of activity table
const ActivityTableData = ({ activity }) => {
  const smolActivityType = activity.type.toLowerCase();
  const image = getImage(smolActivityType);
  return (
    <tr className="activity-table-data">
      <td>
        <div className="activity-table-data-icon">
          <img src={image} alt={activity.type} />
          {activity.type}
        </div>
      </td>
      <td>
        <div className="activity-table-data-item-name">
          <img src={activity.image} alt={activity.item} />
          <div className="item-info">
            <span className="item-name">
              {activity.item}
            </span>
            <span className="item-name">
              {activity.creator}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="activity-table-data-price">
          <span className="mobile-only sale">sale</span>
          <span className="eth-price">
            <img src={ethereum} alt="Ethereum" />
            {activity.priceEth}
          </span>
          <span className="dollar-price">${activity.priceDollar}</span>
          <span className="mobile-only time">{activity.time}</span>
        </div>
      </td>
      <td className="activity-table-data-qty">{activity.qty}</td>
      <td className="activity-table-data-from">{activity.from}</td>
      <td className="activity-table-data-to">{activity.to}</td>
      <td className="activity-table-data-time">{activity.time}</td>
    </tr>
  );
};
const ActivityTable = ({ activities, search }) => {
  return (
    <div>
      <table className="activity-table">
        <thead>
          <tr>
            <th>Item</th>
            <th className="price">Price</th>
            <th className="activity-table-data-qty">Qty</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, i) => (
            <ActivityTableData activity={activity} key={`atd${i}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
