import "./addprops.scss";

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Properties from "../../Properties/Properties";
import Stats from "../../Stats/Stats";

const AddProperties = ({ onClose, open, type, inputs, setInputs, description }) => {
  const handleClose = () => {
    onClose();
  };
  const handleSave = () => {
    onClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          padding: 0,
          background: "black",
          width: "600px",
          borderRadius: "16px",
          filter: "drop-shadow(0 0 5px #333)",
        },
      }}
    >
      <div className="dialog">
        <div className="dialog-title">
          Add Properties
          <button onClick={handleClose}>
            <CloseRoundedIcon />
          </button>
        </div>
        <div className="props">
          <div className="info">
            {description}
          </div>
          {type && type === 'properties' && <Properties state={inputs} setState={setInputs} />}
          {type && type === 'stats' && <Stats state={inputs} setState={setInputs} />}
          {type && type === 'levels' && <Stats state={inputs} setState={setInputs} />}
        </div>
        <div className="save-btn">
          <button onClick={handleSave} className="btn">Save</button>
        </div>
      </div>
    </Dialog>
  );
};

AddProperties.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddProperties;
