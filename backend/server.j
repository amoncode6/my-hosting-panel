const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/deploy', (req, res) => {
  const session = req.body.session;
  if (!session) return res.status(400).send({ message: 'Session missing' });

  fs.writeFileSync('session.json', JSON.stringify({ session }));
  return res.send({ message: 'Session saved successfully' });
});

app.post('/request', (req, res) => {
  const request = req.body;
  fs.appendFileSync('requests.log', JSON.stringify(request) + '\n');
  return res.send({ message: 'Request received' });
});

app.listen(3001, () => console.log('Backend running on port 3001'));
