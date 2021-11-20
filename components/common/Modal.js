import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function Modal({ showModal, onClose, bgColor, children }) {
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto z-10"
        onClose={() => onClose(false)}>
        <div className="flex items-end justify-center min-h-[800px] sm:max-h-screen pt-4 pb-20 px-4 sm:p-1 sm:block  text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay
              className={`fixed inset-0 ${bgColor} bg-opacity-75 transition-opacity`}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
