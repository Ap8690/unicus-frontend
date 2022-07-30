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
        <input
          className="input-box"
          title="Privacy policy"
          placeholder="Enter Privacy policy"
          value={advances.privacyPolicy}
          onChange={(e) =>
            setAdvance({ ...advances, privacyPolicy: e.target.value })
          }
        />
        <input
          className="input-box"
          title="Terms & Conditions"
          placeholder="Enter Terms & Conditions"
          value={advances.terms}
          onChange={(e) => setAdvance({ ...advances, terms: e.target.value })}
        />
        <input
          title="About Us"
          placeholder="Enter About Us"
          value={advances.aboutUs}
          onChange={(e) => setAdvance({ ...advances, aboutUs: e.target.value })}
        />
        <input
          title="Creators"
          placeholder="Enter Creators"
          value={advances.creators}
          onChange={(e) =>
            setAdvance({ ...advances, creators: e.target.value })
          }
        />
      </div>
      <button className="btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default AdvancedCustom
