## 提高nodejs 稳定性：

1. 保持良好的代码结构：

    我们知道node是单线程，非阻塞io，默认就是异步，通过回调的方式处理后面的流程，如果嵌套的层次太多了，势必会引起代码逻辑结构的混乱，
    也不利于维护和升级，可以采用 async 这个异步流程控制模块，来理清我们的代码逻辑。

2. 使用 process.on('uncaughtException', function(err){...}); 来处理未被捕捉的错误。

3. 使用try~catch 来捕获异常：

    这个只能解决一部分问题，不是万能的，在上面说到因为node是单线程，非阻塞io，默认就是异步，通过回调的方式处理后面的流程，
    try~catch 是不能捕获的callback 里面的error的错误的，怎么捕获到callback里面的错误呢 ? 可以采用domain模块

4. 使用domain模块来处理程序的异常

    先看看对domain的解释：domain 是  EventEmitter 类的一个子类。监听它的 error 事件来处理它捕捉到的错误。
    它提供了一种方式，即以一个单一的组的形式来处理多个不同的IO操作。如果任何一个注册到domain的事件触发器或回调触发了一个‘error’事件，
    或者抛出一个错误，那么domain对象将会被通知到。而不是直接让这个错误的上下文从`process.on（'uncaughtException'）'处理程序中丢失掉，
    也不会致使程序因为这个错误伴随着错误码立即退出。

* 如何使用domain 模块呢？看一个例子：

        serverDomain.run(function() {
          // 服务器在serverDomain的作用域内被创建
          http.createServer(function(req, res) {
            // req和res同样在serverDomain的作用域内被创建
            // 但是，我们想对于每一个请求使用一个不一样的域。
            // 所以我们首先创建一个域，然后将req和res添加到这个域上。
            var reqd = domain.create();
            reqd.add(req);
            reqd.add(res);
            reqd.on('error', function(er) {
              console.error('Error', er, req.url);
              try {
                res.writeHead(500);
                res.end('Error occurred, sorry.');
              } catch (er) {
                console.error('Error sending 500', er, req.url);
              }
            });
          }).listen(1337);
        });

        说明：首先创建一个域（domain.create()），然后将需要监控的分发器添加到该域上，最后给域绑定一个错误事件，这样就可以监控了。

        var d = domain.create();
        d.on('error', function(er) {
          console.error('Caught error!', er);
        });
        d.run(function() {
          process.nextTick(function() {
            setTimeout(function() { // 模拟几个不同的异步的东西
              fs.open('non-existent file', 'r', function(er, fd) {
                if (er) throw er;
                // 继续。。。
              });
            }, 100);
          });
        });

        说明：首先创建一个域，给域绑定一个错误事件，然后在域的上下文提供可以运行的函数

* 如果对于回调呢？可以这么使用

        var d = domain.create();

        function readSomeFile(filename, cb) {
          fs.readFile(filename, 'utf8', d.bind(function(er, data) {
            // if this throws, it will also be passed to the domain
            return cb(er, data ? JSON.parse(data) : null);
          }));
        }

        d.on('error', function(er) {
          // an error occurred somewhere.
          // if we throw it now, it will crash the program
          // with the normal line number and stack message.
        });
        var d = domain.create();

        function readSomeFile(filename, cb) {
          fs.readFile(filename, 'utf8', d.intercept(function(data) {
            return cb(null, JSON.parse(data));
          }));
        }

        d.on('error', function(er) {
          // an error occurred somewhere.
          // if we throw it now, it will crash the program
          // with the normal line number and stack message
        });
        这个函数与 domain.bind(callback) 几乎一模一样。但是，除了捕捉被抛出的错误外，它还会拦截作为第一参数被传递到这个函数的 Error 对象。

5. 使用log4js 模块记录日志

    log4js 是一个非常强大的日志管理工具，在可以看看github这个项目： https://github.com/nomiddlename/log4js-node

6. 使用forever 模块来管理nodejs

    forever 是服务端管理nodejs 的一个模块，一个命令行工具，能够启动，停止app 应用。 forever完全是基于命令行操作，在forever进程管理之下，
    创建node的子进程，通过monitor监控node子进程的运行情况，一旦文件更新，或者进程挂掉，forever会自动重启node服务器，确保应用正常运行。非常的好用.

    可以关注下这个项目： https://github.com/nodejitsu/forever

    * 但是forever 也不是万能的，也由下面这些问题：

        有限的监控和日志功能
        进程管理配置的支持差
        不支持集群
        代码库老化(意味着在升级node.js时频繁的失败)
        附本文测试代码：https://github.com/yupeng528/node-error