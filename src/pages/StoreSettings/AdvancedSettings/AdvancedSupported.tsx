import { useState, useContext } from "react"
import { StoreContext } from "../../../context/StoreContext"
import { IAdvance } from "../../../models/Advance"
import { IOSSwitch } from "../GeneralSettings/GeneralBasic"

const  AdvancedSupported = () => {
  const {store} = useContext(StoreContext)
  //@ts-ignore
  const [eth, setEth] = useState(true);
  const [polygon, setPolygon] = useState(true);
  const [bsc, setBsc] = useState(true);
  const [ava, setAva] = useState(true);
  const [near,setNear] = useState(true)
  const [solana, setSolana] = useState(true)
  const [tron,setTron] = useState(true)
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
          checked={store?.advance.showEth.enabled ? eth : false}
          onChange={(e: any) => setEth(e.target.checked)}
          disabled={!store?.advance.showEth.enabled}
        />
        <div className="terms">
          <span className="large-text">Ethereum</span>
          <span>This Network Cannot be {store?.advance.showEth.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showPoly.enabled ? polygon : false}
          onChange={(e: any) => setPolygon(e.target.checked)}
          disabled={!store?.advance.showPoly.enabled}
        />
        <div className="terms">
          <span className="large-text">Polygon</span>
          <span>This Network Cannot be {store?.advance.showPoly.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showBinance.enabled ? bsc : false}
          onChange={(e: any) => setBsc(e.target.checked)}
          disabled={!store?.advance.showBinance.enabled}
        />
        <div className="terms">
          <span className="large-text">Binance Smart Chain </span>
          <span>This Network Cannot be {store?.advance.showBinance.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showSolana.enabled ? solana : false}
          onChange={(e: any) => setSolana(e.target.checked)}
          disabled={!store?.advance.showSolana.enabled}
        />
        <div className="terms">
          <span className="large-text">Solana</span>
          <span>This Network Cannot be {store?.advance.showSolana.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showTron.enabled ? tron : false}
          onChange={(e: any) => setTron(e.target.checked)}
          disabled={!store?.advance.showTron.enabled}
        />
        <div className="terms">
          <span className="large-text">Tron </span>
          <span>This Network Cannot be {store?.advance.showTron.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showNear.enabled ? near : false}
          onChange={(e: any) => setNear(e.target.checked)}
          disabled={!store?.advance.showNear.enabled}
        />
        <div className="terms">
          <span className="large-text">Near </span>
          <span>This Network Cannot be {store?.advance.showNear.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={store?.advance.showAva.enabled ? ava : false}
          onChange={(e: any) => setAva(e.target.checked)}
          disabled={!store?.advance.showAva.enabled}
        />
        <div className="terms">
          <span className="large-text">Avalanche</span>
          <span>This Network Cannot be {store?.advance.showAva.enabled ? "disabled" : "enabled, Please purchase premium membership."}</span>
        </div>
      </div>
    
      {/* <button className="btn">Save Changes</button> */}
    </div>
  );
}

export default AdvancedSupported
