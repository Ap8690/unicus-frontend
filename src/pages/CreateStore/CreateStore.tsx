// Types
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";

// Styles
import "./CreateStore.scss";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";

// Images
import placeHolder from "../../assets/svgs/uploadImage.svg";
import { toast } from "react-toastify";
import { createStore } from "../../services/api/supplier";
import countryList from "react-select-country-list";
import validator from "validator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { userInfo } from "../../utils/utils";


const CreateStoreForm = (store:any): ReactJSXElement => {
 
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const options = useMemo(() => countryList().getData(), []);
  const inputFile = useRef(null);
  const history = useNavigate();
  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(() => {
    if (!(userInfo.length > 0) && !localStorage.getItem("userInfo")) {
      setOpen(true);
      return;
    }
    let email = "";
    if (userInfo.email) {
      email = userInfo.email;
    }

    setGeneral({
      ...generals,
      storeName: "",
      email: email,
      country: "US",
      logoUrl: "",
    });
  }, [userInfo]);

  // useEffect(() => {
  //   if (Object.keys(store).length !== 0) {
  //     history("/",{replace:true});
  //     return;
  //   }
  // }, [store]);

  const getImageUrl = async (e: any) => {
    //uploading to cloudinary
    try {
      setLoadingImage(true);
      let cloudinaryFormData = new FormData();

      cloudinaryFormData.append("file", e.target.files[0]);
      cloudinaryFormData.append("upload_preset", `Unicus___User`);

      cloudinaryFormData.append("public_id", uuid());

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      const JSONdata = await cloudinaryRes.json();

      setGeneral({ ...generals, logoUrl: JSONdata.url });
    } catch (err) {
      console.log("Cloudinary User Image Upload Error ->", err);
    }
    setLoadingImage(false);
  };
  const handleStoreName = (e) => {
    setGeneral({ ...generals, storeName: e });
  };

  const handleEmail = (e) => {
    setGeneral({ ...generals, email: e });
  };
  const handleCountry = (e) => {
    setGeneral({ ...generals, country: e });
  };
  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!generals.email && !generals.storeName) {
        throw "Please fill all fields.";
      }
      if (!validator.isEmail(generals.email)) {
        throw "Invalid Email";
      }
      let res;
      await createStore(generals).then((val)=> {
        console.log(val,"isval");
        
        res= val}).catch((e)=>{
        console.log("eeee", e);
        
        toast.error(e.response.data.err)
        return;
      });
      setLoading(false);
      console.log("isres",res);
      
      if (res) {
        toast.success("Store Created");
        setTimeout(function () {
          toast("Redirecting to your store");
        }, 1000);
        setTimeout(function () {
          history("/");
          window.open(
            `https://${res.data.createStore.domain[0]}/my-store/general`
          );
          window.location.reload();
        }, 3000);
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err.message, err.response);
      setLoading(false);
      if (err.response) {
        if (err.response.status == 401) {
          toast.error("Login expired. Please Login again.");
        } else {
          toast.error(err.response.data.msg);
        }
        return;
      }
      toast.error(err);
    }
    setLoading(false);
  };
  return (
    <div className="create-store-form-holder">
      <h3 className="form-heading">Upload File</h3>
      <div className="create-store-image-holder">
        <button className="upload-image-button" onClick={uploadImage}>
          <img src={placeHolder} alt="Upload Image" />
          <input
            type="file"
            id="file"
            ref={inputFile}
            accept="image/jpeg, image/png , image/svg+xml"
            onChange={(e) => getImageUrl(e)}
            className="d-none"
          />
        </button>
      </div>
      <form
        action=""
        className="create-store-form"
        onSubmit={(e) => handleCreateStore(e)}
      >
        <div className="form-input">
          <label htmlFor="store-name">Store Name</label>
          <input
            type="text"
            id="store-name"
            value={generals.storeName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleStoreName(e.target.value)
            }
            placeholder="Enter Store Name"
            maxLength={25}
          />
          <div className="store-name-length">
            {generals.storeName ? generals.storeName.length : "0"}/25
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={generals.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleEmail(e.target.value)
            }
            placeholder="Enter Email"
          />
        </div>
        <div className="form-input">
          <label htmlFor="country">Country</label>
          <select
            className="form-control cursor-pointer"
            value={generals.country}
            onChange={(e) => handleCountry(e.target.value)}
          >
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
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
const CreateStore = (store): ReactJSXElement => {
  return (
    <div className="create-store">
      <BlueBackground />
      <h2 className="heading">Create Store</h2>
      <p className="intro">
        Launch your own white-label NFT store or NFT Marketplace without any
        technical knowledge.
      </p>
      <CreateStoreForm store={store}/>
    </div>
  );
};

export default CreateStore;
