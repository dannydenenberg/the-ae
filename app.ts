import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as root from 'app-root-path';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as routes from './server/routes';

const app = express();

// config vars
dotenv.config();

// initialize mongo
const { DATABASE_URL, DATABASE_NAME } = process.env;
const DATABASE_URI = `${DATABASE_URL}/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URI, { useNewUrlParser: true });

// Enable if behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

// 100 requests every 30 seconds
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 30 seconds
  max: 100, // limit each IP to 100 requests per windowMs
});

// view engine setup
app.set('views', `${root}/server/views/`);
app.set('view engine', 'pug');

app.use(limiter);
app.use(express.static(`${root}/server/views/public`));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use(cookieParser());

// set up routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err: any, req: express.Request, res: express.Response, next: Function) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

export = app;
