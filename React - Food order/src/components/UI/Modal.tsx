import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface IBackdrop {
  onClick: (() => void) | null;
}

interface IModal {
  children: ReactNode;
  onClick?: () => void;
}

interface IModalOverlay extends IModal {}

const Backdrop: React.FC<IBackdrop> = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onClick || undefined}></div>
  );
};

const ModalOverlay: React.FC<IModalOverlay> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export const portalElement = document.getElementById("overlays");

const Modal: React.FC<IModal> = (props) => {
  if (!portalElement) {
    return <></>;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick || null} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
