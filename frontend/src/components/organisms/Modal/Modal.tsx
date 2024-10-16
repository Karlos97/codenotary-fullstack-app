import Button from '@atoms/Button/Button';
import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg p-10 bg-white dark:bg-gray-800 w-5/6 md:w-3/5 lg:w-2/4 h-5/6 overflow-y-scroll text-black dark:text-white"
      >
        <h2 className="text-xl">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <Button
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 dark:bg-gray-600  hover:dark:bg-gray-700 text-white dark:text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
