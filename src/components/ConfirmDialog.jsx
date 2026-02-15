import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  children,
  handleConfirm,
  btnText,
}) => {
  const dialogEl = useRef(null);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleConfirmDialog = () => {
    handleConfirm();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      dialogEl.current?.showModal();
    } else {
      dialogEl.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="fixed inset-0 m-auto w-100 rounded-xl p-4 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      ref={dialogEl}
      id="successDialog"
    >
      <div>
        <IoMdClose
          onClick={handleCloseDialog}
          title="Close"
          className="ml-auto rounded-sm border border-gray-400 hover:cursor-pointer"
          size={25}
        />
      </div>
      {children}
      <button
        className="mt-2 block w-full rounded-xl border border-gray-800 bg-red-600 p-2 text-center text-white shadow-sm transition duration-200 hover:cursor-pointer hover:bg-red-400"
        onClick={handleConfirmDialog}
      >
        {btnText}
      </button>
      <button
        className="mt-2 block w-full rounded-xl border border-gray-800 p-2 text-center shadow-sm transition duration-200 hover:cursor-pointer hover:bg-gray-100"
        onClick={handleCloseDialog}
      >
        Cancel
      </button>
    </dialog>
  );
};
export default ConfirmDialog;
