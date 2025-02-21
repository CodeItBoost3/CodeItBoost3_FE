import { useEffect, useRef, useState } from "react";
import AlertModal from '@/components/modal/Alert';

export default function MoreOptionsModal({ 
  position, 
  onClose, 
  onEdit, 
  onDelete, 
  itemId,
}) {
  const modalRef = useRef(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAlertOpen) return;

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isAlertOpen]); 

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  return (
    <>
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
          onClick={handleDelete}
        >
          삭제하기
        </button>
      </div>

      <AlertModal
        isOpen={isAlertOpen}
        title="삭제 확인"
        message="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          onDelete(itemId);
          setTimeout(() => {
            setIsAlertOpen(false);
          }, 100);
        }}
        onCancel={() => setIsAlertOpen(false)}
      />
    </>
  );
}
