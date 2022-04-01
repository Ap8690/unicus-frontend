import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { IAppearance } from "../../../../../Models/Appearance";
import { STOREFRONT_URL } from "../../../../../Utilities/Util";
import SwitchWidget from "../../../SwitchWidget";
import themeBlue from "./../../../../../Assets/MyStore/theme-blue.svg";
import "./theme.scss";

const Theme = (appearance: IAppearance) => {
  //@ts-ignore
  const [Appearance, setAppearance] = useState<IAppearance>({});
  const themes = [
    { value: "blue", label: "Default Blue", image: "" },
    { value: "green", label: "Subtle Green", image: "" },
    { value: "orange", label: "Royal Orange", image: "" },
    { value: "purple", label: "Royal Purple", image: "" },
    { value: "black", label: "Smoky Black", image: "" },
    { value: "red", label: "Apple Red", image: "" },
  ];
  const [selected, setSelected] = useState(themes[0].value);
  const [enableDarkMode, setEnableDarkMode] = useState(false);
  const handleSave = async () => {
    try {
      const res = await axios.post(`${STOREFRONT_URL}/appearance`, appearance);
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
    setAppearance(appearance);
    setSelected(appearance.colorPalette);
    setEnableDarkMode(appearance.enableDarkMode);
  }, [appearance]);

  useEffect(() => {
    setAppearance({ ...Appearance, colorPalette: selected, enableDarkMode });
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
                    <img src={themeBlue} alt="" />
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
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Theme;
