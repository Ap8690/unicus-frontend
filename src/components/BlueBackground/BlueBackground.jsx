// Images
import blueEllipse from "../../assets/svgs/blueEllipse.svg";

// CSS
import "./BlueBackground.scss";

const BlueEllipse = ({ i }) => {
  const style = {
    top: `${i * 20}%`,
  };
  return <div className="background-particle-blue-ellipse" style={style}></div>;
};

const BlueBackground = () => {
  const blueEllipse = [];
  for (let i = 0; i < 8; ++i)
    blueEllipse.push(<BlueEllipse i={i} key={`bg${i}`} />);

  return <div className="blue-background-holder">{blueEllipse}</div>;
};

export default BlueBackground;
