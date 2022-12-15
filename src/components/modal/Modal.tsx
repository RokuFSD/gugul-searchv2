import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, children, onClose }: { isOpen: boolean, children: ReactNode, onClose: () => void }) {
  if (!isOpen) return null;
  const element = document.getElementById("modal-root");
  if (!element) return null;
  return createPortal((
    <div className="absolute inset-0 bg-neutral-800 bg-opacity-80">
      <div className="flex flex-col gap-8 h-full items-center justify-center">
        <button type="button" onClick={onClose} className="bg-white rounded-full p-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  ), element);
}


export default Modal;
