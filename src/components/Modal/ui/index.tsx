import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';
import type { ModalProps } from '../model';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnOverlay = true,
  closeOnEsc = true,
  showClose = true,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc + блокировка скролла body
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // фокус внутрь
    requestAnimationFrame(() => panelRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) {
    return null;
  }

  const overlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlay) {
      return;
    }
    // закрываем только если кликнули именно по подложке
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const titleId = title ? `modal-title-${Math.random().toString(36).slice(2)}` : undefined;

  return createPortal(
    <div className="modal-overlay" onMouseDown={overlayClick}>
      <div
        ref={panelRef}
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        {showClose && (
          <button className="modal__close" aria-label="Закрыть" onClick={onClose}>
            <X />
          </button>
        )}
        {title && (
          <div className="modal__header">
            <h3 id={titleId} className="modal__title">
              {title}
            </h3>
          </div>
        )}
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
