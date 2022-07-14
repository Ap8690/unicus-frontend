import {ReactComponent as CgClose} from "../../../assets/react-icons/CgClose.svg"
import {Modal} from 'react-bootstrap'

interface DefaultModalProps {
  show: boolean
  handleClose: () => void
  children: React.ReactNode
  title?: string
  type: 'success' | 'fail' | 'loading'
}

const DefaultModal = ({
  title,
  show,
  handleClose,
  children,
  type,
}: DefaultModalProps) => {
  return (
    <Modal
      className={
        type === 'success'
          ? 'buy__token__modal successModal modal_success'
          : type === 'fail'
          ? 'buy__token__modal successModal modal_fail'
          : type === 'loading'
          ? 'buy__token__modal successModal modal_loading'
          : 'buy__token__modal successModal'
      }
      show={show}
      onHide={handleClose}
      backdrop={type === 'loading' ? 'static' : true}
      keyboard={type === 'loading' ? false : true}
    >
      <div className='buy__cpt__modal'>
        <div className='buy__cpt__header'>
          <div className='buy__cpt__header__tile'>
            <h4>{title}</h4>
          </div>
          {type !== 'loading' ? (
            <div className='buy__cpt__header__close' onClick={handleClose}>
              <CgClose />
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </Modal>
  )
}

export default DefaultModal
