import IconLeft from "@/components/atoms/Icons/IconLeft";
import IconRight from "@/components/atoms/Icons/IconRight";
import PaginationButton from "@/components/atoms/PaginationButton/PaginationButton";
import { fetchRecords } from "@/helpers/fetchRecords";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface Data {
  page: number;
  perPage: number;
  revisions: {
    document: Record;
    revision: string;
    transactionId: string;
  }[];
  searchId: string;
}

interface Record {
  _id: string;
  timestamp: string;
  id: number;
  accountNumber: string;
  accountName: string;
  iban: string;
  address: string;
  amount: number;
  type: string;
}
const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-800 text-left">
    {children}
  </th>
);
const TableData = ({ children }: { children: ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-2 font-medium text-slate-700">
    {children}
  </td>
);

const RecordsTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 20;

  const { data, error, isLoading } = useQuery<Data>({
    queryKey: ["records", pageNumber, perPage],
    queryFn: () => fetchRecords({ page: pageNumber, perPage }),
  });

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className="flex justify-center">Error: {error.message}</div>;
  }

  return (
    <div className="rounded-lg border border-gray-300 dark:border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 text-sm bg-white dark:bg-gray-400">
          <thead>
            <tr>
              <TableHeader>Id</TableHeader>
              <TableHeader>Timestamp</TableHeader>
              <TableHeader>Data object</TableHeader>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.revisions.map(
              ({ document: { _id, timestamp, ...rest } }) => (
                <tr
                  key={_id}
                  className="bg-white dark:bg-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 "
                >
                  <TableData>{_id}</TableData>
                  <TableData>{timestamp}</TableData>
                  <TableData>{JSON.stringify(rest)}</TableData>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 bg-white dark:bg-gray-400">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <PaginationButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();

              setPageNumber(pageNumber - 1);
            }}
            disabled={pageNumber === 1}
            isIcon
          >
            <IconLeft />
          </PaginationButton>
          <PaginationButton isActive>{pageNumber}</PaginationButton>

          <PaginationButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();

              setPageNumber(pageNumber + 1);
            }}
            disabled={(data?.revisions?.length || 0) < perPage}
            isIcon
          >
            <IconRight />
          </PaginationButton>
        </ol>
      </div>
    </div>
  );
};

export default RecordsTable;
