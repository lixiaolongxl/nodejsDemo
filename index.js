var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();
var admin = express();

const child_process  = require('child_process');
const { exec } = require('child_process');
const assert = require('assert');
const crypto = require('crypto');
const dgram = require('dgram');
const dns = require('dns');
const events = require('events');
const os = require('os');
const path = require('path');
const querystring = require('querystring');
const readline = require('readline');
const stream = require('stream');
const { StringDecoder } = require('string_decoder');//用于把 Buffer 对象解码成字符串
const tls = require('tls');//安全传输https服务器搭建
const tty = require('tty');//终端
const url = require('url');
const util = require('util');
const v8 = require('v8');
const vm = require('vm');
const zlib = require('zlib');//压缩解压

//const winRar = require('win-rar').aync;//异步方法sync同步
var r1 = express.Router({
    caseSensitive:false,
    mergeParams:false,
    strict:false
});
var router = express.Router();
app.set("views", __dirname + "/views");
app.set("json spaces",4)
app.set("view engine", "jade");
app.set('李小龙',false);
app.set('trust proxy',function(ip){ //设置反响代理
    if(ip==='172.0.0.1') return true;
    else return false;
});
app.use(express.static(__dirname + '/public'));
http.createServer(app).listen(8888);//f返回一个server对象
https.createServer(app).listen(8887);
app.listen(8080);
console.log(this,11111)
console.log('服务器开启成功请访问http://localhost:8080')
//https服务器搭建需要ssh证书
// app.all("*", function(request, response,next){
// 	console.log(request.ip)
// 	next();
// },function(request, response,next){
//     console.log(11111)
//     next();
// },function(){
//     console.log(2222)

// })
app.locals.title = 'My App';
app.use("/home",function(request, response,next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world!\n");
  //for(var i=0; i<3; i++) {
        // var workerProcess = child_process.exec('node support.js '+i,function (error, stdout, stderr) {
        //     if (error) {
        //         console.log(error.stack);
        //         console.log('Error code: '+error.code);
        //         console.log('Signal received: '+error.signal);
        //         console.log('lixiaolong');
        //     }
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        // });

        // workerProcess.on('exit', function (code) {
        //     console.log('子进程已退出，退出码 '+code);
        // });

        // exec('node support.js [1,2,3,4,5]',{
        //     encoding: 'utf8',
        //     timeout: 0,
        //     maxBuffer: 200 * 1024,
        //     killSignal: 'SIGTERM',
        //     cwd: null,
        //     env: null},function(error, stdout, stderr){
        //     if(error){
        //         console.error(`exec error: ${error}`);
        //         return;
        //     };
        //     console.log(`stdout: ${stdout}`);
        //     console.log(`stderr: ${stderr}`);
        // })
        var workerProcessspawn = child_process.spawn('node', ['support.js']);
        workerProcessspawn.stdout.on('data', function (data) {
           console.log('stdout11: ' + data);
        });

        workerProcessspawn.stderr.on('data', function (data) {
           console.log('stderr: ' + data);
        });
        workerProcessspawn.stdin.on('data', function (data){
            console.log('stdin: ' + data);
        });
        workerProcessspawn.on('message',function (data){
            console.log(data)
        })
        workerProcessspawn.on('close', function (code) {
           console.log('子进程已退出，退出码 '+code);
        });
        // for(var i=0; i<3; i++) {
        //     var worker_process = child_process.fork("support.js", [i]);

        //     worker_process.on('close', function (code) {
        //        console.log('子进程已退出，退出码 ' + code);
        //     });
        // }
    //}
  next();
});
app.use("/about/a",function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  response.redirect("http://www.baidu.com");
  console.log(request.originalUrl); // '/admin/new'
    console.log(request.baseUrl); // '/admin'
    console.log(request.path);// '/new'
  next();
});
app.get('/a', function (req, res, next) {
  console.log(app.locals.title);
  //Buffer类的实例
  const buf5 = Buffer.from([1,2,3,4]);
  const buf4= Buffer.from(buf5);
  const buf = Buffer.allocUnsafe(5).fill(0);
  console.log(buf);
  console.log(buf4);
  res.send('Hello world!');
  var a = Buffer.from('hello world', 'ascii');
  console.log(a.toString('base64'));
  const arr = new Uint16Array(2);
    arr[0] = 5000;
    arr[1] = 4000;
  const buf1 = Buffer.from(arr);

    // 与 `arr` 共享内存
    const buf2 = Buffer.from(arr.buffer);
    // 输出: <Buffer 88 a0>
    console.log(buf1);
    // 输出: <Buffer 88 13 a0 0f>
    console.log(buf2);
    const buff = Buffer.from([1, 2, 3]);
    console.log(buff);
    for (const b of buff) {
      console.log(b);
    }
    const bufall = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
    // 输出: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
    console.log(bufall);
    const str = '\u00bd + \u00bc = \u00be';
    console.log(`${str}: ${str.length} 个字符, ` +`${Buffer.byteLength(str, 'utf8')} 个字节`);
    const buf11 = Buffer.alloc(10);
    const buf22 = Buffer.alloc(14);
    const buf33 = Buffer.alloc(18);
    const bufA = Buffer.concat([buf11, buf22, buf33], 100);
    console.log(bufA.length);
    next();
});
app.get('/customer', function(req, res, next){
    //console.log(this)
    console.log(this.process,1111)
    console.log(process,2322)
    //console.log(app)
  res.send('customer page');
});
app.get('/admin', function(req, res, next){
    console.log(app.get('李小龙'));
  res.send('admin page');

});
app.get("/hello:who?", function(req, res, next){
	console.log(req.params.who)
	if(req.params.who) {
    	res.end("Hello, " + req.params.who + ".");
	}else {
    	res.send("Hello, Guest.");
	}
});
// admin.on('mount',function(parent) {

//     console.log(parent);
//     console.log(2222);
//     console.log(app);
// });
admin.get('/',function(req,res){
    console.log(admin.mountpath,3);
    res.send('ceshi');
});
app.use('/admines',admin);
console.log(app.path(),1);
console.log(admin.path(),2);
// app.delete('/delete', function(req, res) {
//     res.send('DELETE request to homepage');
// });
app.param('id', function(req, res, next, id) {
    console.log('CALLED ONLY ONCE',id);
    next();
});
app.get('/user/:id', function(req, res, next) {
    console.log('although this matches');
    next();
});
app.get('/user/:id', function(req, res) {
    console.log('and this mathces too');
    res.end('22222');
});
app.route('/events')
.all(function(req, res, next){
    console.log('all')
    next()
})
.get(function(req, res, next){
    console.log('get')
    const obj1 = {
      a: {
        b: 1
      }
    };
    const obj2 = {
      a: {
        b: 2
      }
    };
    var test = assert.deepEqual(obj1,obj1);
    assert.deepEqual({ a: 1 }, { a: '1' });
    //assert.deepStrictEqual({ a: 1 }, { a: '1' });//做深度比较；
    assert.doesNotThrow(
            ()=>{
                throw new TypeError('错误信息1');
            },
            SyntaxError
        )
    console.log(test)
    res.send('测试');
    next()
})
.post(function(req, res, next){ss
    console.log('post')
    next()
});
r1.use(function(req,res,next){
    console.log('李小龙');
    next();
})
r1.param('id',function(req,res,next){
    console.log('param')
    next();
})
r1.get('/user:id',function(req,res,next){
    console.log(req.baseUrl);
    console.log(app.mountpath,req.body,req.cookies);
    console.log(req.hostname,req.ptotocol);
    console.log(req.query.name,req.secure,req.accepts(['json', 'text']),res.get('Content-type'),req.is('html'))

    //res.end('router');
    res.locals.id = req.params.id;
    res.append('Set-Cookie', 'foo=bar;Path=/;HttpOnly');
    res.cookie('name', 'tobi', {'domain':'.example.com', 'path':'/admin', 'secure':true});
    res.cookie('remenberme', '1', {'expires':new Date(Date.now() + 90000), 'httpOnly':true});
    //res.append('Lind', ['<http://localhost>', '<http://localhost:3000>']);
    console.log(res.headersSent)
    //res.attachment('path/to/logo.png');
    //console.log(res.type());
    res.download('/testrouter/user:id','imgs/logo.png',function(err){
        console.log(err,11111)
    });
    //res.send('user' + req.params.id);
    res.vary('User-Agent').send('docs');//判断是否命中缓存；
    console.log(res.headersSent)
    console.log(res.locals);

    //console.log(res.type());
    next();
});
r1.get('/li',function(req,res,next){
    req.accepts('application/json');
    console.log(res.type('html'))
    //console.log(req.headers)
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','*');//设置跨域。

    // req.writeHead(200,{
    //     'Content-Type':'application/json'
    // })
    console.log(res.get('Content-Type'))
    res.format({
    'text/plain':function() {
        res.send('hey');
    },
    'text/html':function() {
        res.jsonp({
            a:1,
            b:3,
            c:4
        });

        // res.sendFile('./imgs/logo.png',function(err){
        //     console.log(err)
        // })
    },
    'application/json':function() {
        res.send({message:'hey'});
    },
    'default':function() {
        res.status(406).send('Not Acceptable');
    }
    //next();
});
});
r1.get('/file/:name',function(req,res,next){
    var options = {
        root:__dirname + '/public/imgs',
        dotfile:'deny',
        headers:{
            'x-timestamp':Date.now(),
            'x-sent':true
        }
    };
    var fileName = req.params.name;
    res.sendFile(fileName, options, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('sent', fileName);
        }
    });
})
router.get('/test',function(req,res,next){
    var worker_process = child_process.fork("support.js");

    worker_process.on('close', function (code) {
       console.log('子进程已退出，退出码 ' + code);
    });
    worker_process.on('message',function(data){
        console.log(data)
    });
    res.send('cluster');
    next();
});
router.get('/console',function(req,res,next){
    res.send('consoleTest')
    // console.log('你好世界')
    // console.error(new Error('错误信息'));
    // console.warn('警告信息')
    // console.time('100-elements');
    // for (var i = 0; i < 100; i++) {
    //   ;
    // }
    // console.timeEnd('100-elements');
    //  var obj={
    //     name:"cuiyanwei",
    //     age:24,
    //     eat:function(){

    //     }
    // }
    // console.trace(obj);
    // console.dir(obj);
    const { Console } = require('console');
    const console = new Console();
    console.log('nihao');
    });
router.get('/crypto',function(req,res,next){
    const crypto = require('crypto');

    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                       .update('I love cupcakes')
                       .digest('hex');
    console.log(hash);
    const hashmd5 = crypto.createHash('md5',secret).update('I love cupcakes').digest('hex');
    console.log(hashmd5);
    res.send('cryptoTest')

    const cipher = crypto.createCipher('aes192', 'a password');
    const hast3 = crypto.createHmac('sha512', secret).update('I love cupcakes').digest('hex');
    console.log(hast3);
    next();
});
router.get('/',function(req,res,next){
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
    //     port: 8100,
    //     exclusive: true
    // });
    res.send('socket')

    var worker_process = child_process.fork("socket.js");

    worker_process.on('close', function (code) {
       console.log('子进程已退出，退出码 ' + code);
    });
        // var workerProcess = child_process.exec('node socket.js ',function (error, stdout, stderr) {
        //     if (error) {
        //         console.log(error.stack);
        //         console.log('Error code: '+error.code);
        //         console.log('Signal received: '+error.signal);
        //         console.log('lixiaolong');
        //     }
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        // });
});
router.get('/a',function(req,res,next){
    const servers = dns.getServers();
    console.log(servers);
    dns.lookup('www.baidu.com',(e,address,family)=>{
        if(e) throw e;
        console.log('百度网站的IP地址是：'+address+'地址协议族是：IPV'+family)
    })

    dns.lookup('www.baidu.com',{family:4,all:!0,hints:dns.ADDRCONFIG|dns.V4MAPPED},(err,addresses)=>{
        if(err) throw err;
        addresses.forEach((ele,idx,arr)=>{
            console.log('百度网站的IP地址'+(idx+1)+'是：'+ele.address);
        });
    });

    dns.lookupService('127.0.0.1',8888,(err,hostname,service)=>{
        if(err) console.log(err);
        console.log('该IP对应的主机为：'+hostname+' 协议为:'+service);
    });

    dns.resolve('www.qq.com','A',(err,address)=>{
        if(err) throw err;
        console.log(address);//结果为[ '14.17.32.211', '14.17.42.40', '59.37.96.63' ]
    });
    //获取IPV6
    dns.resolve('www.qq.com','AAAA',(err,address)=>{
        if(err) throw err;
        console.log(address);//结果为[ '240e:ff:f040:28::a' ]
    });
    //获取SOA信息
    dns.resolve('www.qq.com','SOA',(err,address)=>{
        if(err) throw err;
        console.log(address);
        //结果为
        // { nsname: 'ns-tel1.qq.com',
        //   hostmaster: 'webmaster.qq.com',
        //   serial: 1380440321,
        //   refresh: 300,
        //   retry: 600,
        //   expire: 86400,
        //   minttl: 300 }
    });
    //获取别名CNAME
    dns.resolve('www.baidu.com','CNAME',(err,address)=>{
        if(err) throw err;
        console.log(address);//结果为[ 'www.a.shifen.com' ]
    });

    dns.reverse('114.114.114.114',(err,hostnames)=>{
        if(err) throw err;
        console.log(hostnames,'aaaa');//结果为[ 'public1.114dns.com' ]
    });

    next();
})
router.get('/emirrer',function (req,res,next){

    var event = new events.EventEmitter();
    event.on('clickevent', function (event) {
        console.log('clickevent 事件触发了')
    });
    setInterval(()=>{
        //event.emit('clickevent') //主动触发事件兵监听事件
    },1000)
    var listern1 = function (arg1, arg2){
        console.log('listener1', arg1, arg2);
    }
    event.on('someEvent', listern1);
    event.on('someEvent', function (arg1, arg2) {
        console.log('listener2', arg1, arg2);
    });
    event.addListener('someEvent',function (arg1, arg2){//添加时间监听
        console.log('listener3', arg1, arg2);
    })
    console.log('监听数量'+events.EventEmitter.listenerCount(event,'someEvent'));//查看监听的数量
    console.log('默认监听数'+ events.EventEmitter.defaultMaxListeners)
    event.setMaxListeners(5) //设置事件默认监听的个数
    console.log(event.getMaxListeners()) //获取事件默认监听的个数
    console.log(event.eventNames()) //返回一个列出触发器已注册监听器的事件的数组。 数组中的值为字符串或符号。
    event.once('someEvent', function (arg1, arg2){
        console.log('listener4once', arg1, arg2);
    })

    event.on('error',(err)=>{
        console.log(err)
    })
    //event.removeListener('someEvent',listern1);//删除注册事件
    //event.removeAllListeners('someEvent'); //移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

    //event.setMaxListeners(1)//用于提高监听器的默认限制的数量。
    event.emit('someEvent', 'arg1 参数', 'arg2 参数'); //返回布尔值

    event.once('newListener',(event1,listern1)=>{//将其添加到同名监听器的前面
        event.on('event1',()=>{
            console.log('B');
        })
    })
    event.on('event1',function(){
        console.log('A');
    });
    event.emit('event1');



    //event.emit('error',new Error('系统异常')); //我们在遇到 异常的时候通常会触发 error 事件。
    console.log(event.listeners('someEvent'));//返回指定事件的监听器数组。
    console.log(event.listenerCount('someEvent')) //回正在监听名为 eventName 的事件的监听器的数量。

    // var count = event.listerCount(event,'someEvent');
    // console.log(count)
    event.prependListener('someEvent', (stream) => {
       console.log('有连接！');
    });
    event.prependOnceListener('someEvent', (stream) => {
       console.log('首次调用！');
    });

    event.emit('someEvent');

    res.send('enentEmitter')
    next();
});
router.get('/fs',function (req,res,next){
    //读取文件，不存在就创建
    fs.readFile('index.html', function (err, data) {
       if (err) {
           return console.error(err);
       }
       //写入文件

       /*
           fs.writeFile('a.html',data,function(err){
                if(err){
                    console.log('写入失败')
                }
            })
        */
       //console.log("异步读取: " + data.toString());
       //res.end(data.toString())
    });
    //打开文件
    fs.open('index.html','r+',function (err, fd){
        if(err) console.log('文件打开失败')
            //console.log(fd,'文件打开成功')
        //读取BUFF格式的文件
        var buf = new Buffer(1024);
        fs.read(fd,buf,0,buf.length,0,function (err,bytes){
            if(err) console.log('读取失败')
               console.log(bytes + "  字节被读取");
            if(bytes>0){
                console.log(buf.slice(0, bytes).toString())
            }
        })
        //截取文件
            /*fs.ftruncate(fd,100,function (err){
                if (err){
                    console.log('文件截取失败');
                }
                console.log('文件截取成功')
                console.log(fd)

            })*/
        //关闭文件
        fs.close(fd,function (err){
            console.log(err);
        })
        console.log('文件关闭成功')
    })
    //获取文件信息
    fs.stat('index.html',function (err,stats){
        if(err) console.log('文件信息获取失败')
            console.log(stats)
        console.log(stats.isFile(),stats.isDirectory(),stats.isBlockDevice(),stats.isCharacterDevice(),stats.isSymbolicLink(),stats.isFIFO(),stats.isSocket());
    })
    //写入文件如果文件不存在则创建文件
    fs.writeFile('a.html','',function(err){
        if(err){
            console.log('写入失败')
        }
    })
    //删除文件
    fs.unlink('a.html',function (err){
        if(err) console.log('删除失败')
            console.log('删除成功')
    })

    //创建目录
    fs.mkdir(__dirname+'/test.html',function (err){
        if(err){
            console.log(err);
        }else{
            console.log("目录创建成功。");
        }

    })
    //读取文件目录
    fs.readdir(__dirname,function (err,data){
        if(err){
            console.log("读取文件目录失败");
        }else{
            console.log("读取文件目录成功",data);
        }
    })
    //删除目录

    /*fs.rmdir(__dirname+'/fs',function(err){
        if(err){
            console.log(err);
        }else{
            console.log("目录删除成功。");
        }
    })*/
    res.send('fs')
    next();
});
router.get('/global',function(eq,res,next){
    //__filename： 返回当前模块文件的绝对路径（带文件名）
    //__dirname： 返回当前模块文件所在目录的绝对路径
    console.log(__filename)
     console.log(__dirname)
    res.send('global')
    next();
});
const obj = require('./test/a.js')
router.get('/http',function(eq,res,next){
    //__filename： 返回当前模块文件的绝对路径（带文件名）
    //__dirname： 返回当前模块文件所在目录的绝对路径
    console.log(obj.test(2));
    res.send('http')
    next();
});
router.get('/os',function (req,res,next){
    console.log(os.EOL,1111) //定义操作系统相关的行末标志:
    console.log(os.arch()) //表明Node.js 二进制编译 所用的 操作系统CPU架构.
    //console.log(os.constants) //返回一个包含错误码,处理信号等通用的操作系统特定常量的对象
    console.log(os.cpus()) //方法返回一个对象数组, 包含每个逻辑 CPU 内核的信息.
    console.log(os.endianness()) //返回一个字符串,表明Node.js二进制编译环境的字节顺序.
    console.log(os.freemem()) //返回系统内存总量，单位为字节
    console.log(os.homedir()) //返回当前用户的home目录.
    console.log(os.hostname()) //返回操作系统的主机名.
    console.log(os.loadavg()) //方法返回一个数组,包含1, 5, 15分钟平均负载.
    console.log('*****网卡信息*******');
    const networksObj = os.networkInterfaces(); //方法返回一个对象,包含只有被赋予网络地址的网络接口.
    for(let nw in networksObj){
        let objArr = networksObj[nw];
        console.log(`\r\n${nw}：`);
        objArr.forEach((obj,idx,arr)=>{
            console.log(`地址：${obj.address}`);
            console.log(`掩码：${obj.netmask}`);
            console.log(`物理地址：${obj.mac}`);
            console.log(`协议族：${obj.family}`);
        });
    }
    console.log(os.platform()) //指定Node.js编译时的操作系统平台
    console.log(os.release()) // 返回一个字符串, 指定操作系统的发行版.
    console.log(os.tmpdir())  // 表明操作系统的 默认临时文件目录.
    console.log(os.totalmem()) // 方法以整数的形式返回所有系统内存的字节数.
    console.log(os.type()) //返回一个字符串,表明操作系统的名字 操作系统内核
    console.log(os.uptime()) // 在几秒内返回操作系统的上线时间.
    console.log(os.userInfo())//方法当前有效用户的信息
    res.send('ostext')
    next()
})
router.get('/path',function (req,res,next){

    console.log(path.basename('C:\\temp\\myfile.html','.html'))//方法返回一个 path 的最后一部分，类似于 Unix 中的 basename 命令。 没有尾部文件分隔符
    console.log(path.win32.basename('C:\\temp\\myfile.html'))//获去文件路径
    path.delimiter //平台分隔符window是: POSIX是;
    console.log(path.dirname( '/test/util you.mp3')) //获取路径中目录名
    console.log(path.extname('index.html'))//获取路径的扩展名
    console.log(path.format({
        dir: '/home/user/dir',
        base: 'file.txt'
    })) //方法会从一个对象返回一个路径字符串
    //path.isAbsolute() //方法会判定 path 是否为一个绝对路径。
    console.log(path.join('/foo', 'bar', 'baz/asdf','lixiaolong','a.html')) //方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
    console.log(path.normalize('/foo/bar//baz/asdf//lixiaong/a.html')) // 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。
    console.log(path.parse('/home/user/dir/file.txt')); //方法返回一个对象，对象的属性表示 path 的元素。 尾部文件分隔符会被忽略，
    //path.posix 属性提供了 path 方法针对 POSIX 的实现。
    console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')) //回从 from 到 to 的相对路径（基于当前from工作目录）
    console.log(path.resolve('/foo/bar', '/tmp/file/')) //方法会把一个路径或路径片段的序列解析为一个绝对路径。
    //path.sep提供了平台特定的路径片段分隔符：Windows 上是 \POSIX 上是 /
    console.log(path.win32) //提供了 path 方法针对 Windows 的实现。
    res.send('<h1>pathText</h1>');
    next();
})
router.get('/process',function (req,res,next){

    //console.log(process)
    process.on('SIGUSR1',function (str){
        console.log('Bye-'+str())
        //process.exit(0); //退出或关闭当前进程
    })
    process.emit('SIGUSR1', function(){
        return 3
    })
    process.on('beforeExit',function(){
        console.log('程序退出之前')
    })

    process.on('disconnect',function(){
        console.log('disconnect程序退出之前')
    })
    process.on('SIGINT',function (code){
        console.log('程序即将退出'+code)
        process.exit(0)
    })

    console.log(`'当前node实例的版本号'${process.version}`)
    console.log(`'包含安装路径'${process.installPrefix}`)
    console.log(`'列举node运行的操作系统的环境'${process.platform}`)
    console.log(`'包含当前进程运行的时长'${process.uptime()}`)
    //process.getgid(), process.setgid()：获取或者设置group id；
    //process.getuid(), process.setuid()：获取或者设计user id；
    console.log(process.argv)
    console.log(process.execPath);//开启当前进程的执行文件的绝对路径
   // console.log(process.env) //获取当前系统环境信息的对象
    //process.kill(process.pid, 'SIGTERM');//结束对应某pid的进程并发送一个信号
    //process.abort() //触发node的abort事件，退出当前进程
    process.nextTick(function(){console.log('tick')});
    process.nextTick(function(){console.log('tick2')});
    process.nextTick(function(){console.log('tick3')});
    process.nextTick(function(){console.log('tick4')});
    process.nextTick(function(){console.log('tick5')});//相当于回掉函数定时器这样只是没有确定时间 效率要比定时器高
    console.log('end')

    process.stdin.resume();
    var a,b;
    process.stdout.write('请输入a的值: ');
    process.stdin.on('data',function(data){
        if(a == undefined){
            a = Number(data);
            process.stdout.write('请输入b的值: ');
        }else{
            b = Number(data);
            process.stdout.write('结果是: ' + (a+b));
            process.exit(0);//结束进程
        }
    })

    res.send('processText')
    next()
})
router.get('/querystring',function (req,res,next){
    console.log(querystring.escape('呵呵')) //将一个字符转义成一个编码

    console.log(querystring.unescape('%3C%E5%93%88%E5%93%88%3E')) //将一个编码反转义成一个字符

    console.log(querystring.parse('name=pkcms&author=zh&date=')) //将一个查询的字符串反序列化为一个对象，也就是说它与 querystring.stringify 是起相反作用的关系

    console.log(querystring.stringify({
        foo: 'bar',
        baz: ['qux', 'quux'],
        corge: ''})) //将一个对象序列化为一个查询的字符串，中间使用 & 和 = 分别为字符串中的分隔符和赋值符
    res.send('querystringText')
    next();

})
router.get('/readline',function (req,res,next){

    var rl = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    })
    // rl.question('您叫什么名字',function (data){
    //     console.log(`'名字是'${data}`)
    //     rl.close();
    // })
    rl.setPrompt('Test> ');//就是给每一行设置一个提示符，就好比window命令行的>
    rl.prompt();//可以算是最重要的方法了，因为它才体现了Readline的核心作用，以行为单位读取数据
    rl.on('line', function(line){//‘line’事件，这个事件就是在用户输完一行，按下回车后就会触发的事件
        switch(line.trim()) {
            case 'copy':
                console.log("复制");
                break;
            case 'hello':
                rl.write("Write");
                console.log('world!');
                break;
            case 'close':
                rl.close();
                break;
            case 'pause':
                rl.pause();
                break;
            case 'resume':
                rl.resume();
                break;
            default:
                console.log('没有找到命令！');
                break;
        }
        rl.prompt();
    });
    rl.on('pause',function(){
        console.log('输入暂停了')
    })
    rl.on('resume',function(){
        console.log('程序恢复了')
    })

    rl.on('close',function (){
        console.log('程序要结束了哦')
        process.exit(0)
    })
    rl.on('SIGINT',function(){
        rl.question('确定要退出吗？',function(data){
            rl.pause();
        })
    })
    rl.on('SIGCONT',function(){
        rl.question('确定要恢复吗？',function(){
            rl.resume();
        })
    })


    res.send('qreadlingTest')
    next();
})
router.get('/stream',function(req,res,next){
    var readable = fs.createReadStream('./test/a.js',{
        flags: 'r',
        encoding: 'utf8',
        autoClose: true,
        mode: 0666,
    });

    readable.on('open', function(fd){
      console.log('file was opened, fd - ', fd);
    });

    readable.on('readable', function(){
      console.log('received readable');
    });

    readable.on('data', function(chunk){//事件将在流中有数据可供读取时触发。在某些情况下，为 'readable' 事件添加回调将会导致一些数据被读取到内部缓存中。
      console.log('read %d bytes: %s', chunk.length, chunk);
    });

    readable.on('end', function(){
      console.log('read end');
    });

    readable.on('close', function(){
      console.log('file was closed.');
    });

    readable.on('error', function(err){
      console.log('error occured: %s', err.message);
    });


        var writable = fs.createWriteStream('./test/a.js',{
          flags: 'w',
          defaultEncoding: 'utf8',
          mode: 0666,
        });

        writable.on('finish', function(){
          console.log('write finished');
          process.exit(0);
        });

        writable.on('error', function(err){
          console.log('write error - %s', err.message);
        });

        writable.write('My name is 火云邪神', 'utf8');

        writable.end('lixiaolong');
        writable.on('close',function(){
            console.log('文件关闭')
        })
        writable.on('pipe',(src)=>{
            console.log('qqq')
        })
        readable.pipe(writable);



    res.send('streamTest');
    next();
})
router.get('/stringdecoder',function(req,res,next){

    const decoder = new StringDecoder('utf8'); //创建一个新的 StringDecoder 实例。
    const cent = Buffer.from([0xC2, 0xA2]);//返回一个解码后的字符串，并确保返回的字符串不包含 Buffer 末尾残缺的多字节字符，残缺的多字节字符会被保存在一个内部的 buffer 中用于下次调用 stringDecoder.write() 或 stringDecoder.end()。
    console.log(decoder.write(cent));

    const euro = Buffer.from([0xE2, 0x82, 0xAC]);
    console.log(decoder.write(euro));

    decoder.write(Buffer.from([0xE2]));
    decoder.write(Buffer.from([0x82]));
    console.log(decoder.end(Buffer.from([0xAC])));//以字符串的形式返回内部 buffer 中剩余的字节。

    res.send('stringdecoderTest');
    next();
})
router.get('/timer',function (req,res,next){
    //它是基于 Node.js 事件循环构建的。


    setImmediate(function(){
        console.log('Func exec immediately');
    });

    var immediateObj = setImmediate(function() {//即时定时器
        for(var i=0;i<1000;i++) {
            console.log(i);
        }
        console.log('Func exec immediatelyll');
    });
    //clearImmediate(immediateObj);
    //调用 timeout.unref() 会创建一个内部定时器，它会唤醒 Node.js 的事件循环。 创建太多这类定时器可能会对 Node.js 应用程序的性能产生负面影响。
    //timeout.unref();//唤醒定时器的事件循环
    //timeout.ref();//取消定时器的事件循环
    res.send('timerTest');
    next();
})
router.get('/tty',function (req,res,next){
    //console.log(tty.ReadStream)


    res.send('ttyTest');
    next();
})
router.get('/url',function (req,res,next){
    //console.log(tty.ReadStream)
    const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',true,true);
    console.log(myURL)
    //url.format('')//将对象转化为字符串
    console.log(url.format({
        protocol:"http:",
        host:"182.163.0:60",
        port:"60"
    }));
    console.log(url.resolve("http://whitemu.com","gulu")) //返回从根目录指定到当前目录的绝对路径url

    res.send('urlTest');
    next();
})
router.get('/util',function (req,res,next){

    function fn() {
      return  Promise.resolve('hello world');
    }
    const callbackFunction = util.callbackify(fn);
    callbackFunction(function (err,ret){
        if(err) throw err;
            console.log(ret)
    })
    NODE_DEBUG='foo'
    const debuglog = util.debuglog('foo');
    debuglog('hello from foo [%d]', 123);
    var result = util.format('%s:%s', 'foo', 'bar', 'baz'); //格式化字符串
    console.log(result);
    //console.log(util.inspect(util, { showHidden: true, depth: null }));方法返回 object 的字符串表示，主要用于调试。
    function Base(){
        this.name = 'base';
        this.base = 1991;
        this.sayHello = function() {
            console.log('Hello ' + this.name);
        };
    }
    Base.prototype.showName = function(){
        console.log(this.name);
    }

    function Sub(){
        this.name = 'sub';
    }
    util.inherits(Sub, Base); //是一个实现对象间原型继承 的函数。
    var objBase = new Base();
    var objSub = new Sub();
    objSub.showName();





    res.send('utilTest');
    next();
})
router.get('/v8',function (req,res,next){
    console.log(v8.cachedDataVersionTag())//返回一个表示从V8版本，命令行标志和已检测到的CPU功能派生的“version tag”的整数
   // console.log(v8.getHeapSpaceStatistics()) //返回关于v8堆空间的统计,即组成v8堆的片段
   // console.log(v8.getHeapStatistics())//

    //v8.setFlagsFromString('--trace_gc');可以被用来在脚本中设置V8引擎的命令行标识
    //setTimeout(function() { v8.setFlagsFromString('--notrace_gc'); }, 60e3);//可以被用来在脚本中设置V8引擎的命令行标识
    //console.log(v8.serialize('ddf'))//使用DefaultSerializer来序列化value到一个缓冲区中。
    //console.log(v8.deserialize(v8.serialize('ddf'))) //用默认配置来执行DefaultDeserializer从而从一个缓冲区中读取一个JS值
    const Serializer = v8.Serializer;
    const serializer = new Serializer();
    serializer.writeHeader('aaaa');//写出一个包含序列化格式版本的头文件
    serializer.writeValue('eff');//序列化一个JavaScript值并将结果加入内部的缓冲区。
    //console.log(serializer.releaseBuffer())//返回存储里的内部缓冲区
    var buffer = new Buffer(1024);
    const Deserializer = v8.Deserializer;
    const deserializer = new Deserializer(buffer);
    //console.log(deserializer.readHeader())
    //console.log(deserializer.readHeader());
    //console.log(deserializer.readValue())
    res.send('v8Test');
    next();

})
router.get('/vm',function (req,res,next){

    // var vm = require('vm');
    // var sandbox = vm.createContext({}); // Empty Context
    // var code = 'var x = 1;'
    // vm.runInContext(code, sandbox);
    // console.log(sandbox); // {x: 1}

    res.send('vmTest');
    next();
    const sandbox = {
      animal: 'cat',
      count: 2
    };
    const script = new vm.Script('count += 1; name = "kitty";');
    const context = vm.createContext(sandbox);
    for (let i = 0; i < 10; ++i) {
        script.runInContext(context);
    }

    console.log(sandbox);
})
router.get('/zlib',function (req,res,next){


    //文件压缩
    const gzip = zlib.createGzip();
    const inp = fs.createReadStream('input.txt');
    const out = fs.createWriteStream('input.txt.gz');//把input压缩成input.txt.gz

    inp.pipe(gzip).pipe(out);
    //文件解压
    // const gzip = zlib.createGzip();
    // const inp = fs.createWriteStream('input1.txt');
    // const out = fs.createReadStream('input.txt.gz');
    //out.pipe(gzip).pipe(inp);


    out.on('finish',function(data){
        console.log('文件解压缩成功finish')
    })
    out.on('pipe',function(){
        console.log('文件解压缩成功pipe')
    })
    out.on('close',function(){
        console.log('文件解压缩成功close')
    })
    out.on('drain',function(){
        console.log('文件解压缩成功drain')
    })


    //数据压缩
    const input = '.................................';
    zlib.deflate(input, (err, buffer) => {
      if (!err) {
        console.log(buffer.toString('base64'));
      } else {
        // 错误处理
      }
    });
    //数据解压
    const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
    zlib.unzip(buffer, (err, buffer) => {
          if (!err) {
            console.log(buffer.toString());
          } else {
            // 错误处理
          }
    });

    res.send('zlibTest');
    next();
})
router.get('/zip',function (req,res,next){
    console.log(this,1111)
    // console.log(app,2222)
    // console.log(router,3333)
    // var rar = new winRar({
    //     inDir:'./test',
    //     outDir:'./',
    //     name:'text.zip',
    //     cwd:'./test',
    //     cmd:'a',
    //     ny:['-r0'],
    //     filter:function (name){
    //         console.log(name)
    //         return
    //     }
    // })
    // rar.compress();
    res.send('ziptest');
    next();
})
app.use('/testrouter',r1);
app.use('/cluster',router);
app.use('/socket',router);
app.use('/dns',router);
app.use('/event',router)
