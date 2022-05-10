import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAppearance } from "../../../../../Models/Appearance";
import { BASE_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";
import themeBlue from "./../../../../../Assets/MyStore/theme-blue.svg";
import themeGreen from "./../../../../../Assets/MyStore/theme_green.svg";
import themeOrange from "./../../../../../Assets/MyStore/theme_orange.svg";
import themePurple from "./../../../../../Assets/MyStore/theme-purple.svg";
import themeBlack from "./../../../../../Assets/MyStore/theme_black.svg";
import themeRed from "./../../../../../Assets/MyStore/theme_red.svg";
import themeBlueLime from "./../../../../../Assets/MyStore/theme_blue_lime.svg";

import "./theme.scss";

const Theme = (appearance:IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
  const themes = [
    { value: "blue", label: "Default Blue", image: themeBlue },
    { value: "green", label: "Subtle Green", image: themeGreen },
    { value: "orange", label: "Royal Orange", image: themeOrange },
    { value: "purple", label: "Royal Purple", image: themePurple },
    { value: "black", label: "Smoky Black", image: themeBlack },
    { value: "red", label: "Apple Red", image: themeRed },
    { value: "blueLime", label: "Blue Lime", image: themeBlueLime },
  ];
  const [selected, setSelected] = useState(themes[0].value);
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/appearance`, Appearance);
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

  useEffect(() => {
    setAppearance(appearance)
    setSelected(appearance.colorPalette)
    setEnableDarkMode(appearance.enableDarkMode)
  }, [appearance])

  useEffect(() => {
    setAppearance({...Appearance, colorPalette:selected, enableDarkMode});
  }, [selected, enableDarkMode]);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Row>
            <Col lg={12}>
              <h4>Color Palette</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ul className="themeSelection p-0">
                {themes.map((item) => (
                  <li
                    className={`d-flex flex-column cursor-pointer ${
                      selected == item.value ? "active" : ""
                    }`}
                    onClick={() => setSelected(item.value)}
                  >
                    <img src={item.image} alt="" />
                    <p className="mt-3">{item.label}</p>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6}>
              <SwitchWidget
                isChecked={enableDarkMode}
                setIsChecked={setEnableDarkMode}
                title={"Dark Mode"}
                subtitle={
                  "Turn it on to switch the current theme from light to dark mode"
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Theme;
