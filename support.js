// console.log("进程 " + process.argv[2] + " 执行。" );
// console.log(process);
var express = require('express');
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var app = express();
if(cluster.isMaster){
		//是master进程
      console.log(`主进程 ${process.pid} 正在运行`,numCPUs);
      console.log('[master] ' + "master started, pid:" + process.pid);

      cluster.on('fork', function (worker) {
	        console.log('[master] ' + 'fork: worker' + worker.id,);//worker.process
	    });

	    cluster.on('online', function (worker) {
	        console.log('[master] ' + 'online: worker' + worker.id);
	    });

	    cluster.on('listening', function (worker, address) {
	        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', address:' + address.address + ":" + address.port);
	    });

	    cluster.on('disconnect', function (worker) {
	        console.log('[master] ' + 'disconnect: worker' + worker.id);
	    });

	    cluster.on('exit', function (worker, code, signal) {
	        console.log('[master] ' + 'exit worker' + worker.id + ' died, try to fork a new worker.');
	        //cluster.fork();
	    });
	    cluster.on('message',function (worker){
	    	console.log('[master] ' + 'received msg lixiaolong:' + 'from worker' + worker.id);
	    })
        // 衍生工作进程。
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        for(const id in cluster.workers){
        	//console.log(id);
        	cluster.workers[id].on('message',function (msg){
        		//console.log('[master] ' + 'received msg:' + msg + 'from worker' + id);
        	})
        }


        function eachWorker(callback) {
	        for (var id in cluster.workers) {
	            callback(cluster.workers[id]);
	        }
	    }

	    var i = 0;
	    setTimeout(function () {
	        eachWorker(function (worker) {
	            i++;
	            worker.send('[master] ' + 'send msg ' + i + ' to worker' + worker.id);
	        });
	    }, 3000);
  //       cluster.on('exit', (worker, code, signal) => {
  //           console.log(`工作进程 ${worker.process.pid} 已退出`);
  //       });
  //       cluster.on('disconnect',(worker, code, signal)=>{
  //       	console.log(worker, code, signal);
  //       })
        // cluster.fork().on('disconnect',(worker, code, signal)=>{
        // 	console.log(worker, code, signal);
        // })
  //       cluster.on('error',function(worker, code, signal){
  //       	console.log(worker, code, signal);
  //       })
        // cluster.fork().on('listenling',(address)=>{
        //  	console.log(address);
        // })
  //       process.on('message', (msg) => {
		//     process.send(msg);
		// });
    //     const worker = cluster.fork();
  		// let timeout;
  		// worker.on('listenling',(address)=>{
  		// 	worker.send('shutdown',function(){
  		// 		console.log(1);
  		// 	});
    // 		worker.disconnect();
    // 		timeout= setTimeout(()=>{
    // 			worker.kill();
    // 		},2000);
  		// });
  		// worker.on('disconnect',function(){
  		// 	clearTimeout(timeout);
  		// })
    }else if(cluster.isWorker){
    	//是worker进程
		console.log('[worker] ' + "worker" + cluster.worker.id + " started, pid:" + process.pid);
    	app.listen(process.pid);
    	console.log(`工作进程 ${process.pid} 已启动`);
    	app.get('/',function(req,res,next){
    		res.send('李小龙');
    	})
  //       // const http = require('http');
  //       // // console.log(1111)
  //       // http.createServer((req, res) => {
  //       //     res.writeHead(200);
  //       //     res.end('LIXIAOLONG\n');
  //       // }).listen(8000);
		// process.on('message',function(msg){
		// 	console.log(msg);
		// })
		process.on('message', function (msg) {
	        console.log('[worker] worker' + cluster.worker.id + ' received msg:' + msg);
	        process.send('[worker] send msg ' + cluster.worker.id + ' to master.');//向master发送消息
	    });
	    process.on('online',function (worker){
	    	console.log('[worker] worker' + 'online: worker' + worker.id);
	    })
	    process.on('listening',function(){
	    	console.log('[worker] worker' + 'listening: worker' + worker.id);
	    })
	    process.on('disconnect',function(){
	    	console.log('[worker] worker' + 'disconnect: worker' + worker.id);
	    })
	    process.on('exit',function(){
	    	console.log('[worker] worker' + 'exit: worker' + worker.id);
	    })
        
      process.on('SIGUSR1',function (str){
        console.log('Bye-'+str)
          //process.exit(0); //退出或关闭当前进程
      })
      process.emit('SIGUSR1', 'Bye')

      process.on('beforeExit',function(){
          console.log('程序退出之前')
      })
      process.exitCode = 2;
      process.on('SIGINT',function (code){ //程序退出之前被促发
            console.log('程序即将退出'+code)
            process.exit(0)
      })
        process.stdin.resume();
        process.on('uncaughtException', function() {
            console.log('捕获到一个异常');
        });
        nonexistentFunc();//触发异常捕获 也可自动触发当有异常情况的时候

    process.on('warning', (warning) => {
      console.warn(warning.name);    // 打印告警名称
      console.warn(warning.message); // 打印告警信息
      console.warn(warning.stack);   // 打印堆栈信息
    });
    process.emitWarning('警告')


    //console.log(process.version) //
    }else{
    	console.log('其他')
    }