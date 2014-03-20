每个function有个prototype属性，称为原型。每个对象也有个原型，Firefox/Safari/Chrome/Opera 中可以通过__proto__来访问，IE6/7/8中没有提供相关接口。

    function Person(){
        this.method1 = function(){}
    }
    Person.prototype.method2 = function(){}

    function Man(){}
    Man.prototype = new Person();

    Man.prototype.m1 = function(){}
    Man.prototype.m2 = function(){}

    var m = new Man();
    for(var a in m.__proto__){
        alert(a);
    }
定义了父类Person，子类Man。new一个Man的对象，打印出所有属性。

ECMAScript V5为Object添加了静态的getPrototypeOf方法( Firefox/Chrome已实现 )，用来获取对象的原型。用它可以模仿Java的super。

    function Person(){
        this.method1 = function(){alert(1)}
    }
    Person.prototype.method2 = function(){alert(2);}

    function Man(){
        this.m1 = function(){
            Object.getPrototypeOf(this).method1();
        }
    }
    Man.prototype = new Person();//原型继承

    Man.prototype.m2 = function(){
        Object.getPrototypeOf(this).method2();
    }


    var man = new Man();
    man.m1();
    man.m2();

子类Man中挂在this上的m1方法中调用父类Person中挂在this上的method1，挂在prototype上的m2方法调用父类prototype上的method2。

以上可以看出对象原型不但包括其构造器prototype上的属性，也包括构造器中this上的属性。当然由于JavaScript中上下文的原因，父类中的this不能在子类中不能很好的自动转换，需要一些技巧完成。

    package bao1;

    class Person {
        private String name;

        Person(String name) {
            this.name = name;
        }
        public void method1() {
            System.out.println(this.name);
        }
    }
    class Man extends Person{

        Man(String name) {
            super(name);
        }
        public void m1() {
            super.method1();
        }
    }
    public class Test {
        public static void main(String[] args) {
            Man man1 = new Man("Jack");
            man1.m1();
        }
    }