const express = require('express');
const connectDatabase = require('./config/db');
const app = express();

connectDatabase();

app.get('/', (req, res) => res.send('API Running...'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on post ${PORT}`));

