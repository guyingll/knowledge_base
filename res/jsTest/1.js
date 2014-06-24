function getNiceNames(people){
  //TODO
  var result=[];
  people.map(function(e){if(e.wasNice){return result.push(e.name)}})
  return result;
}

function getNaughtyNames(people){
  //TODO
  var result=[];
  people.map(function(e){if(!(e.wasNice)){return result.push(e.name)}})
  return result;
}


function justNames(array){
  return array.map(function(e){return e.name});  
}

var naughty = [
  {name: 'xDranik', wasNice: false}
];

var nice = [
  {name: 'Santa', wasNice: true},
  {name: 'Warrior reading this kata', wasNice: true}
];


var MyNamespace={};
 
MyNamespace.MyClass=function(x){
  this.sayHello = function(){console.log(x)}
}

var myObject = new MyNamespace.MyClass('Hello!');

var phrase = myObject.sayHello();



function cookingTime(eggs) {
  return eggs ? Math.ceil(eggs/8)*5 : 0;
}


function solution(str, ending){
  // TODO: complete
  console.log(str.lastIndexOf(ending))
  console.log(str.length-ending.length)
  return str.length-ending.length?false:(str.lastIndexOf(ending))===(str.length-ending.length);
}

console.log(solution('abc', 'bc')) 
console.log(solution('abc', 'ab')) 
console.log(solution('abc', 'd')) 


function solution(str, ending){
  // TODO: complete
  return (new RegExp(ending+"$")).test(str);
}

console.log(solution('abc', 'bc')) 
console.log(solution('abc', 'ab')) 
console.log(solution('abc', 'd')) 

function solution(str, ending){
  return str.substring(str.length - ending.length) == ending;
}

console.log(solution('abc', 'bc')) 
console.log(solution('abc', 'ab')) 
console.log(solution('abc', 'd')) 

function solution(str, ending){
  return str.substr(-ending.length) == ending;
}

console.log(solution('abc', 'bc')) 
console.log(solution('abc', 'ab')) 
console.log(solution('abc', 'd')) 


function solution(str, ending){
  return str.indexOf(ending, str.length - ending.length) !== -1;
}


var Calculator = {
 average: function() {
  // Your code here... 
  var len=arguments.length,tep=len,sum=0;
  while(tep--){
    sum+=~~arguments[tep]
  }
  return sum?sum/len:sum;
 }
};

console.log(Calculator.average(1,2,3))

var Calculator = {
 average: function() {
  for (var s=0,i=0; i<arguments.length;++i) s += arguments[i];
  return i?s/i:0;
 }
};

var Calculator = {
 average: function() {
  return Array.prototype.reduce.call(arguments, function(a,b) {return a+b;}, 0) / (arguments.length||1);
 }
};

var Calculator = {
  average: function () {
    'use strict';
    return [].reduce.call(arguments, function (acc, number) { return acc + number; }, 0) / (arguments.length || 1);
  }
};


function sortNums(nums){
  return (nums||[]).sort(function(x,y){return x-y});
}


console.log(sortNums([1,2,3,10,5]));

function createPhoneNumber(numbers){
  var result="";
  for(var i=0,len=numbers.length;i<len;i++){
    switch(i){
      case 0:
        result+="("+numbers[i];
        break;
      case 2:
        result+=numbers[i]+") ";
        break;
      case 6:
        result+="-"+numbers[i];
        break;
      default:
         result+=""+numbers[i];
    }
  }
  return result;
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
//createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) => returns "(123) 456-7890"



function createPhoneNumber(numbers){
  return '(012) 345-6789'.replace(/\d/g, function(d) { return numbers[d]; });
}


function createPhoneNumber(numbers){
  return numbers.join('').replace(/(...)(...)(.*)/, '($1) $2-$3');
}



function scoreThrows(radiuses){
  //Return total number of points
  var tem=0;
  if(radiuses.length&&radiuses.every(function(e){if(e<5)return true;})){
      tem+=100;
  }

  return tem+radiuses.reduce(function(acc,e){
      var result;
      if(e>10)
        result=0;
      else if(e<5)
        result=10;
      else
        result=5;
      return acc+result;
  },0);
}



console.log(scoreThrows([1, 5, 11]));
console.log(scoreThrows([1, 1, 1]));


function scoreThrows(radiuses){
  if(radiuses.length<1) return 0;
  return (radiuses.every(function(x) {return x<5}) ? 100 : 0) + radiuses.reduce(function(a,b){
    return a + (b < 5 ? 10 : b <= 10 ? 5 : 0);  
  },0);
}