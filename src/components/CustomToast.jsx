import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function CustomToast({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="w-full max-w-80 rounded-lg bg-gray-900 text-white shadow-lg p-4 opacity-95 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-sm">{message}</span>
        <button className="ml-4 p-1 text-white hover:text-gray-400 transition" onClick={onClose}>
          <RiCloseFill size={20} />
        </button>
      </div>
    </div>
  );
}
