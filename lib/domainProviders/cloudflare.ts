import axios from 'axios';

const CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';

export async function listDomains(token: string) {
  const response = await axios.get(`${CLOUDFLARE_API_URL}/zones`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.result.map(d => ({
    id: d.id,
    name: d.name,
    provider: 'Cloudflare',
    status: d.status,
  }));
}

export async function addDomain(token: string, name: string) {
  const response = await axios.post(
    `${CLOUDFLARE_API_URL}/zones`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const zone = response.data.result;
  return {
    id: zone.id,
    name: zone.name,
    provider: 'Cloudflare',
    status: zone.status,
  };
}

export async function deleteDomain(token: string, id: string) {
  await axios.delete(`${CLOUDFLARE_API_URL}/zones/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return true;
}