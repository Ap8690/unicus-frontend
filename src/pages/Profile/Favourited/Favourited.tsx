// Libs
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import uuid from "react-uuid";
import BlueBackground from "../../../components/BlueBackground/BlueBackground";

// Styles
import "./Favourited.scss";

// Types
type itemType = {
  image: string;
  eventName: string;
  eventDescription: string;
};

// Interfaces
interface itemInterface {
  item: itemType;
}

const Item = ({ item }: itemInterface): ReactJSXElement => {
  return (
    <div className="item">
      <div className="image-holder">
        <img src={item.image} alt={item.eventName} />
      </div>
      <h3 className="item-heading">{item.eventName}</h3>
      <p className="item-text">{item.eventDescription}</p>
    </div>
  );
};

const Favourited = ({ items }): ReactJSXElement => {
  return (
    <div className="favourited">
      <BlueBackground />
      {items.map((item: itemType) => (
        <Item item={item} key={uuid()} />
      ))}
    </div>
  );
};

export default Favourited;
