import "./addprops.scss";

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AddProperties = ({ onClose, selectedValue, open }) => {
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleSave = () => {
    onClose(selectedValue);
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
            Properties show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </div>
          <div className="values">
            <div>Type</div>
            <div>Name</div>
          </div>
          <button className="btn-outline">Add More</button>
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
