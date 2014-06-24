 ##  js Apply call模拟

        Function.prototype.Apply = function(obj, arr) {
            obj = obj || window;
            obj._tempFunction = this;
            var rv;
            if (!arr) {
                rv = obj._tempFunction();
            }else {
                var args = [];
                for (var i = 0, len = arr.length; i < len; i++) args.push('arr[' + i + ']');
                rv = eval("obj._tempFunction(" + args + ")");
            }
            delete obj._temFunction;
            return rv;
        }
        Function.prototype.Call = function() {
            return this.Apply(Array.prototype.shift.Apply(arguments), arguments);
        }

        var obj = {};
        function f(a,b,c) {
            alert(this == obj);//看看Apply和Call 是不是把函数内的this 指向了 obj对象
            alert(a + b + c);
        }
        f(1, 2, 3);
        f.Apply(obj, [4, 5, 6]);
        f.Call(obj, 7, 8, 9);