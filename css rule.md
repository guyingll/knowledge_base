###　获取css

    div.box{
        background-color:blue;
        width:100px;
        height:200px;
    }

    var sheet=document.styleSheets[0];
    var rules=sheet.cssRules || sheet.rules;
    var rule=rules[0];
    alert(rule.selectorText) //div.box
    alert(rule.style.cssText) //完整css代码
    alert(rule.style.backgroundColor) //blue


###　元素大小

    offsetHeight
    offsetWidth
    offsetLeft
    offsetTop
    (包括内边距、滚动条和边框大小)


    clientHeight
    clientWidth
    (内边距+内容)

####　获取某个元素在页面上的偏移量

    function getElementLeft(element){
        var actualLeft=element.offsetLeft;
        var current=element.offsetParent;

        while(current!==null){
            actualLeft=current.offsetLeft;
            current=current.offsetParent;
        }
        return actualLeft;
    }

####　获取浏览器视口大小

    function getViewport(){
        if(document.compatMode== "BackCompat"){
            return{
              width:document.body.clientWidth,
              height:document.body.clientHeight
            }
        }else{
            return{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        }
    }

####　滚动大小

    function scrollToTop(element){
        if(element.scrollTop!=0){
            element.scrollTop=0;
        }
    }

####　确定元素大小

    function getBoundingClientRect(element){
        var scrollTop=document.documentElement.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft;
        if(element.getBoundingClientRect){
            if(typeof arguments.callee.offset !="number"){
                var temp=document.createElement("div");
                temp.style.cssText="position:absolute;left:0;top:0;";
                document.body.appendChild(temp);
                arguments.callee.offset=-temp.getBoundingClientRect().top-scrollTop;
                document.body.removeChild(temp);
                temp=null;
            }

            var rect=element.getBoundingClientRect();
            var offset=arguments.callee.offset;


            return {
                left:rect.left+offset,
                right:rect.right+offset,
                top:rect.top+offset,
                bottom:rect.bottom+offset

            };
        }else{
            var actualLeft=getElementLeft(element);
            var actualTop=getElementTop(element);
            return {
                left:actualLeft-scrollLeft,
                right:actualLeft+element.offsetWidth-scrollLeft,
                top:actualTop-scrollTop,
                bottom:actualTop+element.offsetHight-scrollTop
            }

        }
    }