var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jettison');
var pub = __dirname + '/public';
var app = express.createServer();
app.use(express.compiler({
    src: pub,
    enable: ['less', 'sass', 'coffeescript']
}));
app.use(app.router);
app.use(express.static(pub));
app.use(express.errorHandler({
    dump: true,
    stack: true
}));
app.set('views', __dirname + '/views');
app.register('.hbs', require('hbs'));
app.set('view engine', 'hbs');
app.set('view options', {
    layout: true
});
app.get('/', function(req, res) {
    res.render('index');
});
var port = process.env.PORT || 3000;
app.listen(port);

var Project = require('../models/project.js');

var client = ldap.createClient({
  url: 'ldap://10.100.11.139:1389'
});

client.bind('cn=root', 'secret', function(err) {
  assert.ifError(err);
});