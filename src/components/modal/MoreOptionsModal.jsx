import { useEffect, useRef } from "react";

export default function MoreOptionsModal({ position, onClose, onEdit }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute w-[120px] bg-white rounded-md shadow-lg border p-2 z-50"
      style={{ top: position.y + 10, left: position.x - 60 }}
    >
      <button
        className="w-full text-left px-3 py-2 text-sm text-black hover:bg-gray-200 rounded-md"
        onClick={() => {
          onEdit(); 
          onClose();
        }}
      >
        수정하기
      </button>
      <button
        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md"
        onClick={onClose}
      >
        삭제하기
      </button>
    </div>
  );
}
