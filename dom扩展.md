选择符

    document.querySelector();
    querySelector("body")
    querySelector("#mydiv")
    querySelector(".selected")
    querySelector("img.button")
    document.querySelectorAll();

匹配选择符element
(webkit/moz/ms)MatchesSelector

    element.matchesSelector()

根据Class获取elements

    getElementsByClassName()

获取class属性

    element.classList
    增加
    element.classList.add("test")
    删除
    element.classList.remove("test")
    切换
    element.classList.toggle("test")
    是否包含
    element.classList.contains("test")

焦点管理

    var button=document.getElementById("mybutton");
    button.focus();
    alert(document.activeElement===button) //true

    alert(document.hasFocus())  //true

HTMLDocument变化

    if(document.readyState=="complete"){
        //文档加载完后的操作
    }

    兼容模式

    if(document.compatMode=='CSS1Compat'){
        alert("Standards mode")
    }else{
        alert("Quirks mode")
    }


head

    (document.head html5新增）
    var head=document.head　|| document.getElementsByTagName("head")[0];

自定义数据属性

    <div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

    自定义属性需要添加前缀 data-

    //获得自定义数据
    var div=document.getElementById("#myDiv");
    var appId=div.dataset.appId;
    //设置
    div.dataset.appId="abcde"

插入标记

    div.innerHTML="<script defer>alert('hi')<\/script>"; //无效
    div.innerHTML="_<script defer>alert('hi')<\/script>"; //有效

滚动

    document.forms[0].scrollIntoView()
    document.body.scrollByLines(1)
    document.body.scrollByPages(1)


