## $.type() 判断js数据类型
* 用法：$.type(new Array()); //array

部份源码(截取关键部份，请忽略源码语法)：

    //生成typelist的map
    class2type = {}
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    //每个对象实例都有toString方法
    core_toString = class2type.toString

    //主方法
    type: function( obj ) {
        if ( obj == null ) {
            return String( obj );
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ core_toString.call(obj) ] || "object" :
            typeof obj;
    }

* 解读：

1. class2type生成后的内容为

    var class2type = {
        "[object Boolean]":"boolean",
        "[object Number]":"number",
        "[object String]":"string",
        "[object Function]":"function",
        "[object Array]":"array",
        "[object Date]":"date",
        "[object RegExp]":"regexp",
        "[object Object]":"object",
        "[object Error]":"error"
    }
2. core_toString使用的是对象实例的toString
所有继随自Object的对象都有toString方法，为什么一定要使用object.toString，因为array,function虽然有toString方法，但该方法进行了重写，array调用toString打印的数组成员用逗号隔开的字符串。这里使用的是{}.toString.call(obj);改变toString的this指向为object实例。jquery为什么使用的是class2type.toString.call，这样就可以少声明一个object。

1
2
3
4
var func = function(){};
var arr = [];
console.log({}.toString.call(func)); //[object Function]
console.log({}.toString.call(arr)); //[object Array]
这样就得到class2type的键名，以此判断数据类型。

二、$.each() 遍历一个数组或对象。
each()其实还是使用的for来进行循环的，除了方便外，因其做了一下简单的封装，所以效率还是要比for差，对于大型循环，尽量使用for.

三、$.trim() 去除字符串两端的空格。

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
core_version = "1.9.1"
//仅仅是使用字符串的trim方法
core_trim = core_version.trim

//主方法，首先尝试使用字符串原生的trim方法（非IE支持）
//不支持的话，使用String.prototype.trim.call("\uFEFF\xA0")
//最后使用正则replace
trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
    function( text ) {
        return text == null ?
            "" :
            core_trim.call( text );
    } :

    // 上述两个方法不支持，使用自定义的方法，清空两边的空格或特殊字符
    function( text ) {
        return text == null ?
            "" :
            ( text + "" ).replace( rtrim, "" );
    }
该方法需要解释的是，“\uFEFF”和“\xA0”。
某些软件，在保存一个以UTF-8编码的文件时，会在文件开始的地方插入三个不可见的字符（0xEF 0xBB 0xBF，即BOM），转码后是“\uFEFF”，因此我们在读取时需要自己去掉这些字符。
“\xA0”其实就是HTML中常见的“&nbsp”

四、$.isNumeric() 判断是否是数字

1
2
3
isNumeric: function( obj ) {
    return !isNaN( parseFloat(obj) ) && isFinite( obj );
}
isFinite() 函数用于检查其参数是否是无穷大。如果 number 是有限数字（或可转换为有限数字），那么返回 true。否则，如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。

五、$.isEmptyObject() 判断对象是否为空

1
2
3
4
5
6
7
isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
这个方法很好懂，就不多解释

六、$.parseJSON() 将JSON字符串转换为JSON对象

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
// JSON RegExp
rvalidchars = /^[\],:{}\s]*$/,
rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g

parseJSON: function( data ) {
    // 如果有原生的JSON对象支持，使用原生对象
    if ( window.JSON && window.JSON.parse ) {
        return window.JSON.parse( data );
    }

    if ( data === null ) {
        return data;
    }

    if ( typeof data === "string" ) {

        // 去掉两端空格,制表符,bom
        data = jQuery.trim( data );

        if ( data ) {
            // 保证输入的字符串是可用的JSON字符串
            if ( rvalidchars.test( data.replace( rvalidescape, "@" )
                .replace( rvalidtokens, "]" )
                .replace( rvalidbraces, "")) ) {
                console.log(data);
                return ( new Function( "return " + data ) )();
            }
        }
    }

    jQuery.error( "Invalid JSON: " + data );
}
这个方法主要是看上面几个正则表达式，从字符串转JSON对象，仅仅是使用return ( new Function( “return ” + data ) )();

七、$.globalEval() 在全局作用域执行一段JS脚本

1
2
3
4
5
6
7
8
9
10
// 在全局作用域执行JS脚本
globalEval: function( data ) {
    if ( data && jQuery.trim( data ) ) {
        // 在IE中使用execScript
        // 因为使用匿名函数，所以作用域使用的是window
        ( window.execScript || function( data ) {
            window[ "eval" ].call( window, data );
        } )( data );
    }
}
jQuery该方法源于：Jim Driscoll

方法原理：eval作用域问题

1
2
3
4
5
6
var a = "window";
function b(){
    eval('var a = "b"');
}
b();
alert(a); //a的结果为window；IE、chrome、FF结果一致
window.eval和eval不一样的地方，

1
2
3
4
5
6
var a = "window";
function b(){
    window.eval('var a = "b"');
}
b();
alert(a); //IE下还是a的结果还是window,chrome、FF的a的结果b