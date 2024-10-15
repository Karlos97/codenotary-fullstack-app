export const fetchRecords = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  if (
    !import.meta.env.VITE_IMMUDB_RECORDS_LINK ||
    !import.meta.env.VITE_IMMUDB_API_PUBLIC_KEY
  ) {
    throw new Error('IMMUDB link or key env variable was not declared!');
  }

  const response = await fetch(import.meta.env.VITE_IMMUDB_RECORDS_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': import.meta.env.VITE_IMMUDB_API_PUBLIC_KEY,
    },
    body: JSON.stringify({ page, perPage }),
  });

  if (!response.ok) {
    throw new Error('There was an error during fetching of records.');
  }

  return response.json();
};
