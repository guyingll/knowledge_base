## Number Of Occurrences

* yours

        Array.prototype.numberOfOccurrences = function(x) {
            return this.reduce(function(sum,item){
              return item==x?++sum:sum
            },0)
        }

* best

        Array.prototype.numberOfOccurrences = function(n) {
          return this.filter(function(x){return x==n;}).length;
        }