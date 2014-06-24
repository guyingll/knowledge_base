动态脚本

    function loadScriptString(code){
        var script=document.createElement("script");
        script.type="text/javascript";
        try{
            script.appendChild(document.createTextNode(code));
        }catch(ex){
            script.text=code;
        }
        document.body.appendChild(script);
    }

    loadScriptString("(function (){alert('test')})()");


    function loadScript(url){
        var script=document.createElement("script");
        script.type="text/javascript";
        script.src=url;
        document.body.appendChild(script);
    }