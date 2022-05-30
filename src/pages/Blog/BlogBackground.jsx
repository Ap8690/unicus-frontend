import bg1 from "../../assets/svgs/bg4.svg";
import bg2 from "../../assets/svgs/bg3.svg";
import bg3 from "../../assets/svgs/bg7.svg";
import bg4 from "../../assets/svgs/bg6.svg";

const BlogBackground = () => {
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
    </>
  );
};

export default BlogBackground;
