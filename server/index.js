import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

import formatErrors from './helpers/formatErrors';
import router from './routes';
import response from './helpers/responses';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(expressValidator(formatErrors()));
app.use(limiter);

app.use('/api/v1', router);
app.use('/*', (req, res) => response.notFound(res, { message: 'This endpoint does not exist' }));

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});

export default app;
