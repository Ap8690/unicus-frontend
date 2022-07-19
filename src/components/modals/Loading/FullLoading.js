import React from 'react';

import './loading.css';
import CircularProgress from "@mui/material/CircularProgress";
 
const FullLoading = () => {

  return <div className="full-loading">
          <CircularProgress color="inherit" size={60} />
          {/* <p className="payNow">Your ticket is being minted on blockchain<br/>
            <span>This may take upto 30 seconds...</span>
          </p> */}
        </div>;
};

export default FullLoading;
