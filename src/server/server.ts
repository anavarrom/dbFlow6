// External exports
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as jwtMiddleware from 'express-jwt';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

// import * as socketio from 'socket.io';
// import * as http from 'http';

// import * as helmet from 'helmet';
// import * as compression from 'compression';
// import * as cookieParser from 'cookie-parser';
// import PostRouter from './router/PostRouter';
// import UserRouter from './router/UserRouter';

// Internal Helpers
import { config             } from './config';

// Internal Routers

import CalendarRouter from './router/calendarRouter';
import NotificationRouter from './router/notificationRouter';
import AuthRouter from './router/authRouter';
import SolrRouter from './router/solrRouter';

// import { calendarRouter     } from './routes/calendarServices';
// import { authRoutes         } from './routes/auth';
// import { googleServices     } from './routes/googleServices';
// import { userServices       } from './routes/userServices';

class Server {

  // set app to be of type express.Application
  public app: express.Application;
  public io: any;
  public publicDir: string;
  public isDev: boolean;
  public router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.configMongoDB();
    this.configWebSockets();
    this.config();
    this.routes();
  }
  public config(): void {

    this.isDev         = 'development' === this.app.get('env');
    this.publicDir     = process.argv[2] || path.join(__dirname, '..', '..', 'client', 'src');

    // express middleware
    this.app.use(logger('dev'));

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // To be anaysed - is it needed?
    // this.app.use(express.static(publicDir))

    // Not included now
    // this.app.use(cookieParser());
    // this.app.use(compression());
    // this.app.use(helmet());
    this.app.use(cors({ origin: 'http://localhost:4200' }));

    // cors - To be analysed if needed
    /*this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });*/

    // Create link to Angular build directory
    // const distDir = __dirname + '/dist/';
    // const publicPath = path.join(__dirname, '..', 'dbFlow6/');
    // console.log('Client: ' + publicPath);
    //  this.app.use(express.static(publicPath));
  }

  public configMongoDB(): void {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost/dbFlow5';
    mongoose.connect(uri, (err) => {
      if (err) {
        console.log(err.message);
        console.log(err);
      } else {
        console.log('Connected to the new MongoDb');
      }
    });
  }

  public configWebSockets(): void {
  }

  // application routes
  public routes(): void {
    // const router: express.Router = express.Router();

    // this.app.use('/', this.router);
    this.app.use(this.router);
   // this.app.use('/auth/google', googleServices);
   // this.app.use('/auth/user', userServices);
    this.app.use('/auth/calendar', CalendarRouter);
    this.app.use('/auth/notification', NotificationRouter);
    this.app.use('/auth/search', SolrRouter);
    this.app.use('/auth', AuthRouter);

    this.app.get('/secret', jwtMiddleware({
        secret: config.auth.TOKEN_SECRET
    }), (req, res) => res.send('4 8 15 16 23 42'));

    // const distDir = __dirname + '/dist/';
    const publicPath = path.join(__dirname, '..', 'dbFlow6/');
    console.log('Client: ' + publicPath);
    this.app.use(express.static(publicPath));

    this.app.get('*', (req, res) =>
    // res.sendFile(path.join(this.publicDir, 'index.html'))
      res.sendFile(path.join(publicPath, 'index.html'))
    );
  }
}

// export
const server = new Server().app;
export default server;


