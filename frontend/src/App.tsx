import { useState } from 'react';
import AccountingForm from '@components/AccountingForm/AccountingForm';
import RecordsTable from '@components/organisms/RecordsTable/RecordsTable';
import Header from '@organisms/Header/Header';
import Footer from '@organisms/Footer/Footer';
import Modal from '@organisms/Modal/Modal';
import Button from './components/atoms/Button/Button';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add record">
        <AccountingForm />
      </Modal>
      <div className="h-full w-full flex flex-col bg-gray-50 dark:bg-gray-800 px-4 md:px-16 lg:-x-32">
        <Header />
        <div className="h-full w-full mb-auto">
          <h1 className="mb-6 text-3xl text-gray-600 dark:text-white font-bold text-center">
            Records Table
          </h1>
          <RecordsTable />
        </div>
        <Footer>
          <Button
            className="px-8 py-2 rounded bg-blue-500 dark:bg-gray-600 text-white dark:text-white"
            onClick={openModal}
          >
            Add record
          </Button>
        </Footer>
      </div>
    </>
  );
};

export default App;
