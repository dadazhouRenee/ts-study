/*
 * @Author: 周冰洁
 * @desc: 类
 */

/* private修饰符： 修饰的属性在类的定义外面是没法访问的 */
class Parent {
  private age: number;
  constructor(age: number) {
    this.age = age;
  }
}
const p = new Parent(18);
console.log(p); // { age: 18 }
// console.log(p.age); // error 属性“age”为私有属性，只能在类“Parent”中访问
// console.log(Parent.age); // error 类型“typeof Parent”上不存在属性“age”
class Child extends Parent {
  constructor(age: number) {
    super(age);
    // console.log(super.age); // error 属性“age”为私有属性，只能在类“Parent”中访问
  }
}

/* protected 还能用来修饰 constructor 构造函数，加了protected修饰符之后，这个类就不能再用来创建实例，只能被子类继承，这个需求我们在讲 ES6 的类的时候讲过，需要用new.target来自行判断，而 TS 则只需用 protected 修饰符即可 */
class Parent1 {
  protected constructor() {}
}
// const p1 = new Parent1() // error: 类“Parent1”的构造函数是受保护的，仅可在类声明中访问。
class Child1 extends Parent1 {
  constructor() {
    super()
  }
}
const c1 = new Child1()

/* 抽象类: 一般用来被其他类继承，而不直接创建实例。抽象类和类内部定义抽象方法，使用abstract关键字 */
abstract class People {
  constructor(public name: string) {}
  abstract printName(): void;
}
class Man extends People {
  constructor(name: string) {
    super(name);
    this.name = name
  }
  // 在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义。
  printName(): void {
    console.log(this.name)
  }
}
// const p1 = new People('aa') // error 无法创建抽象类的实例
// const m = new Man(); // error: 应有 1 个参数，但获得 0 个。
const man = new Man('lison')
man.printName(); // 'lison'

abstract class People2 {
  abstract name: string;
  // 抽象方法和抽象存取器都不能包含实际的代码块。
  abstract get insideName(): string;
  abstract set insideName(value: string);
}
class Pp extends People2 {
  name: string;
  constructor(name: string) {
    super();
    this.name = name
  }
  get insideName() {
    return this.name
  }
  set insideName(val) {
    this.name = val
  }
}


/* 接口和接口、类和类直接的继承，使用extends，如果是类继承接口，则用implements */
interface FoodInterface {
  type: string
}
class FoodClass implements FoodInterface {
  // error: Property 'type' is missing in type 'FoodClass' but required in type 'FoodInterface
  // static type: string; // 接口检测的是使用该接口定义的类创建的`实例`， 虽然定义 静态属性 type，但静态属性不会添加到实例上，所以还是报错
  // constructor() {}

  constructor(public type: string) {}
}
// 上述需求还可以通过抽象类实现
abstract class FoodAbstractClass {
  abstract type: string;
}
class Food extends FoodAbstractClass {
  constructor(public type: string) {
    super(); // 派生类的构造函数必须包含 "super" 调用
  }
}

/*
  接口继承类： 当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是只继承成员以及成员类型。
  接口还会继承类的private和protected修饰的成员，当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口只可被这个类或他的子类实现。
*/
class A {
  protected name: string;
  constructor(name: string) {
    this.name = name
  }
}
// tslint:disable-next-line:no-empty-interface
interface I extends A {}
// class B implements I {} // error: 类型 "B" 中缺少属性 "name"，但类型 "A" 中需要该属性
// class C implements I { // error: 属性“name”受保护，但类型“C”并不是从“A”派生的类
//   name: string;
//   constructor(name: string) {
//     this.name = name
//   }
// }
class D extends A implements I {
  getName() {
    return this.name
  }
}


/*
  在泛型中使用类类型 ????
 */
// const creat = <T>(c: new () => T ): T => {
// tslint:disable-next-line:callable-types
// const create = <T>(c: { new (): T}): T => { // 两种写法意思一样
//   return new c()
// }
// class Info {
//   age: number;
//   // constructor(age: number) {
//   //   this.age = age
//   // }
// }
// // tslint:disable-next-line:no-unused-expression
// create(Info).age
// // tslint:disable-next-line:no-unused-expression
// create(Info).name
