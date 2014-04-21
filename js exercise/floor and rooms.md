##  floor and rooms

* best

        function roomMates( rooms, floor ){
          return rooms.slice((floor - 1) * 6, floor * 6).filter(function(v) { return v; });
        }

* yours

        function roomMates(rooms, floor) {
          return rooms.filter(function(el, index) {
            return Math.floor(index / 6) + 1 === floor && el;
          });
        }