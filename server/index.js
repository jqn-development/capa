// Get dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const compression = require('compression');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const expressStatusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const mongoUtil = require('./config/mongo');	
const graphqlSchema = require('./graphql/index');

//Load environment variables
require('dotenv').config();


const apollo = new ApolloServer({
	schema: graphqlSchema
});


//Route handlers
const authApi = require('./controllers/auth.api');
const photoApi = require('./controllers/photo.api');
const userApi = require('./controllers/user.api');
const filmApi = require('./controllers/film.api');
const cameraApi = require('./controllers/camera.api');

//Create server
const app = express();
apollo.applyMiddleware({ app });
//DB setup
mongoUtil.connectToServer(err => {
	if (err) return console.log(err);
});

//Express configuration
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1140);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(
	express.static(path.join(__dirname, '../app', 'build'), {
		maxAge: 31557600000
	})
);

//Error handler
app.use(errorHandler());

//API routes
app.use('/api/auth', authApi);
app.use('/api/photo', photoApi);
app.use('/api/user', userApi);
app.use('/api/film', filmApi);
app.use('/api/camera', cameraApi);


let server = app.listen(app.get('port'), () => {
	console.log(
		'%s App is running at http://localhost:%d in %s mode',
		chalk.green('✓'),
		app.get('port'),
		app.get('env')
	);
	console.log('  Press CTRL-C to stop\n');
});

//Web sockets setup
let io = require('socket.io')(server);
io.on('connection', socket => {
	console.log('Connected...');
	socket.on('disconnect', function() {
		console.log('Disconnected.');
	});
});
app.set('socketio', io);

//Status monitor uses it's own socket.io instance by default, so we need to
//pass our instance as a parameter else it will throw errors on client side
app.use(expressStatusMonitor({ websocket: io, port: app.get('port') }));

module.exports = app;
