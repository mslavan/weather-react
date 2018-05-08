var webpack 			 = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var bodyParser 			 = require('body-parser')
var { Server } 			 = require('http');
var express 			 = require('express')
var path 				 = require('path');

const port   = process.env.PORT || 3000;
const app 	 = express();
const server = Server(app);

var webpackConfig  = require('./config/webpack.js');
var compiler 	   = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

// render index.html file by default
app.get("*", function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html')
})

// start server
server.listen(port,function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port )
  }
})
