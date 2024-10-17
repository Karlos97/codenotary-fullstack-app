import { immudbPublicApiKey, immudbRecordsLink } from '@helpers/constans';

export const fetchRecords = async ({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) => {
  if (!immudbRecordsLink || !immudbPublicApiKey) {
    throw new Error('IMMUDB link or key env variable was not declared!');
  }

  const response = await fetch(immudbRecordsLink, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': immudbPublicApiKey,
    },
    body: JSON.stringify({ page, perPage }),
  });

  if (!response.ok) {
    throw new Error('There was an error during fetching of records.');
  }

  return response.json();
};
