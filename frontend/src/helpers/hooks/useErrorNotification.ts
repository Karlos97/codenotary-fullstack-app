import { useState, useEffect } from 'react';

const useErrorNotification = () => {
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const triggerError = (message: string) => {
    setError(message);
    setVisible(true);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return {
    error,
    visible,
    triggerError,
  };
};

export default useErrorNotification;
