export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // заголовок для a11y
  children: React.ReactNode;
  className?: string; // модификаторы размера: modal--sm/md/lg
  closeOnOverlay?: boolean; // по клику на фон
  closeOnEsc?: boolean; // по Esc
  showClose?: boolean; // показывать крестик
};
