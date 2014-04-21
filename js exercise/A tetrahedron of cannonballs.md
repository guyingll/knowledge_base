## A tetrahedron of cannonballs

* yours

        function tetrahedron(size) {
          return size==1?size:tetrahedron(size-1)+sum(size);
        }

        function sum(size) {
          return size==1?size:sum(size-1)+size;
        }

        tetrahedron(1)//=>1