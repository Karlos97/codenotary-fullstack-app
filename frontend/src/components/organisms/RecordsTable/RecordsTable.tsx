import IconLeft from '@atoms/Icons/IconLeft';
import IconRight from '@atoms/Icons/IconRight';
import { Table, TableBody, TableRow, TableWrapper } from '@atoms/Table/Table';
import PaginationButton from '@atoms/PaginationButton/PaginationButton';
import { fetchRecords } from '@helpers/fetchRecords';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

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
  data?: {
    accountNumber: string;
    accountName: string;
    iban: string;
    address: string;
    amount: number;
    type: string;
  };
}
const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-800 text-left">
    {children}
  </th>
);

interface TableDataProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

const TableData = ({
  children,
  className = '',
  colSpan = 1,
}: TableDataProps) => (
  <td
    className={`${className} whitespace-nowrap px-4 py-2 font-medium text-slate-700`}
    colSpan={colSpan}
  >
    {children}
  </td>
);

const RecordsTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 15;

  const { data, error, isLoading } = useQuery<Data>({
    queryKey: ['records', pageNumber, perPage],
    queryFn: () => fetchRecords({ page: pageNumber, perPage }),
    enabled: !!pageNumber && !!perPage,
  });

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className="flex justify-center">Error: {error.message}</div>;
  }

  const defaultData = {
    accountNumber: '',
    accountName: '',
    iban: '',
    address: '',
    amount: 0,
    type: '',
  };

  const onPaginationButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number,
  ) => {
    e.preventDefault();

    setPageNumber(pageNumber + value);
  };

  return (
    <TableWrapper>
      <div className="overflow-x-auto rounded-t-lg">
        <Table>
          <thead>
            <tr>
              <TableHeader>Id</TableHeader>
              <TableHeader>Account Number</TableHeader>
              <TableHeader>Account Name</TableHeader>
              <TableHeader>IBAN</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Amount</TableHeader>
              <TableHeader>Type</TableHeader>
            </tr>
          </thead>
          {data?.revisions.length ? (
            <TableBody>
              {data?.revisions.map(({ document: { _id, data } }) => {
                const {
                  accountNumber,
                  accountName,
                  iban,
                  address,
                  amount,
                  type,
                } = data || defaultData;

                return (
                  <TableRow key={_id}>
                    <TableData>{_id}</TableData>
                    <TableData>{accountNumber}</TableData>
                    <TableData>{accountName}</TableData>
                    <TableData>{iban}</TableData>
                    <TableData>{address}</TableData>
                    <TableData>{amount}</TableData>
                    <TableData>{type}</TableData>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <tr>
              <TableData className="text-center" colSpan={7}>
                This page is empty!
              </TableData>
            </tr>
          )}
        </Table>
      </div>

      <div className="rounded-b-lg border-t border-gray-200 dark:border-gray-500 px-4 py-2 bg-gray-50 dark:bg-gray-400">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <PaginationButton
            onClick={(e) => onPaginationButtonClickHandler(e, -1)}
            disabled={pageNumber === 1}
            isIcon
          >
            <IconLeft />
          </PaginationButton>
          <PaginationButton isActive>{pageNumber}</PaginationButton>

          <PaginationButton
            onClick={(e) => onPaginationButtonClickHandler(e, 1)}
            disabled={(data?.revisions?.length || 0) < perPage}
            isIcon
          >
            <IconRight />
          </PaginationButton>
        </ol>
      </div>
    </TableWrapper>
  );
};

export default RecordsTable;
