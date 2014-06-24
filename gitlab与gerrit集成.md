# 事件

本文会介绍很多与事件有关的东西,虽然我的出发点有那么点一网打尽的意思,不过也难以盖全.所以就把最常用,最基本也相对重要的内容拿出来记录一下.

## Javascript绑定事件的方式

### 传统的事件绑定

因为各种历史原因,事件的绑定在不同的浏览器总是有不同的写法,当然现在可能大多数人都已经习惯于jQuery的事件绑定,
而不清楚javascript的原生事件绑定是什么样子.非常传统的事件的绑定方式,是在一个元素上直接绑定方法,

        element.onclick = function(e){}
        <body>
        <input type="button" id="bt" name="bt button" value="this is a button">
        <script>
          var bt = document.getElementById("bt");
          bt.onclick = function(e){
            alert("this is a alert");
            alert(e.currentTarget.name);
          }
        </script>
        </body>

这是传统的事件绑定,它非常简单而且稳定,适应不同浏览器.e表示事件,this指向当前元素.但是这样的绑定只会在事件冒泡中运行,捕获不行.
一个元素一次只能绑定一个事件函数.

### W3C方式的事件绑定

W3C中推荐使用的事件绑定是用addEventListener()函数,

        element.addEventListener('click',function(e){...},false)

上代码:

        <body>
            <input type="button" id="bt" name="bt button" value="this is a button">
            <script>
              var bt = document.getElementById("bt");
              bt.addEventListener('click',function(e){
                alert("this is a alert");
                alert(e.currentTarget.name);
              },false);
            </script>
        </body>

如此的效果和之前的传统绑定方式是一样的,这种绑定同时支持捕获和冒泡,addEventListener()函数最后的函数表达了事件处理的阶段,false(冒泡),true(捕获).
这种方式最重要的好处就是对同一元素的同一个类型事件做绑定不会覆盖,会全部生效.比如对上面代码bt元素在进行一次click的绑定,
那么两次绑定的事件处理函数都会执行,按照代码书写顺序.
但是IE浏览器不支持addEventListener()函数,只在IE9以上(包括IE9)可以使用.IE浏览器相应的要使用attachEvent()函数代替.

### IE下的事件绑定

IE下事件绑定的函数是attachEvent,它支持全系列的IE.但是如果你在Chrome等其他内核浏览器中使用这个函数去绑定事件,浏览器会报错的.


        <body>
        <input type="button" id="bt" name="bt button" value="this is a button">
        <script>
          var name = "world";
          var bt = document.getElementById("bt");
          bt.attachEvent('onclick',function(){
            alert("hello "+ this.name);
          });
        </script>
        </body>

attachEvent()函数支持事件捕获的冒泡阶段,同时它不会覆盖事件的绑定.但是一个缺点就是它处理函数中的this指向的是全局的window,
所以上面代码弹出的结果会是"hello world".



## 冒泡和捕获

上面的绑定事件中提到了冒泡和捕获阶段的概念,这两个概念对于理解事件是很重要的,对于它们的理解还要涉及到DOM(文档对象模型)和事件流的概念.
事件流就是一个事件对象沿着特定数据结构传播的这么一个过程.

所谓的事件对象就是Event,当一个元素上绑定的事件被触发时会产生一个事件对象,从一切皆对象的观点看这是很符合逻辑的.
冒泡和捕获讲的就是事件流在DOM中两种不同的传播方式.对于冒泡和捕获的理解,我们还是从一个小的示例来看:

        <body>
          <div id="bt1" style="width:300px;height:300px;border:1px solid red" name="divbt1">
            <div id="bt2" style="width:100px;height:100px;border:1px solid red" name="divbt2"></div>
          </div>
          <script>
            var bt1 = document.getElementById("bt1");
            bt1.onclick = function(e){
              alert("bt1");
            }
            var bt2 = document.getElementById("bt2");
            bt2.onclick = function(e){
              alert("bt2");
            }
          </script>
        </body>

这里我们使用最简单的,最原始的事件绑定方式.2个div嵌套并且绑定有弹窗事件,那么当我们点击里面的div的时候,两个div的点击事件都会被触发这个是没有疑问的,那么它们的处理函数谁先被执行?

这里用IE8,9,10和Chrome浏览器同时实验,结构都是先弹出bt2,然后弹出bt1.也就是里面小div的事件先被处理了.我们来思考一下这是什么样的一个顺序,从DOM的结构上看,应该是这样的body > bt1 > bt2.
我们把这个结构竖过来,bt2在整个结构的最下面,body在最上面.想象一下,当点击发生时产生一个泡泡(也就是事件对象),然后这个泡泡慢慢向上浮,
首先路过bt2,然后路过bt1,在路过它们时依次执行事件函数,这就是冒泡型事件.

与之相反的就是捕获型事件,它事件流传播的顺序正好与冒泡型事件完全相反.也就是bt1上的事件先触发,然后传递到bt2.捕获是由表及里,冒泡是由内之外.

那么现在回忆一下之前的W3C标准中那个addEventListener()函数,它里面最后一个参数false代表冒泡,true代表捕获,这是什么意思呢?
因为W3C作为一个标准,它选择了一个相对折中的方案去处理事件,也就是任何在W3C事件模型中发生的事件都先进入捕获阶段,然后在进入冒泡阶段,
保证一个事件会经历这两个阶段,以适应IE和其他非IE浏览器,这样使用者可以根据需求选择将事件注册到哪一个阶段.

现在再来看用addEventListener()函数进行事件绑定的结果:

        <body>
        <div id="bt1" style="width:300px;height:300px;border:1px solid red" name="divbt1">
          <div id="bt2" style="width:100px;height:100px;border:1px solid red" name="divbt2"></div>
        </div>
        <script>
          var bt1 = document.getElementById("bt1");
          bt1.addEventListener('click',function(e){
            alert("bt1");
          },false);
          var bt2 = document.getElementById("bt2");
          bt2.addEventListener('click',function(e){
            alert("bt2");
          },false);
        </script>
        </body>

这里2个div的事件绑定类型一共有4个可能的组合,2个false;2个true;1个false,1个true;1个true,1个false.这里分别试验下吧,
记住按照W3C标准,捕获阶段会在冒泡之前.



## jQuery绑定事件的方式

上面我们记录了关于javascript原生的事件绑定的一些写法,这里我们在介绍一下通过jQuery进行事件绑定的方式.首先来夸一夸jQuery的好,
通过jQuery绑定让我们省去了考虑浏览器兼容和事件流程序的相关细节内容.jQuery中对于事件的绑定称为委托,这是一个很好的定义,所谓委托,
顾名思义就是自己不去做,我让别人帮我做这个事.jQuery就是这么做的,让我们详细了解下.

### .bind()

我们直接看代码,bind()函数使用很简单.

    <body>
      <div id="div1" style="width:300px;height:300px;border:1px solid red" name="divbt1">
      <script>
        $("#div1").bind('click',function(e){
          alert("div1 " + e.currentTarget.name);
        });
      </script>
    </body>

代码在IE8,IE11,Chrome运行都没有问题,我们简单翻译一下就是首先找到id为div1的div对象,然后给这个对象绑定一个click事件.
现在来分析一下bind(),首先如果用它绑定事件要有一个寻找jQuery对象的过程,其次如果要为大量的元素绑定事件那么要寻找大量的对象不说,
每一个对象还要占用内存来存储相应的处理函数.并且bind()只能为当前已存在的DOM节点绑定事件,如果节点还没有产生bind是没有办法的.

所以说bind()推荐在使用比较简单的情况中,绑定不多的节点并且没有新节点产生的情况.如果比较复杂就推荐使用delegate().

### .delegate()

在jQuery中还有一个live()函数也能处理类似的问题,但是不如delegate()好用,所以这里就不介绍了.
delegate()是为了突破单一bind()方法的局限性,实现事件的委托.我们先看代码来理解:

        <body>
          <div id="div1" style="width:300px;height:300px;border:1px solid red" name="divbt1">
            <div id="div2" style="width:100px;height:100px;border:1px solid red" name="divbt2"></div>
          </div>
          <script>
            $("body").delegate('#div1','click',function(e){
              alert("div1");
            });
            $("body").delegate('#div2','click',function(e){
              alert("div2");
            });
          </script>
        </body>

解读一下delegate()函数,我们寻找到body标签的对象并调用delegate(),这是把事件的执行委托给body.也就是监听整个DOM树,
当触发事件的DOM节点的是id为div1,触发触发事件的类型是click时,在事件传播到body时,我们执行相应的处理函数.body怎么能知道这么多,
它如何知道绑定在它身上的执行函数什么时候执行?jQuery这些事件委托的原理根据事件冒泡的机制,广播的时候所有的节点都会知道,到底发生了什么!

DOM在为页面中的每个元素分派事件时,相应的元素一般都在事件冒泡阶段处理事件.在类似 body > div > a 这样的结构中,如果单击a元素,
click事件会从a一直冒泡到div和body(即document对象).因此,发生在a上面的单击事件,div和body元素同样可以处理.而利用事件传播(这里是冒泡)这个机制,
就可以实现事件委托.具体来说,事件委托就是事件目标自身不处理事件,而是把处理任务委托给其父元素或者祖先元素,甚至根元素(document).

### 事件的取消

在一些情况下我们需要阻止事件流的传播,或者解除之前绑定的事件.在实际工作中经常会遇到类似的需求,尤其是事件流的阻止.

### 事件流阻止

某些事件的对象是可以取消的,这意味着可以阻止默认动作的发生.事件对象是否可以取消,要通过Event.cancelable属性表示.
事件监听器可以调用Event.preventDefault()取消事件对象的默认动作.Event.stopPropagation()方法可以阻止事件向上冒泡.

事件的阻止根据场景不同和浏览器不同有不同的处理,因为事件处理模型不同的关系,如果在IE下Event.returnValue = false就可以.
如果是非IE下,用Event.preventDefault()阻止.事件流阻止,这里面阻止的是它的继续传播以及有可能产生的默认动作.
这里举一个常见且简单的例子,就是submit类型按钮的点击.

        <body>
          <form action="asd.action">
            <input type="submit" id="tijiao" value="submit"/>
          </form>
          <script>
            $("body").delegate('#tijiao','click',function(e){
              e.preventDefault();
            });
          </script>
        </body>

这里点击按钮,form表单默认的提交被阻止了,也就是其默认动作终止了.这里有一个强调的就是滚动事件.滚动也是经常遇到需要处理的事件类型,
但是滚动的阻止有点特例,它不支持在委托里进行阻止.

说到这里我们感觉Event.preventDefault()和Event.stopPropagation()都可以阻止事件,那么它们有什么区别?

前者是通知浏览器不要执行与事件相关联的默认动作,比如submit类型的按钮点击会提交.后者是停止事件流的继续冒泡,但是它对IE8及以下IE浏览器支持不好.如果直接使用return false则表示终止处理函数.

### 事件函数的解除绑定

和事件的绑定其实是相对应的,如果需要接触事件的绑定,运行对应的函数就可以了.如果是原生JS绑定则对应运行removeEventListener()和detachEvent().看一个代码示例:

        var EventUtil = {
          //注册
          addHandler: function(element, type, handler){
            if (element.addEventListener){
              element.addEventListener(type, handler, false);
            } else if (element.attachEvent){
              element.attachEvent("on" + type, handler);
            } else {
              element["on" + type] = handler;
            }
          },
          //移除注册
          removeHandler: function(element, type, handler){
            if (element.removeEventListener){
                    element.removeEventListener(type, handler, false);
            } else if (element.detachEvent){
                    element.detachEvent("on" + type, handler);
            } else {
                    element["on" + type] = null;
            }
          }
        };

如果是jQuery的绑定,也是存在对应的解绑函数用以清除注册事件,比如unbind()和undelegate().