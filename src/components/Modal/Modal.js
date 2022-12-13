import PropTypes from 'prop-types';
import { Component } from 'react';

import { createPortal } from 'react-dom'; //використовуємо для створення <div id="modal-root"></div>

import { Backdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal_root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'scroll';
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    // console.log('Кликнули в бекдроп');
    // console.log('currentTarget: ', event.currentTarget);
    // console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ModalWrap>{this.props.children}</ModalWrap>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
};
