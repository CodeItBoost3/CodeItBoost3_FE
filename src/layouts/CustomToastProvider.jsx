import { useState } from "react";
import CustomToast from "@/components/CustomToast";
import { ToastContext } from "@/hooks/useToast";

export default function CustomToastProvider({ children }) {
  const [toastMessages, setToastMessages] = useState([]);

  const addToast = (message) => {
    setToastMessages((prev) => [...prev, { id: Date.now(), message }]);
  };

  const removeToast = (id) => {
    setToastMessages((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toastMessages.map((toast) => (
          <CustomToast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
