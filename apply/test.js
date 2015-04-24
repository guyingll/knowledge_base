/**
 * Created by 2323 on 14-7-1.
 */
Function.prototype.Apply=function(obj,args){
    obj=obj||window;
    obj.tempfunc=this;
    var res;
    if(!args){
        res=obj.tempfunc();
    }else{
        res = eval("obj.tempfunc("+args+")");
    }

    delete  obj.tempfunc;
    return res
}

[].toString.Apply([1,2,3]);


Array.prototype.random=Array.prototype.random||function(){
    var arr=this,res=[];
    while(arr.length>0){
        res.push( (Array.prototype.splice.call(arr,Math.random()*arr.length,1))[0]);
    }
    return res;
}

[2,4,5,21,22,99].random();

