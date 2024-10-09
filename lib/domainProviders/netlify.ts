import axios from 'axios';

const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';

export async function listDomains(token: string) {
  const response = await axios.get(`${NETLIFY_API_URL}/domains`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map(d => ({
    id: d.id,
    name: d.name,
    provider: 'Netlify',
    status: d.state,
  }));
}

export async function addDomain(token: string, name: string) {
  const response = await axios.post(
    `${NETLIFY_API_URL}/domains`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return {
    id: response.data.id,
    name: response.data.name,
    provider: 'Netlify',
    status: response.data.state,
  };
}

export async function deleteDomain(token: string, id: string) {
  await axios.delete(`${NETLIFY_API_URL}/domains/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return true;
}