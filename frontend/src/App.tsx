import { useState } from "react";
import AccountingForm from "@components/AccountingForm/AccountingForm";
import RecordsTable from "@components/organisms/RecordsTable/RecordsTable";
import Header from "@organisms/Header/Header";
import Footer from "@organisms/Footer/Footer";
import Modal from "@organisms/Modal/Modal";
import Button from "./components/atoms/Button/Button";

interface Record {
  id: number;
  accountNumber: string;
  accountName: string;
  iban: string;
  address: string;
  amount: number;
  type: string;
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(import.meta.env.VITE_IMMUDB_RECORDS_LINK);

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
      <div className="h-full w-full flex flex-col bg-white dark:bg-slate-800 ">
        <Header />
        <div className="h-full w-full mb-auto">
          <h1 className="mb-6 text-3xl text-slate-500 dark:text-white font-bold text-center">
            Records Table
          </h1>
          <RecordsTable />
        </div>
        <Footer>
          <Button
            className="px-4 py-2 rounded bg-blue-500 text-white dark:bg-gray-700 dark:text-white"
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
