function RouletteSystem() {
  this.sum = 0;
  this.wheel = new RouletteWheel();
}

RouletteSystem.prototype.putItAllOn = function(count) {
  for(var i = 0 ; i < count ; i++) {
  this.sum += this.wheel.spin();
  }
  return this.sum;
}

function RouletteWheel() {
 this.numbers = [0,28,9,26,30,11,7,20,32,17,5,22,34,15,3,24,
                36,13,1,00,27,10,25,29,12,8,19,31,18,6,21,33,
                16,4,23,35,14,2];
}

RouletteWheel.prototype.spin = function() {
  var landed = Math.floor(Math.random() * this.numbers.length);
  return this.numbers[landed];
}

var gold=Math.floor(Math.random() * 100 + 1);
var cantLose = new RouletteSystem();
var guess = cantLose.putItAllOn(3);
// console.log(gold);
// console.log(guess);



function searchNames(logins){ 
    for(var i=0,len=logins.length;i<len;i=i+2){
      if(logins[i].indexOf(".")!=-1){
        return [logins[i+1]]
      }
    }
    return [];

}


function searchNames(logins){ 
    for(var i=0,len=logins.length;i<len;i=i+2){
      if(logins[i].indexOf(".")!=-1){
        return [logins[i+1]]
      }
    }
    return [];

    
}

function searchNames(logins){
   return logins.filter(function(e,index){if(index%2&&/(^\..*)|(.*\.$)/.test(logins[index-1]))return true;})
}

var a = ["f.o.o","foo@foo.com","bar.","bar@bar.com",".b.a.r","foobar@fb.com",".b.a.r.f.o.o.t.","bar_foo@fb.com"],
  b = [ "bar@bar.com" ];

console.log(searchNames( a ));


// Test Failed: not correct with ["f.o.o","foo@foo.com","bar.","bar@bar.com",".b.a.r","foobar@fb.com",".b.a.r.f.o.o.t.","bar_foo@fb.com"] given -
// Expected: ["bar@bar.com","foobar@fb.com","bar_foo@fb.com"], 
// instead got: ["foo@foo.com","bar@bar.com","foobar@fb.com","bar_foo@fb.com"]