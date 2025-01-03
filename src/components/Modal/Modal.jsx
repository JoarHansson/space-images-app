import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { X } from "lucide-react";

import styles from "./Modal.module.css";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState();

  function open(val) {
    document.documentElement.style.overflow = "hidden";
    setIsOpen(val);
  }

  function close() {
    document.documentElement.style.overflow = "";
    setIsOpen("");
  }

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ modalName, children }) {
  const { isOpen, close, open } = useContext(ModalContext);

  function handleClick() {
    if (!modalName) throw new Error("Modal control missing modal name");
    isOpen === modalName ? close() : open(modalName);
  }

  return cloneElement(children, { onClick: handleClick });
}

function Content({ modalName, children }) {
  const { isOpen, close } = useContext(ModalContext);

  if (!modalName) throw new Error("Modal Content is missing modalName");

  if (isOpen === modalName)
    return createPortal(
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <X onClick={close} />
          </div>
          {children}
        </div>
      </div>,
      document.body
    );
}

function Buttons({ children }) {
  return (
    <div className={styles.buttonsWrapper}>
      <div className={styles.buttons}>{children}</div>
    </div>
  );
}

function CloseButton({ children }) {
  const { close } = useContext(ModalContext);

  return (
    <button
      className={`${styles.button} ${styles.closeButton}`}
      onClick={close}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, cb }) {
  const { close } = useContext(ModalContext);

  return (
    <button
      className={`${styles.button} ${styles.actionButton}`}
      onClick={() => {
        cb?.();
        close();
      }}
    >
      {children}
    </button>
  );
}

Modal.ActionButton = ActionButton;
Modal.CloseButton = CloseButton;
Modal.Content = Content;
Modal.Trigger = Trigger;
Modal.Buttons = Buttons;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

Content.propTypes = {
  modalName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Buttons.propTypes = {
  children: PropTypes.node.isRequired,
};

CloseButton.propTypes = {
  children: PropTypes.node.isRequired,
};

ActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  cb: PropTypes.func,
};

export default Modal;
