import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../../config"
import { IAdvance } from "../../../models/Advance"
import AdvancedCustom from "./AdvancedCustom"
import AdvancedSupported from "./AdvancedSupported"

const AdvancedSettings = () => {
  const [currentFilter, setCurrentFilter] = useState("supportedNetworks");
  //@ts-ignore
  const [advance, setAdvance] = useState<IAdvance>({});

  useEffect(() => {
    post();
  }, []);

  const post = async () => {
    const res = await axios.get(`${BASE_URL}/advance`);
    setAdvance(res.data.result);
  };
  return (
    <div className="generalSettings advance">
      <h2>Advance Settings</h2>
      <div className="setting-box">
        <div className="filter">
          <button
            className={currentFilter === "supportedNetworks" && "active"}
            onClick={() => setCurrentFilter("supportedNetworks")}
          >
            Supported Networks
          </button>
          <button
            className={currentFilter === "custom" && "active"}
            onClick={() => setCurrentFilter("custom")}
          >
            Custom Store Pages
          </button>
        </div>
        {currentFilter === "supportedNetworks" && (
          <AdvancedSupported {...advance} />
        )}
        {currentFilter === "custom" && <AdvancedCustom {...advance} />}
      </div>
    </div>
  );
}

export default AdvancedSettings
