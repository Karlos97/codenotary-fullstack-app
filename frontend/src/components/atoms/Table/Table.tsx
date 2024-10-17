import { ReactNode } from 'react';

interface TableDataProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

export const TableWrapper = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-gray-300 dark:border-gray-400">
    {children}
  </div>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className="whitespace-nowrap px-4 py-2 font-medium text-slate-800 text-left">
    {children}
  </th>
);

export const Table = ({ children }: { children: ReactNode }) => (
  <table className="min-w-full divide-y-2 text-sm bg-gray-50 dark:bg-gray-400 divide-gray-200 dark:divide-gray-500">
    {children}
  </table>
);

export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
    {children}
  </tbody>
);

export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className="bg-gray-50 dark:bg-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500 ">
    {children}
  </tr>
);

export const TableData = ({
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
