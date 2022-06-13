// Image
import messageImg from "../../assets/svgs/message-sent.svg";

// Components
import InputBordered from "../InputBordered/InputBordered";

const StayInLoop = () => {
  return (
    <div className="stay-in-loop">
      <div>
        <h2>Stay in Loop</h2>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare
          ut lobortis sit erat morbi.
        </span>
        <form className="inputs">
          <InputBordered placeholder={"Email"} />
          <button className="btn">Subscribe</button>
        </form>
      </div>
      <img src={messageImg} alt="stay in touch" />
    </div>
  );
};

export default StayInLoop;
