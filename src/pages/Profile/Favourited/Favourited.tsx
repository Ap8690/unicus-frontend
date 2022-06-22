import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const Item = ({ item }): ReactJSXElement => {
  return (
    <div className="item">
      <img src={item.image} alt={item.title} />
      <h3 className="item-heading">{item.title}</h3>
      <p className="item-text">{item.text}</p>
    </div>
  );
};

const Favourited = ({ items }): ReactJSXElement => {
  return (
    <div className="favourited">
      {items.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
};

export default Favourited;
