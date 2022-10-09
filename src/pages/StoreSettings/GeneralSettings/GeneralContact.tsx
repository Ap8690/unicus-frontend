import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

import Input from "../../../components/Input/Input";
import { IGeneral } from "../../../models/General";
import { saveGenerals } from "../../../services/api/supplier";
import { IOSSwitch } from "./GeneralBasic";
import PageLoader from "../../../components/Loading/PageLoader";

const GeneralContact = (general: IGeneral) => {
    const [contactNumber, setContactNumber] = useState(general?.phone);
    const [email, setEmail] = useState(general?.contactEmail);
    const [contactAddress, setContactAddress] = useState(general?.address);
    const [enableContact, setEnableContact] = useState(true);
    //@ts-ignore
    const [generals, setGeneral] = useState<IGeneral>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (title: any, e: any) => {
        setGeneral({ ...generals, [title]: e });
        if (title === "phone") {
            setContactNumber(e);
        } else if (title === "contactEmail") {
            setEmail(e);
        } else if (title === "address") {
            setContactAddress(e);
        }
    };
    const handleSave = async () => {
        try {
            setLoading(true);
            await saveGenerals(generals);
            toast.success("Saved Changes");
            setLoading(false);
        } catch (err) {
            //console.log("err", err);
            if (err?.response) {
                toast.error(err.response.data.err);
            } else if (err?.message) {
                toast.error(err.message);
            } else {
                toast.error(err);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        setGeneral(general);
    }, [general]);
    useEffect(() => {
        setGeneral(general);
    }, []);
    return (
        <>
            {loading ? (
                <PageLoader />
            ) : (
                <div className="general-contact">
                    <Input
                        title="Contact Number"
                        placeholder="Enter Contact Number"
                        state={contactNumber}
                        number
                        setState={(e: any) => handleChange("phone", e)}
                    />
                    <Input
                        title="Email"
                        placeholder="Enter Email"
                        state={email}
                        setState={(e: any) => handleChange("contactEmail", e)}
                    />
                    <Input
                        title="Address"
                        placeholder="Enter Address"
                        state={contactAddress}
                        setState={(e: any) => handleChange("address", e)}
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
                    <button className="btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            )}
        </>
    );
};

export default GeneralContact;
