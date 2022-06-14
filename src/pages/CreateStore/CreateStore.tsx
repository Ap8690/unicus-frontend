// Types
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { FormEvent, useState } from "react";

// Styles
import "./CreateStore.scss";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";

// Images
//@ts-ignore
import uploadImage from "../../assets/svgs/uploadImage.svg";

const CreateStoreForm = (): ReactJSXElement => {
  const onSubmit = (e: FormEvent) => {
    // the logic for submission here
    e.preventDefault();
  };
  const [storeName, setStoreName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const [email, setEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const [country, setCountry]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  return (
    <div className="create-store-form-holder">
      <h3 className="form-heading">Upload File</h3>
      <div className="create-store-image-holder">
        <button className="upload-image-button">
          <img src={uploadImage} alt="Upload Image" />
        </button>
      </div>
      <form action="" className="create-store-form" onSubmit={onSubmit}>
        <div className="form-input">
          <label htmlFor="store-name">Store Name</label>
          <input
            type="text"
            id="store-name"
            value={storeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStoreName(e.target.value)
            }
            placeholder="Enter Store Name"
            maxLength={25}
          />
          <div className="store-name-length">{storeName.length}/25</div>
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter Email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="country">Country</label>
          <input
            type="country"
            id="country"
            value={country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCountry(e.target.value)
            }
            placeholder="Enter Country"
          />
        </div>
        <button className="btn nav-link" type="submit">
          Create Store
        </button>
      </form>
      <p className="upload-instructions">
        Please upload a jpeg, png or svg file for your logo in 400x300 pixel
        size or similar ratio{" "}
      </p>
    </div>
  );
};
const CreateStore = (): ReactJSXElement => {
  return (
    <div className="create-store">
      <BlueBackground />
      <h2 className="heading">Create Store</h2>
      <p className="intro">
        Launch your own white-label NFT store or NFT Marketplace without any
        technical knowledge.
      </p>
      <CreateStoreForm />
    </div>
  );
};

export default CreateStore;
