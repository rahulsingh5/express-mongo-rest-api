/**
 * import for 3rd party modules
 */
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

(mongoose as any).Promise = global.Promise;

/**
 * import for local modules
 */


/**
 * instantiating the express app
 * @type {Express}
 */
const app = express();

/**
 * connecting to db
 */
mongoose.connect(`mongodb://localhost/express-api`);

/**
 * middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());

/**
 * app routes
 */
app.use('/users', require('./routes/userRoutes')());
app.use('/cars', require('./routes/carRoutes')());

/**
 * catching 404 errors and forwarding them to error handler method
 */
app.use((req: any, res: any, next: any) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * error handler
 */
app.use((error: any, req: any, res: any, next: any) => {
    const err: any = app.get('env') === 'development' ? error : {};
    const status: any = err.status || 500;

    /**
     * this will be send to client
     */
    res.status(status).json({ error: { message: error.message } });

    /**
     * for developer use
     */

    console.error(err);
});

/**
 * listen to server
 */
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    if ( app.get('env') === 'development' ) {
        console.log(`Server is listening at the port ${app.get('port')}`);
    } else {
        console.log(`Server is listening...`);
    }
});