import 'dotenv/config';
const snusbase_api = process.env.SNUSBASE_API;
const snusbase_auth = process.env.SNUSBASE_AUTH_TOKEN as string;

export async function send_request(url: string, body: object) {
  const options = {
    method: 'POST',
    headers: {
      'Auth': snusbase_auth,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  const response = await fetch(snusbase_api + url, options);
  return await response.json();
}
