const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('./routes/users')(app);
require('./routes/todos')(app);

module.exports = app;