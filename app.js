require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { jsonResponse } = require('./middlewares/jsonresponse.middleware');
// const cors = require('cors');
const app = express();
const routes = require('./routes');
const { PORT } = process.env;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(morgan('dev'));
// const corsOptions = {
//   origin: URL,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   // allowedHeaders: ['Content-Type', 'Authorization'],
// };
// app.use(cors(corsOptions));

app.use(jsonResponse);

app.get('/', async (req, res) => {
  res.status(200).json({ data: 'Welcome To Kamandaka Care' });
});

app.use('/slb/v1', routes);

// app.use(notFoundHandler);
// app.use(internalErrorHandler);

app.listen(PORT, () => console.log('Running app in port', PORT));

// app
//   .listen(PORT, '0.0.0.0', () => console.log('Running app in port', PORT))
//   .on('error', (err) => {
//     console.error('Error starting server:', err);
//   });
