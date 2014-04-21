## Convert a Number to a String

* toString

        function numberToString(num) {
          return num.toString();
        }

* ""+

        function numberToString(num) {
          return ''+num;
        }

* String

        function numberToString(num) {
          // Return a string of the number here!
          return String(num);
        }

* String

        function numberToString(num) {
          // could just do: return num + ''; But THAT would be cheating
          var str = '',
              mult = num < 0 ? -1 : 1;
          num *= mult;

          do {
            str = String.fromCharCode(num % 10 + 48) + str;
            num = ~~(num / 10);
          } while (num > 0);

          if(mult < 0) str = "-" + str;
          return str;
        }

        typeof numberToString(5) === "string"