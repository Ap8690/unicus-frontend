import { useEffect, useMemo, useRef, useState } from "react"
import Input from "../../../components/Input/Input"
import uploadImg from "../../../assets/svgs/uploadImage.svg"
import { IGeneral } from "../../../models/General";
import axios from "axios";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";
import { v4 as uuid } from "uuid";
import { Form } from "react-bootstrap";

const GeneralNameAndLogo = (general: IGeneral) => {
  //@ts-ignore
  const [generals, setGeneral] = useState<IGeneral>({});
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeCountry, setStoreCountry] = useState("");
  const [logo, setLogo] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const inputFile = useRef(null);

  const uploadImage = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  useEffect(() => {
    setGeneral(general);
  }, [general]);

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
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/general`, generals);
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="general-name-logo">
      <div>
        <Input
          title="Store Name"
          placeholder="Enter Store Name"
          value={generals.storeName}
          onChange={(e) => handleStoreName(e.target.value)}
        />
        <Input
          title="Email"
          placeholder="Enter Email"
          value={generals.email}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <Form.Group className="mb-4 d-flex flex-column">
          <Form.Label>Country</Form.Label>
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
        </Form.Group>
        <button className="btn" onClick={()=> handleSave()}>Save Changes</button>
      </div>
      <div className="file-upload-container">
        <div className="title">Logo</div>
        <label className="file-upload-box">
          {generals.logoUrl == "" && <img src={uploadImg} alt="" />}
          <input
            type="file"
            id="file"
            ref={inputFile}
            accept="image/jpeg, image/png , image/svg+xml"
            onChange={(e) => getImageUrl(e)}
            className="d-none"
          />
        </label>
        <div className="file-size-info">
          Please upload a jpeg, png or svg file for your logo in 400x300 pixel
          size or similar ratio
        </div>
      </div>
    </div>
  );
};

export default GeneralNameAndLogo
