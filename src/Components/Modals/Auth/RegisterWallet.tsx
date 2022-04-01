import { Modal } from 'react-bootstrap'
import { ReactComponent as CgClose } from '../../../Assets/react-icons/CgClose.svg'

const RegisterWallet = (props: any) => {
    return (
        <>
        <Modal
            className="buy__token__modal successModal wallets nftmodal-dialog"
            show={props.RegisterWalletShow}
            onHide={props.RegisterWalletClose}
        >
            <div className="buy__cpt__modal fixWidth">
                <div className="buy__cpt__header mt-4">
                    <div className="buy__cpt__header__tile mb-4">
                    <h4>Wallet Address Not Registered</h4>
                    </div>
                    <div className="buy__cpt__header__close" onClick={props.RegisterWalletClose}>
                    <CgClose />
                    </div>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default RegisterWallet
