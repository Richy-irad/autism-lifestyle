export default async function pesapalAuth() {
  const authURL = process.env.PESAPAL_AUTHENTICATION_URL as string;

  // authenticate with pesapal
  const authResponse = await fetch(authURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (authResponse.ok) {
    return await authResponse.json();
  }
}
