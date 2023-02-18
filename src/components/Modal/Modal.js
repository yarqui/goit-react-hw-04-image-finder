import PropTypes from 'prop-types';
import { CloseBtn, Image, ModalStyled, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, url, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <Image src={url} alt={tags} />
      </ModalStyled>
      <CloseBtn type="button" onClick={onClose}>
        Close
      </CloseBtn>
    </Overlay>,

    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
