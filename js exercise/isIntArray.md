function isIntArray(arr) {
  if(arr){
    return arr.every(function(item){
      return parseInt(item)===item;
    })
  }
  return false;
}


function isIntArray(arr) {
  return Array.isArray(arr) && arr.every(function (x) { return Math.floor(x) === x });
}


function isIntArray(arr) {
  if (arr == null) {return false;}
  if (typeof arr.length == 'undefined') {return false;}
  if (! (arr instanceof Array)) {return false;}
  for (index in arr){
     if (! (typeof arr[index]==='number' && (arr[index] % 1)===0))
     {
         return false;
     }
  }
  return true;
}



