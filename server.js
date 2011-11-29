var express = require('express');
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