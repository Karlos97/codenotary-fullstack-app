import React, { useState } from "react";
import AccountingForm from "@components/AccountingForm/AccountingForm";
import RecordsTable from "@components/organisms/RecordsTable/RecordsTable";

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
  const [records, setRecords] = useState<Record[]>([]);

  const addRecord = (recordData: Omit<Record, "id">) => {
    const newRecord = { ...recordData, id: records.length + 1 };
    setRecords([...records, newRecord]);
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Accounting App</h1>
      <AccountingForm onAddRecord={addRecord} />
      {records.length > 0 && <RecordsTable records={records} />}
    </div>
  );
};

export default App;
