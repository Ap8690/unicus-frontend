import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config";
import { IAppearance } from "../../../models/Appearance";
// import AppearanceHeader from "./AppearanceHeader"
import AppearanceOther from "./AppearanceOther"

const AppearanceSettings = () => {
  const [currentFilter, setCurrentFilter] = useState("header");
  //@ts-ignore
  const [appearance, setAppearance] = useState<IAppearance>({});
  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${BASE_URL}/appearance`);
    setAppearance(res.data.result);
  };
  return (
    <div className="generalSettings advance">
      <h2>Appearance</h2>
      <div className="setting-box">
        <div className="filter">
          {/* <button
                        className={currentFilter === "header" && "active"}
                        onClick={() => setCurrentFilter("header")}
                    >
                        Header Sections
                    </button> */}
          <button
            className={currentFilter === "other" && "active"}
            onClick={() => setCurrentFilter("other")}
          >
            Others
          </button>
        </div>
        {/* {currentFilter === "header" && <AppearanceHeader {...appearance} />} */}
        {currentFilter === "other" && <AppearanceOther {...appearance} />}
      </div>
    </div>
  );
}

export default AppearanceSettings
