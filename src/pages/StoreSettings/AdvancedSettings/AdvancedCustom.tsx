import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import Input from "../../../components/Input/Input"
import { BASE_URL } from "../../../config";
import { IAdvance } from "../../../models/Advance";

const AdvancedCustom = (advance: IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/advance`, advances);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="advanced-supported">
      <div className="large-text">
        You can add texts with html tags for formatting purposes.
      </div>
      <div className="inputs">
        <Input
          className="input-box"
          title="Privacy policy"
          placeholder="Enter Privacy policy"
          set={advances.privacyPolicy}
          setState={(e) => setAdvance({ ...advances, privacyPolicy: e })}
          multi
        />
        <Input
          className="input-box"
          title="Terms & Conditions"
          placeholder="Enter Terms & Conditions"
          set={advances.terms}
          setState={(e) => setAdvance({ ...advances, terms: e })}
          multi
        />
        <Input
          title="About Us"
          placeholder="Enter About Us"
          set={advances.aboutUs}
          setState={(e) => setAdvance({ ...advances, aboutUs: e })}
          multi
        />
        <Input
          title="Creators"
          placeholder="Enter Creators"
          set={advances.creators}
          setState={(e) => setAdvance({ ...advances, creators: e })}
          multi
        />
      </div>
      <button className="btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default AdvancedCustom
