import React from "react";
import styles from "./Modal.module.css";
import Link from "next/link";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Чтобы добавлять треки в избранное, пожалуйста,</h2>
          <Link href="/signin" className={styles.menuLink}>
              авторизуйтесь
            </Link>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
