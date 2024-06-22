import 'dotenv/config'
const snusbase_api = process.env.SNUSBASE_API;
const snusbase_auth = process.env.SNUSBASE_AUTH_TOKEN as string;

export async function send_request(url: string, body: object) {
  const options = {
    method: (body) ? 'POST' : 'GET',
    headers: {
      'Auth': snusbase_auth,
      'Content-Type': 'application/json'
    },
    body: (body) ? JSON.stringify(body) : null
  };

  const response = await fetch(snusbase_api + url, options);

  if (response.ok) return response.json();
}