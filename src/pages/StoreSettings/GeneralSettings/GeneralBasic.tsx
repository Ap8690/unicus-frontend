import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"
import { useState } from "react"
import { IGeneral } from "../../../models/General";

const GeneralBasic = (general: IGeneral) => {
  const [homeToMarketplace, setHomeToMarketplace] = useState(true);
  return (
    <div className="general-basic">
      <div className="switch-box">
        <IOSSwitch
          defaultChecked
          checked={homeToMarketplace}
          onChange={(e: any) => setHomeToMarketplace(e.target.checked)}
        />
        <div className="terms">
          <span className="large-text">Set Marketplace page as Homepage</span>
          <span>
            Turn this ON if you want to use Marketplace page as Homepage
          </span>
        </div>
      </div>
      <button className="btn">Save Changes</button>
    </div>
  );
};

export const IOSSwitch = styled((props: any) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#A7A9FA" : "#A7A9FA",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#A7A9FA",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}))

export default GeneralBasic
