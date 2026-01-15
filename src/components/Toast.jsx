import React, { useEffect } from "react";

const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(t);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;
