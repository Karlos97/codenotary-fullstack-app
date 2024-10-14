import Button from "@/components/atoms/Button/Button";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 bg-white text-black dark:bg-gray-800 dark:text-white w-5/6 md:w-3/5 lg:w-2/4 h-5/6 overflow-y-scroll">
        <h2 className="text-xl">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <Button
            className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-gray-700 dark:text-white"
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
