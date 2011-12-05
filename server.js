var assert = require('assert');
var express = require('express');
var mongoose = require('mongoose');

var ldap = require('ldapjs');
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

var Project = require('./models/project.js');

var client = ldap.createClient({
  url: 'ldap://10.100.11.139:389'
});

client.bind('CN=SubversionAuth,CN=Users,DC=MOXIEINTERACTIVE,DC=LOCAL', 'Password1', function(err, res) {
	assert.ifError(err);
});

var opts = {
	filter: '(objectCategory=person)',
	scope: 'sub',
	attributes: ['displayName', 'givenName', 'sn', 'sAMAccountName', 'mail']
};

client.search('OU=Moxie-Users,DC=MOXIEINTERACTIVE,DC=LOCAL',opts, function(err,res){
	assert.ifError(err);
	res.on('searchEntry', function(entry) {
		console.log('entry: ' + JSON.stringify(entry.object));
	});
	res.on('searchReference', function(referral) {
		console.log('referral: ' + referral.uris.join());
	});
	res.on('error', function(err) {
		console.error('error: ' + err.message);
	});
	res.on('end', function(result) {
		console.log('status: ' + result.status);
	});
})