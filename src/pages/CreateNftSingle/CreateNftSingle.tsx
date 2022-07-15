import './singlenft.scss'

import previewImg from '../../assets/images/Rectangle 8.png'
import uploadImg from '../../assets/svgs/uploadImage.svg'
import dollarImg from '../../assets/svgs/dollarSign.svg'
import listImg from '../../assets/svgs/list.svg'
import starImg from '../../assets/svgs/starIcon.svg'
import statsImg from '../../assets/svgs/statsIcon.svg'
import unlockImg from '../../assets/svgs/unlock.svg'
import questionImg from '../../assets/svgs/questionIcon.svg'

import { getConfig } from '../../config'
import * as nearAPI from 'near-api-js';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import AddProperties from '../../components/modals/Add Properties/AddProperties'

type Props = {
  currentUser: any;
  nearConfig: any,
  walletConnection: any;
}

function CreateNftSingle(props: any): JSX.Element {
  const [name, setName] = useState('')
  const [extLink, setExtlink] = useState('')
  const [description, setDescription] = useState('')
  const [imageSrc, setImageSrc] = useState<any>([]);
  const [price, setPrice] = useState('')
  const [chain, setChain] = useState('ethereum');
  const [unlockContent, setUnlockContent] = useState('')
  const [unlockable, setUnlockable] = useState(false)
  const [collection, setCollection] = useState<any>('')
  const [explicit, setExplicit] = useState(false)
  const [openProp, setOpenProp] = useState(false)
  const [openStats, setOpenStats] = useState(false)
  const [openLevels, setOpenLevels] = useState(false)
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

  const handleClose = (value:any) => {
    setOpenProp(false);
    setOpenStats(false);
    setOpenLevels(false);

  };

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;


  const mintAssetToNft = async () => {

    let functionCallResult = await props.near.walletConnection.account().functionCall({
      contractId: "nft-contract.boomboom.testnet",
      methodName: "nft_mint",
      args: {
        token_id: `${name}`,
        metadata: {
          title: `${name}`,
          description: `${description}`,
          media: `${extLink}`,
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