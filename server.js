var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    app = express(),
    port = 8888;

app.use(express.static(__dirname));
app.use(express.directory(__dirname));

var options = {
    key: fs.readFileSync('node_modules/key.pem'),
    cert: fs.readFileSync('node_modules/cert.pem'),
};

var server = https.createServer(options, app).listen(port, function(){
  console.log("Server listening on " + port);
});

app.get('/', function (req, res) {
    res.writeHead(200);
    res.end();
});