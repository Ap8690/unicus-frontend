import React from 'react';
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import "./image-uploader.css";
import upload from "../../Assets/upload.svg";


const ImageUploader = (props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  console.log(acceptedFiles[0]);


  useEffect( () => {
    props.setImageSrc(acceptedFiles);
  },[acceptedFiles]);

  return (
    <div className={props.className}>
       <div className="image-drop" {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <img className="upload-logo" src={upload} alt="upload"/>
        <p>Drag Profile Image here</p>
        
      </div>
    </div>
  )
}

export default ImageUploader
