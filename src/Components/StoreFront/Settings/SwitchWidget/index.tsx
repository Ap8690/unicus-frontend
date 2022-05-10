//@ts-ignore
import React from 'react'
import Switch from "react-switch";
import "./switchWidget.scss"

const SwitchWidget = ({isChecked, setIsChecked,disabled=false, title, subtitle}) => {
  return (
    <div className="border d-flex py-3 px-2 mb-4">
      <div>
        <Switch
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          disabled={disabled}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#1976D2"
        />
      </div>
      <div className="mx-4">
        <h4 className="switch-title">{title}</h4>
        <p className="m-0">{subtitle}</p>
        {disabled? <p className='m-0'> This network cannot be disabled.</p>:""}
      </div>
    </div>
  );
}

export default SwitchWidget