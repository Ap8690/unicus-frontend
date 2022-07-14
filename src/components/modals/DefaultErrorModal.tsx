import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../Assets/react-icons/CgClose.svg'

const DefaultErrorModal = (props: any) => {
    return (
        <>
        <Modal
            className="buy__token__modal successModal wallets nftmodal-dialog"
            show={props.DefaultErrorModalShow}
            onHide={props.DefaultErrorModalClose}
        >
            <div className="buy__cpt__modal fixWidth widthauto">
                <div className="buy__cpt__header mt-4">
                    <div className="buy__cpt__header__tile mb-4">
                    <h4>{props.DefaultErrorMessage}</h4>
                    </div>
                    <div className="buy__cpt__header__close" onClick={props.DefaultErrorModalClose}>
                    <CgClose />
                    </div>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default DefaultErrorModal