import "./singlenft.scss";

import dollarImg from "../../assets/svgs/dollarSign.svg";
import listImg from "../../assets/svgs/list.svg";
import starImg from "../../assets/svgs/starIcon.svg";
import statsImg from "../../assets/svgs/statsIcon.svg";
import unlockImg from "../../assets/svgs/unlock.svg";
import questionImg from "../../assets/svgs/questionIcon.svg";
import { Image } from "react-bootstrap";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Input from "../../components/Input/Input";
import { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import AddProperties from "../../components/modals/Add Properties/AddProperties";
import axios from "axios";
import { toast } from "react-toastify";
import {
  tronChain,
  bscChain,
  ethChain,
  polygonChain,
  BASE_URL,
  nearChain,
  solonaChain,
} from "../../config";
import { setNotification } from "../../Redux/Blockchain/contracts";
import {
  connectWallet,
  getChainSymbol,
  getCreateNftContract,
  getCreateNftContractAddress,
} from "../../utils/utils";
import { createNft } from "../../services/api/supplier";
import { useSelector } from "react-redux";

const CreateNftSingle = () => {
  const { walletType, userAddress, accessToken, networkID, userInfo } =
    useSelector((state: any) => state.profile);

  const [name, setName] = useState("");
  const [extLink, setExtlink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("art");
  const [price, setPrice] = useState("0.00");
  const [chain, setChain] = useState(ethChain);
  const [unlockContent, setUnlockContent] = useState("");
  const [unlockable, setUnlockable] = useState(false);
  const [collection, setCollection] = useState<any>("");
  const [royalty, setRoyalty] = useState<any>(5);
  const [royaltyError, setRoyaltyError] = useState<boolean>(false);
  const [explicit, setExplicit] = useState(false);
  const [openProp, setOpenProp] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  const [openLevels, setOpenLevels] = useState(false);
  const [fileSrc, setFileSrc] = useState<any>();
  const [AddNFTModalOpen, setAddNFTModalOpen] = useState<boolean>(false);
  const [nftModalMessage, setNftModalMessage] = useState("");
  const [nftLoading, setNftLoading] = useState<boolean>(false);
  const [MetamaskNotFound, setMetamaskNotFound] = useState(false);
  const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false);
  const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>("");
  const inputFile = useRef(null);

  const [properties, setProperties] = useState([
    {
      property: "",
      value: "",
    },
  ]);
  const [stats, setStats] = useState([
    {
      property: "",
      value: "",
      total: "",
    },
  ]);
  const [levels, setLevels] = useState([
    {
      property: "",
      value: "",
      total: "",
    },
  ]);

  const propDescription = {
    properties:
      "Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
    levels:
      "Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
    stats:
      "Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
  };

  const handleChange = (event: any) => {
    setChain(event.target.value);
  };
  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };
  const handleChangeColllection = (event: any) => {
    setCollection(event.target.value);
  };
  const handleClickOpen = () => {
    setOpenProp(true);
  };
  const handleClickOpenStats = () => {
    setOpenStats(true);
  };
  const handleClickOpenLevels = () => {
    setOpenLevels(true);
  };

  const handleClose = (value: any) => {
    setOpenProp(false);
    setOpenStats(false);
    setOpenLevels(false);
  };

  const handleRoyaltyChange = (e: any) => {
    setRoyalty(e.target.value);

    const reg = /^[0-9-+()]*$/;
    if (reg.test(e.target.value)) {
    }
  };

  const uploadFile = (e) => {
    console.log(e.target.files);

    setFileSrc(e.target.files[0]);
  };

  useEffect(() => {
    if (Number(royalty) < 100 && royalty !== "") {
      setRoyaltyError(false);
    } else {
      setRoyaltyError(true);
    }
  }, [royalty]);

  const modals = [
    {
      type: "properties",
      state: properties,
      setState: setProperties,
      open: openProp,
      onClose: handleClose,
      description: propDescription.properties,
    },
    {
      type: "stats",
      state: stats,
      setState: setStats,
      open: openStats,
      onClose: handleClose,
      description: propDescription.stats,
    },
    {
      type: "levels",
      state: levels,
      setState: setLevels,
      open: openLevels,
      onClose: handleClose,
      description: propDescription.levels,
    },
  ];

  const cryptoPayment = async () => {
    try {
      console.log(1);

      setAddNFTModalOpen(false);
      if (!window.ethereum) {
        setNftLoading(false);
        setMetamaskNotFound(true);
        return null;
      }
      //@ts-expect-error
      if (chain === tronChain && !window.tronWeb) {
        setNftLoading(false);
        setMetamaskNotFound(true);
        return null;
      }
      console.log(2);
      await connectWallet(chain)
        .then(async (address) => {
          if (networkID === tronChain && !address) {
            setdefaultErrorModal(true);
            setdefaultErrorMessage("Login to TronLink");
            return;
          }
          // if (
          //   userInfo.wallets.length === 0 ||
          //   !userInfo.wallets.includes(address)
          // ) {
          //   const axiosConfig: any = {
          //     headers: {
          //       Authorization: "Bearer " + accessToken,
          //     },
          //   };
          //   setNftModalMessage("Adding current wallet address to your account.");
          //   await addWalletAdd(address, axiosConfig)
          //     .then(async (res: any) => {
          //       console.log(res);
          //       localStorage.setItem("userInfo", JSON.stringify(res.data.user));
          //     })
          //     .catch((err) => {
          //       console.log(err);

          //       setNftLoading(false);
          //       setdefaultErrorMessage(
          //         "Unable to connect current account. Please try again."
          //       );
          //       setdefaultErrorModal(true);
          //       throw "Wallet already in use.Please try different address.";
          //     });
          // }
          const contractAddress = getCreateNftContractAddress(chain);

          setNftModalMessage("Uploading the NFT.");
          setNftLoading(true);
          let formData = new FormData();
          formData.append("name", name);
          formData.append("royalty", royalty + "");
          formData.append("image", fileSrc);
          // formData.append('imageUrl', "kdakjadkjakjd")
          formData.append("description", description);
          formData.append("category", category);

          formData.append("attributes", JSON.stringify(properties));

          let axiosConfig: any = {
            headers: {
              "Content-Type":
                "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            },
          };

          let newaxiosConfig: any = {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          };

          const createNFT = getCreateNftContract(chain);

          await createNFT.methods
            .batchMint(
              [
                "https://unicus.mypinata.cloud/ipfs/QmXzeZxaiyrtu7pjaSyrVftwS94Z3N1nZTYzd3z14C6shg",
              ],
              [0]
            )
            .send({
              from: "0x41804064E354170d36b7Cbc0e6B49E413106B12A",
              gas: 3000000,
            })
            .then((val) => console.log(val))
            .catch((err) => {
              console.log(err);
            });
          const response: any = await axios
            .post(`${BASE_URL}/nft/upload-pinata`, formData, axiosConfig)
            .catch((err: any) => {
              setNftLoading(false);
              setdefaultErrorMessage(err.message);
              setdefaultErrorModal(true);
            });
          if (!response) {
            setdefaultErrorMessage("Network Error");
            return;
          }
          var tokenHash = response.data;
          var tokenUri = "https://unicus.mypinata.cloud/ipfs/" + tokenHash;
          let imageUrl;
          let tokenId;
          await axios.get(tokenUri).then((val) => {
            imageUrl = val.data.image;
            console.log("imaged add", val);
          });
          try {
            toast.success("NFT Uploaded...");
            setNftModalMessage("An Awesome Asset is getting Minted");
            console.log(address, royalty, tokenUri, createNFT.methods);

            let res: any;
            

            let tranIsSuccess = false;
            console.log("mint result", res);

            if (chain === tronChain) {
              tokenId = res;
              setNftModalMessage(
                "Waiting for transaction confirmation.(It can take upto a min to confirm)"
              );
              const success = await setNotification(res);
              console.log("ss", success);

              if (!success) {
                tranIsSuccess = false;
                throw Error("Transaction Failed");
              } else {
                tranIsSuccess = true;
              }
            } else if (res?.transactionHash) {
              tokenId = res.events.Minted.returnValues._NftId; //returnValues NFTId
              tranIsSuccess = true;
            }

            if (tranIsSuccess) {
              const nftObj = {
                name,
                royalty,
                description,
                category,
                jsonIpfs: tokenUri,
                nftType: fileSrc.split(".").pop(),
                chain,
                contractAddress,
                owner: userInfo._id,
                uploadedBy: userInfo._id,
                mintedBy: userInfo._id,
                mintedInfo: userInfo.username,
                userInfo: userInfo.username,
                image: imageUrl,
                tokenId,
              };
              var newObject = {
                ...nftObj,
                tags: properties,
              };
              await createNft(newObject, newaxiosConfig);
            } else {
              setNftLoading(false);
              setdefaultErrorMessage(
                "Couldn't add NFT to the site. You can manually add it in my profile section."
              );
              setdefaultErrorModal(true);
            }
          } catch (error) {
            console.log(error, error.message);
            setdefaultErrorMessage(error);
            setNftLoading(false);
            toast.dismiss();
            if (error.message) {
              setdefaultErrorMessage(error.message);
            }
            setdefaultErrorModal(true);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Mint failed.");
          setNftLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {modals.map((e) => (
        <AddProperties
          description={e.description}
          open={e.open}
          onClose={e.onClose}
          type={e.type}
          inputs={e.state}
          setInputs={e.setState}
        />
      ))}
      <div className="create-nft-single-page">
        <div className="head">
          <div className="blue-head">Create single item</div>
          <div className="head-text">
            Image, Video, Audio, or 3D Model. File types supported: JPG, PNG,
            GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
          </div>
        </div>
        <div className="body">
          <div className="input-fields">
            <div className="upload-file">
              <div className="field-title">Upload File</div>
              <button
                className="field"
                onClick={() => inputFile.current.click()}
              >
                {fileSrc && fileSrc.name.split(".").pop() == "mp4" ? (
                  <video width="100%">
                    <source
                      src={fileSrc ? URL.createObjectURL(fileSrc) : ""}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  fileSrc && (
                    <Image
                      src={URL.createObjectURL(fileSrc)}
                      alt=""
                      style={{ width: "90%" }}
                    />
                  )
                )}{" "}
              </button>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={(e) => uploadFile(e)}
                className="d-none"
              />{" "}
            </div>
            <div className="basic-info">
              <Input
                title="Name"
                placeholder={"Item Name"}
                state={name}
                setState={setName}
              />
              <Input
                title="External Link"
                placeholder={"https://www.youtube.com/watch?v=Oz9zw7-_vhM"}
                state={extLink}
                setState={setExtlink}
              />
              <Input
                title="Description"
                multi
                placeholder={"Provide a detailed description of your item."}
                state={description}
                setState={setDescription}
              />
            </div>
            <div className="blockchain">
              <div className="field-title">Blockchain</div>
              <div className="select-chain">
                <FormControl
                  variant="standard"
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                >
                  <Select
                    labelId="chain-select-label"
                    id="chain-select"
                    value={chain}
                    onChange={handleChange}
                    label="Chain"
                  >
                    <MenuItem value={ethChain}>Ethereum</MenuItem>
                    <MenuItem value={polygonChain}>Polygon</MenuItem>
                    <MenuItem value={tronChain}>Tron</MenuItem>
                    <MenuItem value={bscChain}>Binance</MenuItem>
                    <MenuItem value={solonaChain}>Solana</MenuItem>
                    <MenuItem value={nearChain}>Near</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="field-title">Category</div>
              <div className="select-chain">
                <FormControl
                  variant="standard"
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                >
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    <MenuItem value={"funny"}>Funny</MenuItem>
                    <MenuItem value={"art"}>Art</MenuItem>
                    <MenuItem value={"nature"}>Nature</MenuItem>
                    <MenuItem value={"animal"}>Animal</MenuItem>
                    <MenuItem value={"sports"}>Sports</MenuItem>
                    <MenuItem value={"photography"}>Photography</MenuItem>
                    <MenuItem value={"music"}>Music</MenuItem>
                    <MenuItem value={"metaverse"}>Metaverse</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="set-price">
                <div className="btn-box">
                  <button className="btn-outline">
                    <img src={dollarImg} alt="dollar" />
                    <span>Fixed Price</span>
                  </button>
                  <button className="btn-outline">
                    <img src={listImg} alt="dollar" />
                    <span>Timed Auction</span>
                  </button>
                  <button className="btn-outline">
                    <img src={listImg} alt="dollar" />
                    <span>Open For Bids</span>
                  </button>
                </div>
                <Input
                  title={"Price"}
                  placeholder="100"
                  state={price}
                  setState={setPrice}
                  number
                />
                <Input
                  title={"Royalty"}
                  placeholder="0 - 99 %"
                  value={royalty}
                  onChange={(e) => handleRoyaltyChange(e)}
                  number
                />
                {royaltyError && (
                  <span>Royalty Should be between 0 - 99 %</span>
                )}
              </div>

              <div className="select-collection">
                <FormControl
                  variant="standard"
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Collection
                  </InputLabel>
                  <Select
                    labelId="chain-select-label"
                    id="chain-select"
                    value={collection}
                    onChange={setCollection}
                    label="Chain"
                  >
                    <MenuItem value={"ethereum"}>Ethereum</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="set-attributes">
                <button className="btn-outline" onClick={handleClickOpen}>
                  <div className="btn-text">
                    <img src={listImg} alt="dollar" />
                    <span>Properties</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <button className="btn-outline" onClick={handleClickOpenLevels}>
                  <div className="btn-text">
                    <img src={starImg} alt="dollar" />
                    <span>Levels</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <button className="btn-outline" onClick={handleClickOpenStats}>
                  <div className="btn-text">
                    <img src={statsImg} alt="dollar" />
                    <span>Stats</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <div className="btn-outline">
                  <div className="btn-text">
                    <img src={unlockImg} alt="dollar" />
                    <span>Unlockable Content</span>
                  </div>
                  <IOSSwitch
                    defaultChecked
                    checked={unlockable}
                    onChange={(e: any) => setUnlockable(e.target.checked)}
                  />
                </div>
                <Input
                  multi
                  placeholder={
                    "Unlock content (access key, link to a file etc)"
                  }
                  state={unlockContent}
                  useState={setUnlockContent}
                />
                <div className="btn-outline">
                  <div className="btn-text">
                    <img src={questionImg} alt="dollar" />
                    <span>Explicit & Sensitive Content</span>
                  </div>
                  <IOSSwitch
                    defaultChecked
                    checked={explicit}
                    onChange={(e: any) => setExplicit(e.target.checked)}
                  />
                </div>
              </div>
            </div>
            <button className="btn create-btn" onClick={() => cryptoPayment()}>
              Create
            </button>
          </div>
          <div className="preview-field">
            <div className="field-title">Preview</div>
            <div className="preview-card">
              <div className="img-box">
                {fileSrc && fileSrc.name.split(".").pop() == "mp4" ? (
                  <video width="100%">
                    <source
                      src={fileSrc ? URL.createObjectURL(fileSrc) : ""}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  fileSrc && <Image src={URL.createObjectURL(fileSrc)} alt="" />
                )}{" "}
              </div>
              <div className="nft-info">
                <div className="titles">
                  <span>Name</span>
                  <span>Price</span>
                </div>
                <div className="info">
                  <span>{name}</span>
                  <span>
                    {price} {getChainSymbol(chain)}
                  </span>
                </div>
              </div>
              <div
                className="btn-box hidden
              "
              >
                <button className="texture-btn">Buy Now</button>
                <div className="likes">
                  <FavoriteBorderIcon />
                  27
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const IOSSwitch = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#A7A9FA" : "#A7A9FA",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#A7A9FA",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default CreateNftSingle;
