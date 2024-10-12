interface Record {
  id: number;
  accountNumber: string;
  accountName: string;
  iban: string;
  address: string;
  amount: number;
  type: string;
}

interface RecordsTableProps {
  records: Record[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records }) => (
  <div className="mt-8 overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left border-b">Account Number</th>
          <th className="px-4 py-2 text-left border-b">Account Name</th>
          <th className="px-4 py-2 text-left border-b">IBAN</th>
          <th className="px-4 py-2 text-left border-b">Address</th>
          <th className="px-4 py-2 text-left border-b">Amount</th>
          <th className="px-4 py-2 text-left border-b">Type</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{record.accountNumber}</td>
            <td className="px-4 py-2 border-b">{record.accountName}</td>
            <td className="px-4 py-2 border-b">{record.iban}</td>
            <td className="px-4 py-2 border-b">{record.address}</td>
            <td className="px-4 py-2 border-b">{record.amount.toFixed(2)}</td>
            <td className="px-4 py-2 border-b">{record.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecordsTable;
