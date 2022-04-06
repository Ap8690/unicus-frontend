import { Container, Row, Image, Col, Form } from 'react-bootstrap'
// import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import UploadField from '../UploadField'
import { useSelector } from 'react-redux'
import { getUserInfo } from '../../../Redux/Profile/actions'
import { useDispatch } from 'react-redux'
import { backendUrl } from '../../../config'
// img
// import PrevIMg from '../../../Assets/nft/pre_img.jpg'
import NFTCreateLoading from '../../Modals/NFTCreateLoading/NFTCreateLoading'
import NFTCreateSuccess from '../../Modals/NFTCreateSuccess/NFTCreateSuccess'
import DefaultModal from '../../Modals/DefaultModal/DefaultModal'
// import {setTimeout} from 'timers'
import axios from 'axios'
import getContracts from '../../../Redux/Blockchain/contracts'
import Attributes from '../../Modals/Attributes/Attributes'
import web3 from '../../../web3'
import StripeCheckout from 'react-stripe-checkout'
import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import DefaultErrorModal from '../../Modals/DefaultErrorModal'
import MetaMaskNotFound from '../../Modals/MetaMaskNotFound/MetaMaskNotFound'
// import mintingContract from '../../../contracts/minting'
import { withRouter } from 'react-router-dom'
import { bscChain, ethChain, polygonChain } from '../../../config'

// utilities
import {
    connectWallet,
    getUserWallet
} from "../../../Utilities/Util";

const AddForm = (props: any) => {
    const dispatch = useDispatch()
    // redux State
    const {
        walletType,
        userAddress,
        accessToken,
        networkID,
        userInfo,
    } = useSelector((state: any) => state.profile)
    // const { userAddress } = useSelector((state: any) => state.profile)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    // const [price, setPrice] = useState<number | string>('')
    const [imageSrc, setImageSrc] = useState<any>([])
    const [royalty, setRoyalty] = useState<any>('')
    const [category, setCategory] = useState<any>('')
    const [defaultErrorModal, setdefaultErrorModal] = useState<any>(false)
    const [defaultErrorMessage, setdefaultErrorMessage] = useState<any>('')
    const [collectionName, setCollectionName] = useState<any>('')
    const [error, setError] = useState<boolean>(false)
    const [royaltyError, setRoyaltyError] = useState<boolean>(false)
    const { createNFT } = getContracts(walletType, networkID)
    // Modals
    const [nftLoading, setNftLoading] = useState<boolean>(false)
    const [MetamaskNotFound, setMetamaskNotFound] = useState(false)
    const [product, setproduct] = useState<any>({})
    const [nftSuccess, setNftSuccess] = useState<boolean>(false)
    const [attributeModal, setAttributeModal] = useState<boolean>(false)
    const [AddNFTModalOpen, setAddNFTModalOpen] = useState<boolean>(false)
    const [hash, setHash] = useState<any>('')
    const [inputFieldsList, setInputFieldsList] = useState([
        {
            propertyType: '',
            propertyName: '',
        },
    ])

    const closeAttributeModal = () => {
        setAttributeModal(false)
    }

    const handledefaultErrorModal = () => {
        setdefaultErrorModal(false)
    }

    useEffect(() => {
        if (title?.length > 0 && imageSrc.length > 0) {
            setError(false)
        } else {
            setError(true)
        }
    }, [title, userAddress, imageSrc])

    const clearValue = () => {
        setTitle('')
        setDescription('')
        setImageSrc([])
        setRoyalty('')
    }

    const handleCategories = (e: any) => {
        setCategory(e.target.value)
    }

    const closeMetaMaskModal = () => {
        setMetamaskNotFound(false)
    }
 
    const stripePayment = async (e: any) => {
        setAddNFTModalOpen(false)
        setNftLoading(true)

        var token
        var contractAddress
        if (networkID === bscChain) {
            token = 'BNB'
            contractAddress = "0x2f376c69feEC2a4cbb17a001EdB862573898E95a"
        } else if (networkID === ethChain) {
            token = 'ETH'
            contractAddress = "0x424bb7731c056a52b45CBD613Ef08c69c628735f"
        } else if (networkID === polygonChain) {
            token = 'Matic'
            contractAddress = "0x1549EabD2a47762413ee1A11e667E67A5825ff44"
        }

        console.log("============================================================", token)
        var data: any = {
            uris: ['tokenUri'],
            royality: [royalty],
            network: Number(networkID),
        }

        const price = await axios
            .post('https://batchmint.herokuapp.com/formint', data)
            .then((response) => {
                console.log(response.data)
            })
        console.log(price)
        const product = {
            name: token,
            price,
            productBy: 'UnicusOne',
        }
        setproduct(product)

        const body: any = {
            token,
            product,
        }

        const headers = {
            'Content-Type': 'application/json',
        }

        return fetch(`https://stripeusnicus.herokuapp.com/payment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
            .then(async (stripeRes: any) => {
                const { status } = stripeRes
                if (status === 200) {
                    console.log('STATUS ', status)
                    var formData = new FormData()
                    formData.append('name', title)
                    formData.append('royalty', royalty + '')
                    formData.append('image', imageSrc[0])
                    formData.append('description', description)
                    formData.append('category', category)
                    formData.append('collectionName', collectionName)
                    formData.append(
                        'attributes',
                        JSON.stringify(inputFieldsList)
                    )
                    console.log(formData)
                    let axiosConfig: any = {
                        headers: {
                            'Content-Type':
                                'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                        },
                    }
                    const response = await axios.post(
                        'https://backend.unicus.one/pinata_upload',
                        formData,
                        axiosConfig
                    )
                    console.log(response)

                    var tokenHash = response.data
                    var tokenUri =
                        'https://unicus.mypinata.cloud/ipfs/' + tokenHash
                    console.log(tokenUri)

                    try {
                        axios
                            .post('https://batchmint.herokuapp.com/mint', data)
                            .then(async (mintAPI: any) => {
                                console.log(mintAPI.data)
                                // formData.append('imageUrl', "kdakjadkjakjd")
                                formData.append('jsonIpfs', tokenUri)
                                formData.append('nftType', imageSrc[0].type)
                                formData.append('chain', networkID)
                                formData.append('contractAddress', contractAddress)
                                formData.append('owner', userInfo._id)
                                formData.append(
                                    'tokenId',
                                    mintAPI.data.events.Minted.returnValues
                                        ._NftId
                                ) //returnValues NFTId
                                formData.append(
                                    'uploadedBy',
                                    '61e559cb515235e5d16373fe'
                                ) // Admin ID if metamask then userId
                                formData.append('mintedBy', userInfo._id) // USER ID
                                formData.append('mintedInfo', userInfo.username)
                                formData.append('userInfo', userInfo.username)

                                let newaxiosConfig: any = {
                                    headers: {
                                        Authorization: 'Bearer ' + accessToken,
                                    },
                                }

                                let cloudinaryFormData = new FormData()
                                cloudinaryFormData.append('file', imageSrc[0])
                                
                                // if(imageSrc[0].type == 'video/mp4' || imageSrc[0].type == 'image/gif') {
                                //     cloudinaryFormData.append(
                                //         'upload_preset',
                                //         `Unicus___${networkID}___video`
                                //     )
                                // } else {
                                //     cloudinaryFormData.append(
                                //         'upload_preset',
                                //         `Unicus___${networkID}`
                                //     )
                                // }

                                cloudinaryFormData.append(
                                    'upload_preset',
                                    `Images`
                                )

                                cloudinaryFormData.append(
                                    'public_id',
                                    mintAPI.data.events.Minted.returnValues
                                        ._NftId
                                )
                                console.log(cloudinaryFormData)
                                const cloudinaryRes = await fetch(
                                    'https://api.cloudinary.com/v1_1/dhmglymaz/image/upload/',
                                    {
                                        method: 'POST',
                                        body: cloudinaryFormData,
                                    }
                                )
                                const JSONdata = await cloudinaryRes.json()

                                console.log(JSONdata.url)
                                formData.append('cloudinaryUrl', JSONdata.url)
                                var object: any = {}
                                formData.forEach(
                                    (value, key: any) => (object[key] = value)
                                )
                                var json = JSON.stringify(object)
                                var newObject = {
                                    ...object,
                                    tags: inputFieldsList,
                                }

                                await axios
                                    .post(
                                        `${backendUrl}/nft`,
                                        newObject,
                                        newaxiosConfig
                                    )
                                    .then((res: any) => {
                                        console.log(res.data)
                                    })
                                    .catch((err: any) => {
                                        console.log(err.response.data.msg)
                                    })

                                    setNftLoading(false)
                                    setNftSuccess(true)
                                    clearValue()
                                    // props.history.push('/portfolio')
                                    // window.location.reload()
                            })
                            .catch(function (error: any) {
                                setNftLoading(false)
                                setdefaultErrorModal(true)
                                setdefaultErrorMessage('Try again later')
                                console.log(error)
                            })
                    } catch (error) {
                        setNftLoading(false)
                        console.log(error)
                    }
                }
            })
            .catch((error: any) => {
                console.log(error)
                setNftLoading(false)
            })
    }

    const metamaskPayment = async (e: any) => {
        e.preventDefault()
        setAddNFTModalOpen(false)
        if (!window.ethereum) {
            setNftLoading(false)
            setMetamaskNotFound(true)
            return null
        }
        connectWallet().then(async () => {
        
        var contractAddress
        if (networkID === bscChain) {
            contractAddress = "0x2f376c69feEC2a4cbb17a001EdB862573898E95a"
        } else if (networkID === ethChain) {
            contractAddress = "0x424bb7731c056a52b45CBD613Ef08c69c628735f"
        } else if (networkID === polygonChain) {
            contractAddress = "0x1549EabD2a47762413ee1A11e667E67A5825ff44"
        }
        
        setNftLoading(true)

        console.log(imageSrc)
        let formData = new FormData()
        formData.append('name', title)
        formData.append('royalty', royalty + '')
        formData.append('image', imageSrc[0])
        // formData.append('imageUrl', "kdakjadkjakjd")
        formData.append('description', description)
        formData.append('category', category)

        formData.append('collectionName', collectionName)
        formData.append('attributes', JSON.stringify(inputFieldsList))

        let axiosConfig: any = {
            headers: {
                'Content-Type':
                    'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
        }

        let newaxiosConfig: any = {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        }
        console.log(accessToken)

        const response: any = await axios
          .post(`${backendUrl}/nft/upload-pinata`, formData, axiosConfig)
          .catch((err: any) => {
            setNftLoading(false);
            setdefaultErrorMessage(err.message);
            setdefaultErrorModal(true);
          });
        if (!response) {
          setdefaultErrorMessage("Network Error");
          return;
        }
        var tokenHash = response.data
        var tokenUri = 'https://unicus.mypinata.cloud/ipfs/' + tokenHash

        try {
                const accounts = await getUserWallet();
                console.log("User Account",accounts)
                if(userInfo.wallets.length === 0 || !userInfo.wallets.includes(accounts[0])) {
                    console.log(accounts[0])
                    const axiosConfig: any = {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                        },
                    }
                    await axios
                        .get(
                            `${backendUrl}/users/addWallet/${accounts[0]}`,
                            axiosConfig
                        )
                        .then(async (res: any) => {
                            console.log(res)
                            dispatch(getUserInfo(res.data.user))
                            localStorage.setItem(
                                'userInfo',
                                JSON.stringify(res.data.user)
                            )
                        }).catch((err) => {
                            setNftLoading(false)
                            setdefaultErrorMessage("Current Metamask account is not linked with this user")
                            setdefaultErrorModal(true)
                            throw "Wallet already in use"
                        })
                }
            const res = await createNFT.methods
                .batchMint([tokenUri], [royalty])
                .send({ from: accounts[0] })
            console.log(res, res.events.Minted.returnValues._NftId)
            if (res?.transactionHash) {
                formData.append('jsonIpfs', tokenUri)
                formData.append('nftType', imageSrc[0].type)
                formData.append('chain', networkID)
                formData.append('contractAddress', contractAddress)
                formData.append('owner', userInfo._id)
                formData.append(
                    'tokenId',
                    res.events.Minted.returnValues._NftId
                ) //returnValues NFTId
                formData.append('uploadedBy', userInfo._id) // Admin ID if metamask then userId
                formData.append('mintedBy', userInfo._id) // USER ID
                formData.append('mintedInfo', userInfo.username)
                formData.append('userInfo', userInfo.username)

                let cloudinaryFormData = new FormData()
                cloudinaryFormData.append('file', imageSrc[0])

                if(imageSrc[0].type == 'video/mp4' || imageSrc[0].type == 'image/gif') {
                    cloudinaryFormData.append(
                        'upload_preset',
                        `Unicus___${networkID}___video`
                    )
                } else {
                    cloudinaryFormData.append(
                        'upload_preset',
                        `Unicus___${networkID}`
                    )
                }

                cloudinaryFormData.append(
                    'public_id',
                    res.events.Minted.returnValues._NftId
                )
                console.log(cloudinaryFormData)
                const cloudinaryRes = await fetch(
                    'https://api.cloudinary.com/v1_1/dhmglymaz/auto/upload/',
                    {
                        method: 'POST',
                        body: cloudinaryFormData,
                    }
                )
                const JSONdata = await cloudinaryRes.json()

                console.log(JSONdata.url)
                formData.append('cloudinaryUrl', JSONdata.url)
                var object: any = {}
                formData.forEach((value, key: any) => (object[key] = value))
                var json = JSON.stringify(object)
                var newObject = {
                    ...object,
                    tags: inputFieldsList,
                }

                await axios
                    .post(
                        `${backendUrl}/nft`,
                        newObject,
                        newaxiosConfig
                    )
                    .then((res: any) => {
                        console.log(res.data)
                    })
                    .catch((err: any) => {
                        console.log(err);
                        setNftLoading(false)
                        setdefaultErrorMessage("Collection name already exists")
                        setdefaultErrorModal(true)
                        throw "Collection name already exists"
                    })

                setHash(res?.transactionHash)
                setNftLoading(false)
                setNftSuccess(true)
                clearValue()
                props.history.push('/portfolio')
                // window.location.reload()
            }           
        } catch (error) {
            console.log(error)
            setNftLoading(false)
        }

    })
    .catch((err) => {
        console.log(err.message);
        setNftLoading(false)
                           
    })
    }

    const handlePriceChange = (e: any) => {
        const reg = /^[0-9-+()]*$/
        if (reg.test(e.target.value)) {
            setRoyalty(e.target.value)
        }
    }

    useEffect(() => {
        if (Number(royalty) < 100 && royalty !== '') {
            setRoyaltyError(false)
        } else {
            setRoyaltyError(true)
        }
    }, [royalty])

    const addInputField = () => {
        setInputFieldsList([
            ...inputFieldsList,
            {
                propertyType: '',
                propertyName: '',
            },
        ])
    }
    const removeInputField = (index: any) => {
        const list = [...inputFieldsList]
        list.splice(index, 1)
        setInputFieldsList(list)
    }
    const handleAttributeChange = (e: any, index: any) => {
        const { name, value } = e.target
        const list: any = [...inputFieldsList]
        list[index][name] = value
        setInputFieldsList(list)
    }

    console.log(imageSrc[0] && imageSrc[0].path.split(".").pop() == 'mp4')

    return (
        <>
            <div className='add_nft' style={{ marginTop: '90px' }}>
                <h1 className='section_heading'>Create NFT</h1>
                <h1
                    className='section_heading'
                    style={{
                        // color: '#D4D4D4',
                        marginBottom: '100px',
                        fontSize: '20px',
                    }}
                >
                    Create your own NFT and upload it at Unicus Marketplace
                </h1>
                <Container>
                    <Row>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={4}
                            xl={4}
                            className='mb-3'
                        >
                            <div
                                className='add_nft__left'
                                style={{ marginTop: '2rem' }}
                            >
                                <h5>Preview NFT</h5>
                                <div className='preview_card'>
                                    <div className='prevImg'>
                                    {(imageSrc.length > 0 && (imageSrc[0] && imageSrc[0].path.split(".").pop() == 'mp4')) ? (
                                            <video width="100%" autoPlay loop>
                                                <source src={imageSrc.length > 0
                                                        ? URL.createObjectURL(
                                                              imageSrc[0]
                                                          )
                                                        : ''} type="video/mp4" />
                                            </video>
                                        ) : ( imageSrc.length > 0 &&
                                            (<Image
                                                src={
                                                    URL.createObjectURL(imageSrc[0])
                                                }
                                                alt=''
                                            />)
                                        )}
                                    </div>
                                    <h6>
                                        {title?.length > 0
                                            ? title
                                            : 'Upload file to preview your brand new NFT'}
                                    </h6>
                                    {/* <h6>{price > 0 ? price : '00.00'} ETH</h6> */}
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={8}
                            xl={8}
                            className='mb-3'
                        >
                            <div className='add_nft__right'>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Pinky Ocean'
                                        className='shadow-none form-control'
                                        name='title'
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        size='lg'
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>
                                        Description (Optional)
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='e.g. `raroin design art'
                                        className='shadow-none form-control'
                                        name='description'
                                        size='lg'
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>
                                        Collection Name (Optional)
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Crazy NFTs'
                                        className='shadow-none form-control'
                                        name='title'
                                        value={collectionName}
                                        onChange={(e) =>
                                            setCollectionName(e.target.value)
                                        }
                                        size='lg'
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Category</Form.Label>
                                    <select
                                        className='shadow-none form-control'
                                        onChange={(e) => handleCategories(e)}
                                    >
                                        <option hidden={true}>
                                            Select Category
                                        </option>
                                        <option value='funny'>Funny</option>
                                        <option value='art'>Art</option>
                                        <option value='nature'>Nature</option>
                                        <option value='animal'>Animal</option>
                                        <option value='sports'>Sports</option>
                                        <option value='photography'>
                                            Photography
                                        </option>
                                        <option value='music'>Music</option>
                                        <option value='metaverse'>
                                            Metaverse
                                        </option>
                                    </select>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Royalty %</Form.Label>
                                    <Form.Control
                                        type='tel'
                                        placeholder='0 - 99 %'
                                        className='shadow-none form-control'
                                        size='lg'
                                        value={royalty}
                                        onChange={(e) => handlePriceChange(e)}
                                    />
                                    {royaltyError && (
                                        <span>
                                            Royalty Should be between 0 - 99 %
                                        </span>
                                    )}
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <a
                                        href='javascript:void(0)'
                                        className='btn_brand'
                                        onClick={() => setAttributeModal(true)}
                                    >
                                        Add Attributes
                                    </a>
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Label>Upload File</Form.Label>
                                    <UploadField
                                        setImageSrc={setImageSrc}
                                        profile={false}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <button
                                        disabled={error || royaltyError}
                                        onClick={() => setAddNFTModalOpen(true)}
                                        className={
                                            error || royaltyError
                                                ? 'btn_brand btn_brand_disabled'
                                                : 'btn_brand'
                                        }
                                    >
                                        Create
                                    </button>
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <DefaultModal
                    show={nftLoading}
                    handleClose={() => setNftLoading(false)}
                    type='loading'
                >
                    <NFTCreateLoading message='An Awesome Asset is getting Minted' />
                </DefaultModal>
                <DefaultModal
                    show={nftSuccess}
                    handleClose={() => setNftSuccess(false)}
                    type='success'
                >
                    <NFTCreateSuccess title={false} hash={hash} />
                </DefaultModal>
                <DefaultModal
                    show={attributeModal}
                    handleClose={() => setAttributeModal(false)}
                    type='success'
                    title='Add Properties'
                >
                    <Attributes
                        inputFilesList={inputFieldsList}
                        addInputField={addInputField}
                        removeInputField={removeInputField}
                        closeAttributeModal={closeAttributeModal}
                        handleAttributeChange={handleAttributeChange}
                    />
                </DefaultModal>
                <Modal
                    className='buy__token__modal successModal wallets nftmodal-dialog'
                    show={AddNFTModalOpen}
                    onHide={() => setAddNFTModalOpen(false)}
                >
                    <div className='buy__cpt__modal'>
                        <div className='buy__cpt__header'>
                            <div className='buy__cpt__header__tile'>
                                <h4>Create Collectible</h4>
                            </div>
                            <div
                                className='buy__cpt__header__close'
                                onClick={() => setAddNFTModalOpen(false)}
                            >
                                <CgClose />
                            </div>
                        </div>
                        <div className='success__body create_nft_modal'>
                            <div
                                className='wallet nftmodal newChange'
                                onClick={metamaskPayment}
                            >
                                <h5>Pay Using Metamask</h5>
                            </div>
                            <StripeCheckout
                                stripeKey="pk_test_51KF19SSJRtNPAiEbZ3zKUbnGW3P98lNQPTczCPnVNiPrWopONiFKsLMQ4jaG1WYJfLlFv0pqQqp3h8DbZbRhMr6000maVwfsWr"
                                token={stripePayment}
                                name="Create NFT"
                                amount={product.price * 100}
                                shippingAddress
                                billingAddress
                            >
                            <div className='wallet nftmodal newChange' style={{width: '100%', padding: '29.5px'}}>
                                <h5>
                                    Pay Using Stripe
                                </h5>
                            </div>
                            </StripeCheckout>
                        </div>
                    </div>
                </Modal>
                <DefaultErrorModal
                    DefaultErrorModalShow={defaultErrorModal}
                    DefaultErrorModalClose={() => handledefaultErrorModal()}
                    DefaultErrorMessage={defaultErrorMessage}
                />
                <MetaMaskNotFound
                    show={MetamaskNotFound}
                    handleClose={closeMetaMaskModal}
                />
            </div>
        </>
    )
}

export default withRouter(AddForm)
