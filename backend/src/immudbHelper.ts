import axios, { AxiosInstance } from "axios";
import https from "https";
import "dotenv/config";

const IMMUDB_PUT_URL = `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document`;
const IMMUDB_GET_URL = `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/search`;
const IMMUDB_API_KEY = process.env.IMMUDB_API_KEY || "";

if (!IMMUDB_API_KEY) {
  throw new Error("Immudb api key is missing in environment variables.");
}

const immudbClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": IMMUDB_API_KEY,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: true,
  }),
});

/**
 * Writes data to immudb Cloud using the POST endpoint.
 * @param key - The key under which to store the data.
 * @param value - The data to store.
 */
export const setValue = async (value: any): Promise<void> => {
  try {
    await immudbClient.put(IMMUDB_PUT_URL, value);
  } catch (error) {
    console.error(`Error setting data:`, error);
    throw error;
  }
};

// THIS IS JUST AN EXAMPLE. FURTHER DESCRIPTION IN ACCOUNTING SCHEMA ROUTER
// /**
//  * Reads data from immudb Cloud using the GET endpoint.
//  * @param key - The key of the data to retrieve.
//  * @returns The retrieved data parsed as type T.
//  */
// export const getValue = async (params: {
//   page: number;
//   perPage: number;
// }): Promise<void> => {
//   try {
//     const response = await immudbClient.post(IMMUDB_GET_URL, params);

//     return response.data;
//   } catch (error) {
//     console.error(`Error getting data:`, error);
//     throw error;
//   }
// };
