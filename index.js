var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+'/public'));


var fortune = require('./lib/fortune.js');

app.use(function(req,res,next){
	res.locals.showTests= app.get('env') !== 'production' && req.query.test==='1';
	next();
});


app.get('/', function(req,res){
	res.render('home');
});

app.get('/about', function(req,res){
	res.render('about', {
		fortune:fortune.getFortune(),
		pageTestScript: '/qa/test-about.js'
	});
});

app.get('/tour/hood-river', function(req,res){
	res.render('tour/hood-river');
});

app.get('/tour/request-group-rate', function(req,res){
	res.render('tour/request-group-rate');
});

app.use(function(req,res){
	//res.type('text/plain');
	res.status(404);
	//res.send('404 - Not Found');
	res.render('404');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	//res.type('text/plain');
	res.status(500);
	//res.send('500 - Server Error');
	res.render('500'); 

});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'
	+ app.get('port') +'; press Ctrl-C to terminate');
});
