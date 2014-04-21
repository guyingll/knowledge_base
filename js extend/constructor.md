## 权威指南extend

        //对象复制公用方法
		function inherit(p){
			if(p == null)
				throw TypeError();

			if(Object.create)
				return Object.create(p);

			var t = typeof p;

			if(t!=="object" && t!== "function")
				throw TypeError();

			function f(){

			}

			f.prototype = p;

			return new f();

		}

		//属性继承公用方法
		function extend(o,p){
			for(prop in p){
				o[prop] = p[prop];
			}

			return o;
		}

		//
		//superclass 父类 constructor 子类构造 methods 子类方法覆盖 statics子类静态属性覆盖
		function defineSubclass(superclass,constructor,methods,statics){
			//js 继承的最关键的两句代码
			//1.子类的原型为 父类的原型示例
			constructor.prototype = inherit(superclass);
			//2.子类的构造类改回是它自己 而不是父类
			constructor.prototype.constructor = constructor;

			//复制方法和属性
			if(methods) extend(constructor.prototype,methods);
			if(statics) extend(constructor.prototype,statics);

			return constructor;
		}

		//Function扩展
		Function.prototype.extend = function(constructor,methods,statics){
			return defineSubclass(this,constructor,methods,statics);
		}

		//创建父对象
		function Set(){
			this.values = {};
			this.n = 0;
		}
		//有个私有方法
		Set.fromArr = function(){
			alert(1);
		}

		//开始创建子类
		var SingletSet = Set.extend(function(value){//子类构造函数
			this.value = value;
		},{
			fromArr : function(){//重写父类方法
				alert(2);
			},
			fromXml : function(){//定义新方法
				alert(3);
			}

		});

		//调用
		var a = new SingletSet("value");
		console.log(a.value);
		a.fromArr();
		a.fromXml();
