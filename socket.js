// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');

// server.on('error', (err) => {
//     console.log(`服务器异常：\n${err.stack}`);
//     server.close();
// });

// server.on('message', (msg, rinfo) => {
//     console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
// });

// server.on('listening', () => {
//     const address = server.address();
//     console.log(`服务器监听 ${address.address}:${address.port}`);
// });

// server.bind({  
//     address: 'localhost',  
//     port: 8001,  
//     exclusive: true  
// });
// //server.bind(8001)
// console.log('socket:localhost:8001')
var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
//var io = require('socket.io')(server);
server.listen(3000,'localhost');
//var http = require('http');
var fs = require('fs');
//app.use(express.static(__dirname + '/public'));
//const count = 0;
// var server = http.createServer (function(req,res){
// 	fs.readFile( __dirname + './public/lxl.html',function (err,data){
// 		res.writeHead(200,{'Content-Type':'text/html'});
//         res.end(data,'utf-8');
// 	})
// }).listen(3000,'localhost')
console.log('Server run 172.0.0.1:3000');
var io = require('socket.io').listen(server);
io.sockets.on('connection',function (socket){
	//count++
	//console.log('connection');
	socket.on('disconnect',function (){
		console.log('disconnect')
	});
	socket.on('leave',function (data){
		console.log(data);
	})
	socket.on('message',function (data){
		console.log(data);
		socket.emit('news',{text:'你上线了',number:1})
	})
	//发给单个用户
	app.get('/socket',function(){
		console.log(1111)
		socket.emit('news',{text:'你上线了',number:1})
	})
	
	//发给所用用户
	//io.emit('message',{text:'你的好某XXX上线了',number:2});
})
