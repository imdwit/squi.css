var fs = require('fs');
var through = require('through2');
var split = require('split');
var single = /'(.*)'/;
var dbl = /"(.*)"/;
var output = fs.createWriteStream('./css/all.css');

var stream = fs.createReadStream('./css/main.css');

stream.on('error', function(err) {
	console.log('stream err', err);
});

var tr = through(function(buf, _, next) {
	var that = this;
	var line = buf.toString();
	var src = line.match(single) || line.match(dbl);
	if(!src || !src[1]) {
		return next();
	}

	var url = './css/' + src[1];
	var css = fs.createReadStream(url);
	var str = '';

	css
		.on('data', function(data) {
			str += data.toString();
		})
		.on('error', function(err) {
			next(err);
		})
		.on('end', function() {
			that.push(str.trim());
			next();
		});
});

tr.on('error', function(err) {
});

stream.pipe(split()).pipe(tr).pipe(output);

stream.on('end', function() {
	console.log('fin');
});
// stream.pipe(process.stdout);
