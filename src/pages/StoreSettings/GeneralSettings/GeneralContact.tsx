import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import Input from "../../../components/Input/Input"
import { IGeneral } from "../../../models/General";
import { saveGenerals } from "../../../services/api/supplier";
import { IOSSwitch } from "./GeneralBasic"

const GeneralContact = (general: IGeneral) => {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [enableContact, setEnableContact] = useState(true);
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({});
  
  useEffect(() => {
    setGeneral(general);
  }, [general]);

  const handleChange = (title, e) => {
    setGeneral({ ...generals, [title]: e });
  };
  const handleSave = async () => {
    try {
      const res = await saveGenerals(generals);
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
    <div className="general-contact">
      <Input
        title="Contact Number"
        placeholder="Enter Contact Number"
        state={contactNumber}
        number
        setState={(e) => handleChange("phone", e)}
      />
      <Input
        title="Email"
        placeholder="Enter Email"
        state={email}
        setState={(e) => handleChange("contactEmail", e)}
      />
      <Input
        title="Address"
        placeholder="Enter Address"
        state={email}
        setState={(e) => handleChange("address", e)}
        multi
      />
      {/* <div className="title-tog">Toggle Settings</div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={enableContact}
          onChange={(e: any) => setEnableContact(e.target.checked)}
        />
        <div className="terms">
          <span className="large-text">Contact Us</span>
          <span>Turn this on/off to show/hide the contact us section</span>
        </div>
      </div> */}
      <button className="btn" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default GeneralContact
