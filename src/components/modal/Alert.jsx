import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

export default function AlertModal({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText,
  onConfirm,
  onCancel = null,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-[290px] rounded-xl p-6 shadow-lg flex flex-col items-center relative">

        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            <IoClose size={20} />
          </button>
        )}

        <h2 className="text-lg font-semibold text-black">{title}</h2>

        <p className="text-sm text-gray-700 mt-2 text-center">{message}</p>

        <div className={`flex gap-3 mt-6 ${cancelText ? "justify-between" : "justify-center"}`}>
          {cancelText && (
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-normalGray hover:bg-normalGray-hover active:bg-normalGray-active text-white text-sm font-medium rounded-md w-[110px]"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-lightViolet hover:bg-lightViolet-hover active:bg-lightViolet-active text-white text-sm font-medium rounded-md w-[110px]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
