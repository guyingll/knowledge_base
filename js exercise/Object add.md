## Object add

* valueof

        var Foo = function(value) {
          this.val = value;
        }

        Foo.prototype.valueOf = function() {
          return this.val;
        }


* toString

         var Foo = function(value) {
           this.val = value;
         }

         Foo.prototype.toString = function() {
           return parseFloat(this.val);
         }