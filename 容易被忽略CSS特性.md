## 容易被忽略CSS特性

### 大小写不敏感

### 选择器优先级

* 不同级别

    在属性后面使用 !important 会覆盖页面内任何位置定义的元素样式。

    作为style属性写在元素内的样式

    1. id选择器

    2. 类选择器

    3. 标签选择器

    4. 通配符选择器

    5. 浏览器自定义或继承

* 同一级别

    同一级别中后写的会覆盖先写的样式

* 上面的级别还是很容易看懂的，但是有时候有些规则是多个级别的组合，像这样

        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
            <style type="text/css">
                div.test{
                    background-COLOR:#a00;
                    width:100px;
                    height: 100px;
                }

                .test.test2{
                    background-COLOR:#0e0;
                    width:100px;
                    height: 100px;
                }
            </style>
        </head>
        <body>
            <div class="test test2"></div>
        </body>
        </html>

到底div是应用那条规则呢，有个简单的计算方法（经园友提示，权值实际并不是按十进制，用数字表示只是说明思想，一万个class也不如一个id权值高）

* 内联样式表的权值为 1000
* ID 选择器的权值为 100
* Class 类选择器的权值为 10
* HTML 标签选择器的权值为 1

我们可以把选择器中规则对应做加法，比较权值，如果权值相同那就后面的覆盖前面的了，div.class的权值是1+10=11，
而.test1 .test2的权值是10+10=20，所以div会应用.test1 .test2变成绿色

### 行内(inline)元素的一些属性

并不是所有的属性对行内元素都能够生效

1. 行内元素不会应用width属性，其长度是由内容撑开的
2. 行内元素不会应用height属性，其高度也是由内容撑开的，但是高度可以通过line-height调节
3. 行内元素的padding属性只用padding-left和padding-right生效，padding-top和padding-bottom会改变元素范围，但不会对其它元素造成影响
4. 行内元素的margin属性只有margin-left和margin-right有效，margin-top和margin-bottom无效
5. 行内元素的overflow属性无效，这个不用多说了
6. 行内元素的vertical-align属性无效（height属性无效）

        <div style="background-color: #a44;">
            <span style="padding:4px; margin:8px; height: 500px; width:1000px; background-color:#0e0;">123456789123456789</span>
        </div>

        <div style="background-color: #a44;">
            <span style="padding:4px; margin:8px; height: 500px; width:1000px; background-color:#0a0;">123456789</span>
        </div>

通过例子可以看出，我们对span设置的width和height属性并没有生效，margin-top和margin-bottom无效，
padding-top和padding-bottom会改变元素范围（背景区域变大了），但并没有影响下面元素位置

### 一些互斥的元素
1. 对于absolute和fixed定位的(固定大小，设置了width和height属性)元素，如果设置了top和left属性，那么设置bottom和right值就没有作用了，
    应该是top和left优先级高，否则同时写了浏览器怎么知道按照谁定位
2. 对于absolute和fixed定位的元素，如果设置了top、left、bottom、right的值后margin属性也就不起作用了
3. 对于absolute和fixed定位的元素，如果设置了top、left、bottom、right的值后float属性同样会失效
4. 块元素如果设置了float属性或者是absolute、fixed定位，那么vertical-align属性不再起作用

### font-size单位
1. px是pixel缩写，是基于像素的单位.在浏览网页过程中，屏幕上的文字、图片等会随屏幕的分辨率变化而变化，一个100px宽度大小的图片，
   在800×600分辨率下，要占屏幕宽度的1/8，但在1024×768下，则只占约1/10。所以如果在定义字体大小时，使用px作为单位，
   那一旦用户改变显示器分辨率从800到1024，用户实际看到的文字就要变“小”（自然长度单位），甚至会看不清，影响浏览。
2. pt是point(磅)缩写，是一种固定长度的度量单位,大小为1/72英寸。如果在web上使用pt做单位的文字，字体的大小在不同屏幕（同样分辨率）
   下一样，这样可能会对排版有影响，但在Word中使用pt相当方便。因为使用Word主要目的都不是为了屏幕浏览，而是输出打印。当打印到实体时，
   pt作为一个自然长度单位就方便实用了：比如Word中普通的文档都用“宋体 9pt”，标题用“黑体 16pt”等等，无论电脑怎么设置，
   打印出来永远就是这么大。
3. em：是相对单位，是一个相对长度单位，最初是指字母M的宽度，所以叫em，现指的是字符宽度的倍数，用法类似百分比，
   如：0.8em, 1.2em,2em等。通常1em=16px（浏览器默认字体大小16px），em是指父元素的字体大小。在一个页面上给定了一个父元素的字体大小,
   这样就可以通过调整一个元素来成比例的改变所有元素大小.它可以自由缩放,比如用来制作可伸缩的样式表。类似还有ex的概念，
   ex 相对于字符“x”的高度，此高度通常为字体尺寸的一半。
4. rem：rem是CSS新增的，em是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小，
   在多次使用时，就会带来无法预知的错误风险。而rem是相对于根元素\<html\>(r:root)，使用rem我们只需要在根元素确定一个参考值，
   然后就可以控制整个html页面所有字体了。

### :checked 选择器范围

checked也会选择被选中的option

### 并不是所有图片都会被加载

我们可以发现图片0和4没有被下载，0是没有用到的CSS，4是父容器的display被设为none的情况，这两种情况下的CSS引用的图片是不会被加载的，
而父容器设置visibility属性为hidden仍然会加载图片，不要搞混了

