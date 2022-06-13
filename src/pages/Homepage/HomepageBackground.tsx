// Background Images
import looper from "../../assets/svgs/looper.svg";
import looperRoadMap from "../../assets/svgs/looperRoadMap.svg";
import looperRoadMap2 from "../../assets/svgs/looperRoadMap2.svg";
import bg1 from "../../assets/svgs/bg1.svg";
import bg2 from "../../assets/svgs/bg2.svg";
import bg3 from "../../assets/svgs/bg3.svg";
import bg4 from "../../assets/svgs/bg4.svg";
import bg5 from "../../assets/svgs/bg5.svg";
import bg6 from "../../assets/svgs/bg6.svg";

const HomepageBackground = () => {
  return (
    <>
      <img
        src={bg1}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={bg2}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={bg3}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={bg4}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={bg5}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={bg6}
        alt="background particle"
        className="background-particle"
      />
      <img
        src={looper}
        alt="Background Looper"
        className="background-particle-looper"
      />
      <img
        src={looperRoadMap}
        alt="background looper"
        className="background-particle-looper"
      />
      <img
        src={looperRoadMap2}
        alt="background looper"
        className="background-particle-looper"
      />
    </>
  );
};


export default HomepageBackground