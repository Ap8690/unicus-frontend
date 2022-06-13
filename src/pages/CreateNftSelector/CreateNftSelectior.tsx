import "./nftselector.scss"

import selectorImg1 from '../../assets/images/createselector1.png'
import selectorImg2 from '../../assets/images/createselector2.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNftSelector = () => {
  const navigate = useNavigate()
  return (
    <div className="create-nft-selector">
      <div className="blue-head">Create new item</div>
      <div className="selector-text">
        Image, Video, Audio, or 3D Model. File types supported: JPG, PNG, GIF,
        SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
      </div>
      <div className="selectors">
          <div className="selector">
            <button onClick={() => navigate('/create-nft/single-item')} className="img-box">
                <img src={selectorImg1} alt="selector" />
            </button>
            <button onClick={() => navigate('/create-nft/single-item')} className='btn'>
                Create Single Item
            </button>
          </div>
          <div className="selector">
            <button onClick={() => navigate('/create-nft/multiple-items')} className="img-box">
                <img src={selectorImg2} alt="selector" />
            </button>
            <button onClick={() => navigate('/create-nft/multiple-items')} className='btn-grey'>
                Create Multiple Items)
            </button>
          </div>
      </div>
      <div className="selector-text">
      We do not own your private keys and cannot access your funds without your confirmation
      </div>
    </div>
  );
};

export default CreateNftSelector;
