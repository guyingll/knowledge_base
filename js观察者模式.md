## js观察者模式

        /**************订阅者/观察者/subscribe************/
        function ObserverList(){
            this.observerList = [];
        };

        //添加
        ObserverList.prototype.Add = function(obj){
            if(this.IndexOf(obj,0)==-1){
                return this.observerList.push(obj);
            }else{
                this.observerList;
            }
        };

        //清空
        ObserverList.prototype.Empty = function(){
            this.observerList = [];
        };

        //统计
        ObserverList.prototype.Count = function(){
            return this.observerList.length;
        };

        //获取
        ObserverList.prototype.Get = function(index){
            if(index>-1 && index<this.observerList.length){
                return this.observerList[index];
            }
        };

        //插入
        ObserverList.prototype.Insert = function(obj,index){
            var pointer = -1;
            if(index===0){
                this.observerList.unshift(obj);
                pointer = index;
            }else if(index === this.observerList.length){
                this.observerList.push(obj);
                pointer = index;
            }
            return pointer;
        };

        //查询位置
        ObserverList.prototype.IndexOf = function(obj,startIndex){
            var i = startIndex,pointer = -1;
            while(i<this.observerList.length){
                if(this.observerList[i]===obj){
                    pointer = i;
                }
                i++;
            }
            return pointer;
        };

        ObserverList.prototype.RemoveIndexAt = function(index){
            if(index===0){
                this.observerList.shift();
            }else if(index===this.observerList.length-1){
                this.observerList.pop();
            }else{
                this.observerList.splice(index,1);
            }
        }

        //扩展对象
        function extend(obj,extension){
            for(var key in obj){
                extension[key] = obj[key];
            }
        }

        /**************发布者/目标/publish****************/
        function Subject(){
            this.observers = new ObserverList();
        }

        Subject.prototype.AddObserver = function(observer){
            this.observers.Add(observer);
        };

        Subject.prototype.RemoveObserver = function(observer){
            this.observers.RemoveIndexAt(this.observers.IndexOf(observer,0));
            console.log(this.observers);
        };

        Subject.prototype.Notify = function(context){
            var observerCount = this.observers.Count();
            for(var i=0;i<observerCount;i++){
                this.observers.Get(i).Update(context);
            }
        };