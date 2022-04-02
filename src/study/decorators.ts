/*
 * @Author: 周冰洁
 */
export {}

// 装饰器工厂从上到下依次执行，但是只是用于返回函数但不调用函数;
// 装饰器函数从下到上依次执行，也就是执行工厂函数返回的函数;
function setName() { // 装饰器工厂
  console.log('get setName')
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any) { // 装饰器函数
    console.log('setName', target)
  }
}
function setAge() { // 装饰器工厂
  console.log('get setAge')
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any) { // 装饰器函数
    console.log('setAge', target)
  }
}
@setName()
@setAge()
class Test {
}
// 打印出来的内容如下：
/*
  'get setName'
  'get setAge'
  'setAge' class Test{}
  'setName' class Test{}
*/

/*
  类的定义中不同声明上的装饰器将按以下规定的顺序引用：
  1. 参数、方法、访问符或者属性装饰器应用到每个实例成员;
  2. 参数、方法、访问符或者属性装饰器应用到每个静态成员;
  3. 参数装饰器应用到构造函数
  4. 类装饰器应用到类
*/
/*
  类装饰器：
  在装饰器里给实例添加的属性，设置的属性值会覆盖被修饰的类里定义的实例属性
*/
function classDecorator<T extends new (...args: any[]) => {}>(target: T) {
  return class extends target {
    newProperty = 'new property';
    hello = 'override';
  }
}
@classDecorator
class Greeter {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter('world'))
/* {
  "property": "property",
  "hello": "override", // 注意这里的hello 还是'override'
  "newProperty": "new property"
} */

/*
  方法装饰器：
  用来处理类中方法，它可以处理方法的属性描述符，可以处理方法定义。如果方法装饰器返回一个值，那么会用这个值作为方法的属性描述符对象;
  方法装饰器在运行时也是被当做函数调用，含 3 个参数：
    装饰静态成员时是类的构造函数，装饰实例成员时是类的原型对象;
    成员的名字;
    成员的属性描述符
*/
function enumerable1(bool: boolean) {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log(target); // Info1: {} 类
    descriptor.enumerable = bool
  }
}
class Info1 {
  constructor(public age: number) {}
  @enumerable1(true)
  getAge() {
    return this.age
  }
}
const info1 = new Info1(18)
console.log(info1) // { age: 18}
// tslint:disable-next-line:forin
for(const propertyName in info1) {
  console.log(propertyName)
}
// age  // getAge
// 如果把装饰器那行代码去掉 这里只打印age; 因为类的方法是不可以枚举的，类定义将"portotype"中所有的方法的`enumerable`标志设置为false

function enumerable2(bool: boolean): any {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    return {
      value() {
        return "not age"
      },
      enumerable: bool
    }
  }
}
class Info2 {
  constructor(public age: number) {}
  @enumerable2(true)
  getAge() {
    return this.age;
  }
}
const info2 = new Info2(18)
console.log(info2.getAge()); // not age

/*
  访问器装饰器：
  TS 不允许同时装饰一个成员的 get 和 set 访问器，只需要这个成员 get/set 访问器中定义在前面的一个即可;
 */
function enumerable3(bool: boolean) {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = bool
  }
}
class Info3 {
  constructor(name: string) {
    this.name = name;
  }
  @enumerable3(false)
  get name(): string {
    return this.name
  }
  // @enumerable3(false) // error: 不能向多个同名的 get/set 访问器应用修饰器
  set name(name) {
    this.name = name
  }
}

/*
  属性装饰器：
  属性装饰器没法操作属性的属性描述符，它只能用来判断某个类中是否声明了某个名字的属性；
  拥有两个参数，和方法装饰器的前两个参数一模一样；
*/
function printPorpertyName(target: any, propertyName: string) {
  console.log(target, propertyName);
}
class Info4 {
  @printPorpertyName
  name: string;
  @printPorpertyName
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const info4 = new Info4('lison', 18)
// Info4{} name
// Info4{} age

/*
  参数装饰器：
  有三个参数，前两个也是和方法装饰器的前两个参数一样：
    装饰静态成员时是类的构造函数，装饰实例成员时是类的原型对象；
    成员的名字；
    参数在函数参数列表中的索引；
*/
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index+1}个参数`);
}
class Info5 {
  name: string = 'lison'
  age: number = 18
  // getInfo(prefix: string, @required infoType: string): string { // tsconfig- strict false 关闭严格模式
  getInfo<K extends keyof Info5>(prefix: string, @required infoType: K): string { // tsconfig- strict true
    return prefix + " " + this[infoType];
  }
}
interface InfoType5 {
  // tslint:disable-next-line:ban-types
  [key:string]: string | number | Function
}
const info5 = new Info5();
const infoMsg = info5.getInfo("hihi", "age"); // 修饰的是getInfo的第2个参数
console.log('infoMsg', infoMsg)