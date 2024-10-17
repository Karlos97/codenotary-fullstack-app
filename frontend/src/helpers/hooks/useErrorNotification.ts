import { useState, useEffect } from 'react';
import { errorVisibilityTime } from '@helpers/constans';

const useErrorNotification = () => {
  const [error, setError] = useState<string | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const triggerError = (message: string) => {
    setError(message);
    setIsErrorVisible(true);
  };

  useEffect(() => {
    if (isErrorVisible) {
      const timer = setTimeout(() => {
        setIsErrorVisible(false);
        setError(null);
      }, errorVisibilityTime);

      return () => clearTimeout(timer);
    }
  }, [isErrorVisible]);

  return {
    error,
    isErrorVisible,
    triggerError,
  };
};

export default useErrorNotification;
