import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import rateLimit from 'express-rate-limit';

import formatErrors from './helpers/formatErrors';
import router from './routes';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(expressValidator(formatErrors()));
app.use(limiter);

app.use('/api/v1', router);
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
