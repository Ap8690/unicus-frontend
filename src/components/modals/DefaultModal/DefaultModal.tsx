import {ReactComponent as CgClose} from "../../../assets/react-icons/CgClose.svg"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className="buy__cpt__modal">
          <div className="buy__cpt__header">
            <div className="buy__cpt__header__tile">
              <h4>{title}</h4>
            </div>
            {type !== "loading" ? (
              <div className="buy__cpt__header__close" onClick={handleClose}>
                <CgClose />
              </div>
            ) : null}
          </div>
          {children}
        </div>
      </Box>
    </Modal>
  );
}

export default DefaultModal
