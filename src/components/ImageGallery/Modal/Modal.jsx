import { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

// ({  closeModal })
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEsc);
  }

  componentWillUpdate() {
    window.removeEventListener('keydown', this.handleCloseModalByEsc);
  }

  handleCloseModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    const { largeAlt, largeScr } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div className={s.Modal}>
          <img src={largeScr} alt={largeAlt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
