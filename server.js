import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/token', async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "portal_systems_aleks");
    urlencoded.append("client_secret", "LpRv7KUqYa2r1QKByNqischeLONBIHtDbhWmqCFfM2w");
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const response = await fetch("https://auth.staging.legartis.ai/auth/realms/legartis/protocol/openid-connect/token", requestOptions);
    const result = await response.json();
    res.json({ access_token: result.access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
