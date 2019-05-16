import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';

import formatErrors from './helpers/formatErrors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(expressValidator(formatErrors()));

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
