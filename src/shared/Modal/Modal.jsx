import { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useBodyLock } from '../../hooks/useBodyLock.js';
import ReactPortal from '../ReactPortal/ReactPortal';
import styles from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ children, className, isOpen, handleClose }) => {
  const nodeRef = useRef(null);
  const closeOnEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, [closeOnEscape]);

  useBodyLock(isOpen);

  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      nodeRef={nodeRef}
      classNames={{
        enterDone: styles.done,
      }}
      unmountOnExit
    >
      <ReactPortal wrapperId="#modal">
        <div
          ref={nodeRef}
          onClick={handleClose}
          className={clsx(styles.popup, className)}
        >
          <div className={styles.container}>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
        </div>
      </ReactPortal>
    </CSSTransition>
  );
};

const CloseModal = ({ onClick, className }) => (
  <button onClick={onClick} className={clsx(styles.button, className)}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4515 5.64191L5.10164 14.9918"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14.4515 14.9918L5.10164 5.64189"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

Modal.Close = CloseModal;

export default Modal;
