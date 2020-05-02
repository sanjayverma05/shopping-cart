import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./index.scss";

const ModalContainer = ({ children, onClose, onSubmit, heading }) => {
  const [isClosing, setIsClosing] = useState(false);
  const toggleModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setTimeout(() => {
        onClose();
      }, 10);
    }, 250);
  };
  const handleSubmit = () => {
    onSubmit();
    toggleModal();
  };
  return (
    <div className="shopping-cart-modal__container">
      <div
        className={`shopping-cart-modal ${
          isClosing ? "shopping-cart-modal--closing" : ""
        }`}
      >
        {/* <a className="shopping-cart-modal__close" onClick={toggleModal}></a> */}
        <h3 className="shopping-cart-modal__heading">{heading}</h3>
        <div className="shopping-cart-modal__content">{children}</div>
        <div className="shopping-cart-modal__cta-container">
          <a className="shopping-cart-modal__cancel" onClick={toggleModal}>
            Cancel
          </a>
          <a className="shopping-cart-modal__confirm" onClick={handleSubmit}>
            Confirm
          </a>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ children, showModal, onClose, heading, onSubmit }) => {
  const modalRoot = document.getElementById("modal-root");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [el, showModal]);

  return showModal
    ? createPortal(
        <ModalContainer
          children={children}
          onClose={onClose}
          heading={heading}
          onSubmit={onSubmit}
        />,
        el
      )
    : null;
};

export default Modal;
