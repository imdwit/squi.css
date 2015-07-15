var fs = require('fs');
var through = require('through2');
var split = require('split');
var output = fs.createWriteStream('./css/all.css');

var stream = fs.createReadStream('./css/main.css');
stream.on('error', function(err) {
	console.log('stream err', err);
})
var tr = through(function(buf, _, next) {
	var that = this;
	var line = buf.toString();
	var i = line.indexOf('"');
	var j = line.lastIndexOf('"');
	var src = line.substring(i + 1, j);

	var css = fs.createReadStream('./css/' + src);
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
	
})

stream.pipe(split()).pipe(tr).pipe(output);

stream.on('end', function() {
	console.log('fin');
});
// stream.pipe(process.stdout);
