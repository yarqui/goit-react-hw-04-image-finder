import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { CloseBtn, Image, ModalStyled, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, onClose, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <Image src={url} alt={tags} />
        </ModalStyled>
        <CloseBtn type="button" onClick={onClose}>
          Close
        </CloseBtn>
      </Overlay>,

      modalRoot
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
