import './singlenft.scss'

import previewImg from '../../assets/images/Rectangle 8.png'
import dollarImg from '../../assets/svgs/dollarSign.svg'
import listImg from '../../assets/svgs/list.svg'
import starImg from '../../assets/svgs/starIcon.svg'
import statsImg from '../../assets/svgs/statsIcon.svg'
import unlockImg from '../../assets/svgs/unlock.svg'
import questionImg from '../../assets/svgs/questionIcon.svg'


import * as nearAPI from 'near-api-js';

import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  u64,
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import * as anchor from "@project-serum/anchor";
import { Program, getProvider, Provider, Wallet } from "@project-serum/anchor";

import {
  clusterApiUrl,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";

import * as metaplex from "@metaplex/js";
import * as ipfsClient from "ipfs-http-client";


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Input from '../../components/Input/Input';
import { useState , useRef } from 'react';
import { Image } from "react-bootstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AddProperties from '../../components/modals/Add Properties/AddProperties'

const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );


const MetadataDataData = metaplex.programs.metadata.MetadataDataData;
const CreateMetadata = metaplex.programs.metadata.CreateMetadata;

declare const Buffer;

const NFT_SYMBOL = "unicus-nft";

function CreateNftSingle(props: any): JSX.Element {
  const [name, setName] = useState('')
  const [extLink, setExtlink] = useState('')
  const [description, setDescription] = useState('')
  const [fileSrc, setFileSrc] = useState<any>();
  const [mintSuccess, setMintSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [imageFileBuffer, setImageFileBuffer] = useState(null);
  const [royalty, setRoyalty] = useState<any>(5);
  const [royaltyError, setRoyaltyError] = useState<boolean>(false);
  const [price, setPrice] = useState('')
  const [chain, setChain] = useState('ethereum');
  const [unlockContent, setUnlockContent] = useState('')
  const [unlockable, setUnlockable] = useState(false)
  const [collection, setCollection] = useState<any>('')
  const [explicit, setExplicit] = useState(false)
  const [openProp, setOpenProp] = useState(false)
  const [openStats, setOpenStats] = useState(false)
  const [openLevels, setOpenLevels] = useState(false)
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([
    {
      property: '',
      value: ''
    }
  ])
  const [stats, setStats] = useState([
    {
      property: '',
      value: '',
      total: ''
    }
  ])
  const [levels, setLevels] = useState([
    {
      property: '',
      value: '',
      total: ''
    }
  ])

  const propDescription = {
    properties: "Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
    levels: "Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.",
    stats: "Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
  }

  const handleChange = (event:any) => {
    setChain(event.target.value);
  };
  const handleChangeColllection = (event:any) => {
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

  const handleRoyaltyChange = (e: any) => {
    setRoyalty(e.target.value);

    const reg = /^[0-9-+()]*$/;
    if (reg.test(e.target.value)) {
    }
  };

  const handleClose = (value:any) => {
    setOpenProp(false);
    setOpenStats(false);
    setOpenLevels(false);

  };

  
  const onFileSelected = (e) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    
    reader.onloadend = () => {
      setImageFileBuffer(new Buffer(reader.result));
    };
    return false;
  };

  const uploadFile = (e) => {
    console.log(e.target.files);

    setFileSrc(e.target.files[0]);
    //onFileSelected(e);
  };

  

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;

  //NEAR nft mint
  const mintAssetToNft = async () => {

    let functionCallResult = await props.near.walletConnection.account().functionCall({
      contractId: "nft-contract.unicus.testnet",
      methodName: "nft_mint",
      args: {
        token_id: `${NFT_SYMBOL}`,
        metadata: {
          title: `${name}`,
          description: `${description}`,
          media: `${fileSrc}`,
          //extra: `${extLink}`,
        },
        gas: "200000000000000",
        receiver_id: props.near.currentUser,
      },
      attachedDeposit: parseNearAmount("1"),
    });

    if (functionCallResult) {
      console.log("nft created: ");
    } else {
      console.log("nft not created");
    }
  };







  //Solana NFT mint

  let nftMintClient: Token;
  let metadata: PublicKey;

  
  const {connection} = useConnection();
      
  const { sendTransaction } = useWallet();
  const wallet = useAnchorWallet();

  const tokenProgram = TOKEN_PROGRAM_ID;

  const mintSolanaNft = async () => {
    console.log("Wallet", wallet);
    console.log("connectiion", connection);
    
    /*const provider = new anchor.AnchorProvider(connection, wallet, {commitment: 'processed'});
    anchor.setProvider(provider);
    return provider;

    const pro = getProvider();*/

    let payer = wallet as Wallet;
    
    
    console.log("provider wallet", payer.payer);
    console.log("provider publicKey", payer.publicKey.toString());

   
    try {
      nftMintClient = await Token.createMint(
      connection,
      // @ts-ignore
      payer.payer,
      payer.publicKey,
      null,
      6,
      tokenProgram
    );
    } catch(err) {
      console.log(err)
    }


    

    const uploadImageToIpfs = async () => {
    setUploading(true);
    const uploadedImage = await ipfs.add(imageFileBuffer);
    setUploading(false);

    if (!uploadedImage) {
      console.error("Something went wrong when updloading the file");
      return null;
    }

    return `https://ipfs.infura.io/ipfs/${uploadedImage.path}`;
  };

  let uploadedImageUrl = await uploadImageToIpfs();
    if (uploadImageToIpfs == null) return;
    console.log("Uploaded image url: ", uploadedImageUrl);
  
  const uploadMetadataToIpfs = async (
    name,
    symbol,
    description,
    uploadedImage,
  ) => {
    const metadata = {
      name,
      symbol,
      description,
      image: uploadedImage,
    };

    setUploading(true);
    const uploadedMetadata = await ipfs.add(JSON.stringify(metadata));
    setUploading(false);

    if (uploadedMetadata == null) {
      return null;
    } else {
      return `https://ipfs.infura.io/ipfs/${uploadedMetadata.path}`;
    }
  };

  let uploadedMetatdataUrl = await uploadMetadataToIpfs(
      name,
      NFT_SYMBOL,
      description,
      uploadedImageUrl,
    );
    if (uploadedMetatdataUrl == null) return;
    console.log("Uploaded meta data url: ", uploadedMetatdataUrl);



    

    // Create the metadata.
    const [_metadata] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        nftMintClient.publicKey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    metadata = _metadata;
    const tx = new CreateMetadata(
      { feePayer: payer.publicKey },
      {
        metadata,
        metadataData: new MetadataDataData({
          name: name,
          symbol: NFT_SYMBOL,
          uri: uploadedMetatdataUrl,
          sellerFeeBasisPoints: 1,
          creators: null,
        }),
        updateAuthority: payer.publicKey,
        mint: nftMintClient.publicKey,
        mintAuthority: payer.publicKey,
      }
    );
    await sendTransaction(tx, connection);
  };
  

  
  //sol Nft mint








  const modals = [
    {
      type: 'properties',
      state: properties,
      setState: setProperties,
      open: openProp,
      onClose: handleClose,
      description: propDescription.properties
    },
    {
      type: 'stats',
      state: stats,
      setState: setStats,
      open: openStats,
      onClose: handleClose,
      description: propDescription.stats
    },
    {
      type: 'levels',
      state: levels,
      setState: setLevels,
      open: openLevels,
      onClose: handleClose,
      description: propDescription.levels
    },
  ]

  return (
    <>
      {modals.map(e => (
        <AddProperties description={e.description} open={e.open} onClose={e.onClose} type={e.type} inputs={e.state} setInputs={e.setState} />
      ))}
      <div className='create-nft-single-page'>
        <div className='head'>
          <div className='blue-head'>Create single item</div>
          <div className='head-text'>Image, Video, Audio, or 3D Model. File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</div>
        </div>
        <div className="body">
          <div className='input-fields'>
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
              <Input title='Name' placeholder={'Item Name'} state={name} setState={setName} />
              <Input title='External Link' placeholder={'Item url'} state={extLink} setState={setExtlink} />
              <Input title='Description' multi placeholder={'Provide a detailed description of your item.'} state={description} setState={setDescription} />
            </div>
            <div className="blockchain">
              <div className='field-title'>Blockchain</div>
              <div className='select-chain'>
                <FormControl variant="standard" sx={{ m: 0, minWidth: 120, width: '100%' }}>
                  <Select
                    labelId="chain-select-label"
                    id="chain-select"
                    value={chain}
                    onChange={handleChange}
                    label="Chain"
                  >
                    <MenuItem value={'ethereum'}>Ethereum</MenuItem>
                    <MenuItem value={'polygon'}>Polygon</MenuItem>
                    <MenuItem value={'tron'}>Tron</MenuItem>
                    <MenuItem value={'binance'}>Binance</MenuItem>
                    <MenuItem value={'solana'}>Solana</MenuItem>
                    <MenuItem value={'avalanche'}>Avalanche</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='set-price'>
                <div className='btn-box'>
                  <button className='btn-outline'>
                    <img src={dollarImg} alt="dollar" />
                    <span>Fixed Price</span>
                  </button>
                  <button className='btn-outline'>
                    <img src={listImg} alt="dollar" />
                    <span>Timed Auction</span>
                  </button>
                  <button className='btn-outline'>
                    <img src={listImg} alt="dollar" />
                    <span>Open For Bids</span>
                  </button>
                </div>
                <Input title={'Price'} placeholder="100" state={price} setState={setPrice} number />
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
              <div className='select-collection'>
                <FormControl variant="standard" sx={{ m: 0, minWidth: 120, width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Select Collection</InputLabel>
                  <Select
                    labelId="chain-select-label"
                    id="chain-select"
                    value={collection}
                    onChange={setCollection}
                    label="Chain"
                  >
                    <MenuItem value={'ethereum'}>Ethereum</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="set-attributes">
                <button className='btn-outline' onClick={handleClickOpen}>
                  <div className='btn-text'>
                    <img src={listImg} alt="dollar" />
                    <span>Properties</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <button className='btn-outline' onClick={handleClickOpenLevels}>
                  <div className='btn-text'>
                    <img src={starImg} alt="dollar" />
                    <span>Levels</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <button className='btn-outline' onClick={handleClickOpenStats}>
                  <div className='btn-text'>
                    <img src={statsImg} alt="dollar"/>
                    <span>Stats</span>
                  </div>
                  <AddRoundedIcon />
                </button>
                <div className='btn-outline'>
                  <div className='btn-text'>
                    <img src={unlockImg} alt="dollar" />
                    <span>Unlockable Content</span>
                  </div>
                  <IOSSwitch defaultChecked checked={unlockable} onChange={(e:any) => setUnlockable(e.target.checked)} />
                </div>
                <Input multi placeholder={'Unlock content (access key, link to a file etc)'} state={unlockContent} useState={setUnlockContent} />
                <div className='btn-outline'>
                  <div className='btn-text'>
                    <img src={questionImg} alt="dollar" />
                    <span>Explicit & Sensitive Content</span>
                  </div>
                  <IOSSwitch defaultChecked checked={explicit} onChange={(e:any) => setExplicit(e.target.checked)} />
                </div>

              </div>
            </div>
            <button className='btn create-btn' onClick={mintAssetToNft}>
              Create
            </button>
          </div>
          <div className='preview-field'>
            <div className='field-title'>Preview</div>
            <div className='preview-card'>
              <div className="img-box">
                <img src={previewImg} alt="preview" />
              </div>
              <div className='nft-info'>
                <div className='titles'>
                  <span>Name</span>
                  <span>Price</span>
                </div>
                <div className='info'>
                  <span>Lorem, ipsum</span>
                  <span>0.05 ETH</span>
                </div>
              </div>
              <div className="btn-box">
                <button className='texture-btn'>Buy Now</button>
                <div className='likes'>
                  <FavoriteBorderIcon />
                  27
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const IOSSwitch = styled((props:any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#A7A9FA' : '#A7A9FA',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#A7A9FA',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default CreateNftSingle