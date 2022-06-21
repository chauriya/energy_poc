const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const handler = require('./handler')
const port = process.env.PORT || 3080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/healthCheck', async (req, res) => {
  res.json('OK');
});

app.get('/api/getLatLong', handler.getLatLong);

app.get('/api/getTemporalDaily', handler.getTemporalDaily);

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});