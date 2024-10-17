import { immudbBackendLink } from '@helpers/constans';

export const fetchRecords = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  const response = await fetch(
    `${immudbBackendLink}/api/accounting?page=${page}&perPage=${perPage}`,
  );

  if (!response.ok) {
    throw new Error('There was an error during fetching of records.');
  }

  return response.json();
};
