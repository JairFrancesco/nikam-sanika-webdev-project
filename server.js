var express = require('express');
var cors = require('cors');
var app = express();
var test;

var bodyParser = require('body-parser');

app.use(bodyParser.json({type : 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }))

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(cors());

//require ("./test/app.js")(app);
require("./project/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
