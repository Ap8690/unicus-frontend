import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config"
import { IGeneral } from "../../../models/General"
import GeneralBasic from "./GeneralBasic"
import GeneralContact from "./GeneralContact"
import GeneralNameAndLogo from "./GeneralNameAndLogo"
import GeneralSocial from "./GeneralSocial"

const GeneralSettings = () => {
  const [currentFilter, setCurrentFilter] = useState("nameLogo");
  //@ts-ignore
  const [general, setGeneral] = useState<IGeneral>({});
  const post = async () => {
    const res = await axios.get(`${BASE_URL}/general`);
    console.log("resultGen", res.data);
    setGeneral(res.data.result);
  };
  useEffect(() => {
    post();
  }, []);
  return (
    <div className="generalSettings">
      <h2>General Settings</h2>
      <div className="setting-box">
        <div className="filter">
          <button
            className={currentFilter === "nameLogo" && "active"}
            onClick={() => setCurrentFilter("nameLogo")}
          >
            Name & Logo
          </button>
          <button
            className={currentFilter === "basic" && "active"}
            onClick={() => setCurrentFilter("basic")}
          >
            Basic Settings
          </button>
          <button
            className={currentFilter === "contactUs" && "active"}
            onClick={() => setCurrentFilter("contactUs")}
          >
            Contact Us
          </button>
          <button
            className={currentFilter === "social" && "active"}
            onClick={() => setCurrentFilter("social")}
          >
            Social Links
          </button>
        </div>
        {currentFilter === "nameLogo" && <GeneralNameAndLogo {...general} />}
        {currentFilter === "basic" && <GeneralBasic {...general} />}
        {currentFilter === "contactUs" && <GeneralContact {...general} />}
        {currentFilter === "social" && <GeneralSocial {...general} />}
      </div>
    </div>
  );
}

export default GeneralSettings
