import axios from 'axios';

const VERCEL_API_URL = 'https://api.vercel.com';

export async function listDomains(token: string) {
  const response = await axios.get(`${VERCEL_API_URL}/v5/domains`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.domains;
}

export async function addDomain(token: string, name: string) {
  const response = await axios.post(
    `${VERCEL_API_URL}/v5/domains`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function deleteDomain(token: string, name: string) {
  const response = await axios.delete(`${VERCEL_API_URL}/v5/domains/${name}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// Add more functions as needed for other Vercel domain operations