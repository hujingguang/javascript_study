'use strict'
var http = require('http')
var url = require('url')
var fs =  require('fs')
var path = require('path')

var root = path.resolve(process.argv[2] || '.')


var server = http.createServer(function(request,response){
    var filepath = path.join(root,request.url.split('?')[0])
    console.log(filepath);
    fs.stat(filepath, function(err,stats){
	if(!err && stats.isFile()){
	    var filestream = fs.createReadStream(filepath);
	    response.writeHead(200);
	    filestream.pipe(response);
	}else{
	    response.writeHead(404,{'Content-Type':'application/json'});
	    response.end();
	}
    })

})

server.listen(8888);
