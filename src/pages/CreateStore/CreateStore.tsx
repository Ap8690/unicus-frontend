// Types
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { FormEvent, useState } from "react";

// Styles
import "./CreateStore.scss";

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
      <div className="create-store-image-holder"></div>
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
    </div>
  );
};
const CreateStore = (): ReactJSXElement => {
  return (
    <div className="create-store">
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
