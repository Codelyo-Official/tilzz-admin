import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export default function ModalDialog({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { y: -100, opacity: 0 },
        {
          y: 50,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power1.out" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    // animate out
    const tl = gsap.timeline({
      onComplete: () => {
        onClose?.();
      },
    });

    tl.to(modalRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    }).to(
      backdropRef.current,
      { opacity: 0, duration: 0.3 },
      "<" // start at the same time
    );
  };

  if (!isOpen) return null;


  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

       
          <>
            {children}
            {/* <p className="text-lg text-center mb-6">{confirmationText}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                Confirm
              </button>
            </div> */}
          </>
       
      </div>
    </div>,
    document.body
  );
}
