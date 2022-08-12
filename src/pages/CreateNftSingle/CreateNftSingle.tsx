import "./singlenft.scss";

import dollarImg from "../../assets/svgs/dollarSign.svg";
import listImg from "../../assets/svgs/list.svg";
import starImg from "../../assets/svgs/starIcon.svg";
import statsImg from "../../assets/svgs/statsIcon.svg";
import unlockImg from "../../assets/svgs/unlock.svg";
import questionImg from "../../assets/svgs/questionIcon.svg";
import uploadImg from "../../assets/svgs/uploadImage.svg";

import { Image } from "react-bootstrap";
import { v4 as uuid } from "uuid";

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
  nearWalletConnection,
  userInfo,
} from "../../utils/utils";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  addWalletAdd,
  createNft,
  getAccessToken,
  uploadToPinata,
} from "../../services/api/supplier";
import { useSelector } from "react-redux";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import FullLoading from "../../components/modals/Loading/FullLoading";
import { Navigate, useNavigate } from "react-router-dom";
import { access } from "fs";

const CreateNftSingle = () => {
  const [name, setName] = useState("Item Name");
  const [extLink, setExtlink] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("art");
  const [price, setPrice] = useState("0.00");
  const [chain, setChain] = useState(nearChain);
  const [contractType, setContractType] = useState("721");
  const [supply, setSupply] = useState(1);
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
  const navigate = useNavigate();


  const { wallet, connect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const getSolWallet = () => {
    return wallet;
  };

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
    setRoyalty(e);
  };

  const uploadFile = (e) => {
    console.log("upload", e.target.files[0]);

    setFileSrc(e.target.files[0]);
    console.log(
      "check true",
      e.target.files[0].name.split(".").pop() ==
        ("jpg" || "png" || "gif" || "svg")
    );
    
  };

  const supportedImg = ["jpg", "jpeg", "png", "svg", "gif"]
  const supportedVid = ["mp4", "webm"]
  const supportedAud = ["mp3", "wav", "ogg"]
  const supported3d = ["gltf, glb"]

  const {
    utils: {
      format: { parseNearAmount },
    },
  } = nearAPI;

  useEffect(() => {
    if (Number(royalty) < 100 && royalty !== "") {
      setRoyaltyError(false);
    } else {
      setRoyaltyError(true);
    }
  }, [royalty]);

  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/connect-wallet/create-nft");
    }
  }, []);

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
  const mintAssetToNft = async (
    tokenId,
    name,
    description,
    tokenUri,
    imageUrl
  ) => {
    console.log("mintint started");
    console.log("near mint", nearWalletConnection);

    let functionCallResult = await nearWalletConnection.account().functionCall({
      contractId: "nft.subauction.testnet",
      methodName: "nft_mint",
      args: {
        token_id: `${tokenId}`,
        metadata: {
          title: `${name}`,
          description: `${description}`,
          media: `${imageUrl}`,
          reference: `${tokenUri}`,
          //extra: `${extLink}`,
        },
        gas: "200000000000000",
        receiver_id: nearWalletConnection.getAccountId(),
      },
      attachedDeposit: new BN(parseNearAmount("1")),
    });

    if (functionCallResult) {
      console.log("nft created: ", functionCallResult);
    } else {
      console.log("nft not created");
    }
  };
  const cryptoPayment = async () => {
    try {
      console.log(1);

      setAddNFTModalOpen(false);
      //@ts-ignore
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
      await connectWallet(chain, publicKey, getSolWallet, connect, setVisible)
        .then(async (address) => {
          if (!address) {
            toast.error("Wallet connection failed");
            return;
          }
          const contractAddress = getCreateNftContractAddress(
            chain,
            contractType
          );

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

          try {
            toast("Uploading the NFT...");
            const response: any = await uploadToPinata(formData);
            if (!response) {
              setdefaultErrorMessage("Network Error");
              return;
            }
            var tokenHash = response.data;
            var tokenUri = "https://unicus.mypinata.cloud/ipfs/" + tokenHash;
            let imageUrl;
            let tokenId;
            let tranIsSuccess = false;

            console.log("tokenuri", tokenUri);

            await axios.get(tokenUri).then((val) => {
              imageUrl = val.data.image;
              console.log("imaged add", val);
            });
            setNftLoading(false);
            toast.success("NFT Uploaded...");
            setNftModalMessage("An Awesome Asset is getting Minted");
            if (chain == nearChain) {
              tokenId = uuid();
              let user = userInfo;
              if (!user) {
                user = localStorage.getItem("userInfo");
              }
              const nftObj = {
                name,
                royalty,
                description,
                category,
                jsonIpfs: tokenUri,
                nftType: fileSrc.type,
                chain,
                contractAddress,
                owner: user._id,
                uploadedBy: user._id,
                mintedBy: user._id,
                mintedInfo: user.username,
                userInfo: user.username,
                cloudinaryUrl: imageUrl,
                tokenId,
                tags: properties,
              };
              localStorage.setItem("nearNftObj", JSON.stringify(nftObj));
              await mintAssetToNft(
                tokenId,
                name,
                description,
                tokenUri,
                imageUrl
              );
              return;
            } else {
              setNftLoading(true);
              toast("Minting The Asset");
              const createNFT = getCreateNftContract(chain, contractType);

              console.log("nft", address);
              let res: any;
              if (contractType == "721") {
                res = await createNFT.methods
                  .batchMint([tokenUri], [royalty])
                  .send({
                    from: address,
                  });
                if (res?.transactionHash) {
                  tokenId = res.events.Minted.returnValues._NftId; //returnValues NFTId
                }
              } else if (contractType == "1155") {
                console.log("user add", address);

                res = await createNFT.methods
                  .mintNFT(tokenUri, supply, address, parseInt(royalty))
                  .send({
                    from: address,
                  });
                console.log("1155", res);
                if (res?.transactionHash) {
                  tokenId = res.events.Minted.returnValues._id; //returnValues NFTId
                }
              } else {
                toast.error("Contract not found");
                return;
              }

              setNftLoading(false);
              toast("Asset  Minted");
              console.log("mint result", res);

              if (chain === tronChain) {
                setNftModalMessage(
                  "Waiting for transaction confirmation.(It can take upto a min to confirm)"
                );
                const success = await setNotification(res);
                console.log("ss", success);

                if (!success) {
                  tranIsSuccess = false;
                  throw Error("Tron Transaction Failed");
                } else {
                  tranIsSuccess = true;
                  const result = axios.get(
                    `https://api.shasta.trongrid.io/events/transaction/${res}`
                  );
                  tokenId = result[1].result._NftId;
                }
              } else if (res?.transactionHash) {
                tranIsSuccess = true;
              }

              let user = userInfo;
              if (!user) {
                user = localStorage.getItem("userInfo");
              }
              toast("Storing Details");
              if (tranIsSuccess) {
                const nftObj = {
                  name,
                  royalty,
                  description,
                  category,
                  jsonIpfs: tokenUri,
                  cloudinaryUrl: imageUrl,
                  nftType: fileSrc.type,
                  chain,
                  contractAddress,
                  contractType,
                  owner: user._id,
                  uploadedBy: user._id,
                  mintedBy: user._id,
                  mintedInfo: user.username,
                  userInfo: user.username,
                  image: imageUrl,
                  tokenId,
                };
                var newObject = {
                  ...nftObj,
                  tags: properties,
                };
                await createNft(newObject);
                navigate("/profile/created");
              } else {
                setNftLoading(false);
                setdefaultErrorMessage(
                  "Couldn't add NFT to the site. You can manually add it in my profile section."
                );
                setdefaultErrorModal(true);
              }
            }
          } catch (error) {
            toast.error("Minting Failed");
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
        });
    } catch (e) {
      console.log(e);
      setNftLoading(false);
    }
    setNftLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes");

    const errorCode = urlParams.get("errorCode");
    const errMsg = urlParams.get("errorMessage");

    console.log("sear", txhash, errorCode, errMsg);

    if (errorCode) {
      toast.error(errorCode);
    } else if (txhash != null) {
      const obj = JSON.parse(localStorage.getItem("nearNftObj"));
      toast("Storing details");
      if (!nftLoading) {
        setNftLoading(true);
        createNft(obj)
          .then(() => {
            localStorage.removeItem("nearNftObj");
            navigate("/profile/created");
            setNftLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setNftLoading(false);
          });
      }
    }
  }, []);

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
      {nftLoading && <FullLoading />}

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
                {fileSrc &&
                supportedVid.includes(fileSrc.name.split(".").pop()) ? (
                  <video width="100%">
                    <source
                      src={fileSrc ? URL.createObjectURL(fileSrc) : ""}
                      type="video/mp4"
                    />
                  </video>
                ) : fileSrc &&
                  supportedImg.includes(fileSrc.name.split(".").pop()) ? (
                  <Image
                    src={URL.createObjectURL(fileSrc)}
                    alt=""
                    style={{ width: "90%" }}
                  />
                ) : (
                  fileSrc &&
                  supportedAud.includes(fileSrc.name.split(".").pop()) && (
                    <audio
                      src={URL.createObjectURL(fileSrc)}
                      style={{ width: "90%" }}
                    />
                  )
                )}
                {!fileSrc && <img src={uploadImg} alt="Upload" />}
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
                    <MenuItem value={bscChain}>Binance</MenuItem>
                    <MenuItem value={tronChain}>Tron</MenuItem>
                    <MenuItem value={nearChain}>Near</MenuItem>
                    <MenuItem value={solonaChain}>Solana</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {chain == ethChain && (
                <>
                  <div className="field-title">Contract Type</div>
                  <div className="select-chain">
                    <FormControl
                      variant="standard"
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                    >
                      <Select
                        labelId="category-select-label"
                        id="chain-select"
                        defaultValue="art"
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        label="Category"
                      >
                        <MenuItem value={"721"}>ERC 721</MenuItem>
                        <MenuItem value={"1155"}>ERC 1155</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </>
              )}
              <div className="field-title">Category</div>
              <div className="select-chain">
                <FormControl
                  variant="standard"
                  sx={{ m: 0, minWidth: 120, width: "100%" }}
                >
                  <Select
                    labelId="category-select-label"
                    id="chain-select"
                    defaultValue="art"
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
                {/* <div className="btn-box">
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
                </div> */}
                {/* <Input
                  title={"Price"}
                  placeholder="100"
                  state={price}
                  setState={setPrice}
                  number
                /> */}
                {contractType == "1155" && (
                  <Input
                    title={"Supply"}
                    placeholder=""
                    state={supply}
                    setState={setSupply}
                    number
                  />
                )}
                <Input
                  title={"Royalty"}
                  placeholder="0 - 99 %"
                  state={royalty}
                  setState={handleRoyaltyChange}
                  number
                />
                {royaltyError && (
                  <span style={{marginTop:"5px", fontSize:"12px", color:"red"}}>Royalty Should be between 0 - 99 %</span>
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
                {/* <button className="btn-outline" onClick={handleClickOpenLevels}>
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
                /> */}
                {/* <div className="btn-outline">
                  <div className="btn-text">
                    <img src={questionImg} alt="dollar" />
                    <span>Explicit & Sensitive Content</span>
                  </div>
                  <IOSSwitch
                    defaultChecked
                    checked={explicit}
                    onChange={(e: any) => setExplicit(e.target.checked)}
                  />
                </div> */}
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
                {fileSrc &&
                supportedVid.includes(fileSrc.name.split(".").pop()) ? (
                  <video width="100%">
                    <source
                      src={fileSrc ? URL.createObjectURL(fileSrc) : ""}
                      type="video/mp4"
                    />
                  </video>
                ) : fileSrc &&
                  supportedImg.includes(fileSrc.name.split(".").pop()) ? (
                  <Image
                    src={URL.createObjectURL(fileSrc)}
                    alt=""
                    style={{ width: "90%" }}
                  />
                ) : (
                  fileSrc &&
                  supportedAud.includes(fileSrc.name.split(".").pop()) && (
                    <audio
                      src={URL.createObjectURL(fileSrc)}
                      style={{ width: "90%" }}
                    />
                  )
                )}
                {!fileSrc && <img src={uploadImg} alt="Upload" />}
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
