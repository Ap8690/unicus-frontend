import { stepButtonClasses } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import "./style.scss"

const SettingsTarget = ({settingsItems}) => {
  let { sub } : any  = useParams();
  
  return (
    <div className='settingsTarget'>
      {settingsItems.map((item)=>
        item.link == sub? item.comp: ""  
      )}
    </div>
  );
};

export default SettingsTarget;
