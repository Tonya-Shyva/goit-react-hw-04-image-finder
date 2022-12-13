import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { createPortal } from 'react-dom'; //використовуємо для створення <div id="modal-root"></div>

import { Backdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal_root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    // console.log('Modal componentDidMount');
    if (onClose) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);

  // useEffect() {
  //   // console.log('Modal componentWillUnmount');
  //   window.removeEventListener('keydown', handleKeyDown);
  //   document.body.style.overflow = 'scroll';
  // }

  //

  const handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');
    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalWrap>{children}</ModalWrap>
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
