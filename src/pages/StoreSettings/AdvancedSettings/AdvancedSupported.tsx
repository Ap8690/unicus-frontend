import { useState } from "react"
import { IAdvance } from "../../../models/Advance"
import { IOSSwitch } from "../GeneralSettings/GeneralBasic"

const AdvancedSupported = (advance:IAdvance) => {
  //@ts-ignore
  const [advances, setAdvance] = useState<IAdvance>({});
  const [eth, setEth] = useState(true);
  const [polygon, setPolygon] = useState(true);
  const [bsc, setBsc] = useState(true);
  return (
    <div className="advanced-supported">
      <div className="head">
        <span className="large-text">Select Blockchains</span>
        <span>
          You can specify which Blockchain will work on your Marketplace/Store.
          Users will be able to Buy, Sell NFT Collectibles only on below
          selected Blockchains A network cannot be disabled once an asset is
          minted on that network
        </span>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={eth}
          onChange={(e: any) => setEth(e.target.checked)}
          disabled
        />
        <div className="terms">
          <span className="large-text">Etherium (Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={polygon}
          onChange={(e: any) => setPolygon(e.target.checked)}
          disabled
        />
        <div className="terms">
          <span className="large-text">Polygon (Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={bsc}
          onChange={(e: any) => setBsc(e.target.checked)}
        />
        <div className="terms">
          <span className="large-text">Binance Smart Chain (Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={bsc}
          onChange={(e: any) => setBsc(e.target.checked)}
          disabled
        />
        <div className="terms">
          <span className="large-text">Tron (Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={bsc}
          onChange={(e: any) => setBsc(e.target.checked)}
          disabled
        />
        <div className="terms">
          <span className="large-text">Near (Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={bsc}
          onChange={(e: any) => setBsc(e.target.checked)}
          disabled
        />
        <div className="terms">
          <span className="large-text">Solona(Mainnet)</span>
          <span>This Network Cannot be disabled</span>
        </div>
      </div>
      {/* <button className="btn">Save Changes</button> */}
    </div>
  );
}

export default AdvancedSupported
