// Image
import messageImg from "../../assets/svgs/message-sent.svg";
import {useState,useEffect} from 'react';
// Components
import InputBordered from "../InputBordered/InputBordered";
import isEmail from 'validator/lib/isEmail';
import {subscribeEmail} from "../../services/api/supplier";
import { toast } from "react-hot-toast";
import {getUserInfo} from "../../utils/utils";

const StayInLoop = () => {
  const [email,setEmail] = useState('')
  const [enabled,setEnabled] = useState(false)
  const updateEmail = async (e:any) => {
    try {
      e.preventDefault()
      if(!getUserInfo()) return toast.error("Please login!")
      const updateEmail = await subscribeEmail(email);
      toast.success("Email subsciption successfull.")
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(isEmail(email)) {
      setEnabled(true)
    }
    else setEnabled(false)
  },[email])
  return (
    <div className="stay-in-loop">
      <div>
        <h2>Stay in Loop</h2>
        <span className="my-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare
          ut lobortis sit erat morbi.
        </span>
        <form className="inputs">
          <InputBordered state={email} setState={setEmail} placeholder={"Email"} />
          <button disabled={!enabled} onClick={updateEmail} className={enabled ? "btn mt-2 w-[40px]" : "btn mt-2 w-[40px] opacity-50"}>Subscribe</button>
        </form>
      </div>
      <img src={messageImg} alt="stay in touch" />
    </div>
  );
};

export default StayInLoop;
