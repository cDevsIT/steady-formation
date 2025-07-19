import React from "react";
import Image from "./Image";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, className='' }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000d1]"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-lg max-w-lg w-full relative min-h-[450px] flex justify-center items-center ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-[-20px] right-[-20px] text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <Image className="w-[24px]" url="/client/modal_close.svg" alt="Modal Close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 