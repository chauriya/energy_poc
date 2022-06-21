const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/healthCheck', async (req, res) => {
  res.json('OK');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});