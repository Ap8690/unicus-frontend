import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'
import { LinkContainer } from 'react-router-bootstrap'
import CreateSingle from "./create-single.svg"
import CreateMultiple from "./create-multiple.svg"

const CreateNFTModal = (props: any) => {

  return (
    <>
      <Modal
        className="buy__token__modal successModal wallets nftmodal-dialog"
        show={props.CreateNFTModalShow}
        onHide={props.CreateNFTModalHandleClose}
      >
        <div className="buy__cpt__modal">
          <div className="buy__cpt__header">
            <div className="buy__cpt__header__tile">
              <h4>Create Collectibles</h4>
            </div>
            <div className="buy__cpt__header__close" onClick={props.CreateNFTModalHandleClose}>
              <CgClose />
            </div>
          </div>
          <div className="success__body create_nft_modal">
            <LinkContainer to='/create-nft' onClick={props.CreateNFTModalHandleClose}>
              <div className="wallet nftmodal">
                <img src={CreateSingle}/>
                <h5>Create Single</h5>
              </div>
            </LinkContainer>
            <LinkContainer to='/create-multiple-nft' onClick={props.CreateNFTModalHandleClose}>
              <div className="wallet nftmodal">
              <img src={CreateMultiple}/>
                <h5>Create Multiple</h5>
              </div>
            </LinkContainer>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CreateNFTModal