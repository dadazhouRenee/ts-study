let num: number = 123;

let bool: boolean = false;
bool = true;
let bool2: boolean = !!0;


let list1: number[] = [1, 2, 3]; // 推荐写法
// let list2: Array<number> = [1, 2, 3];

// let u: undefined = undefined;// 这里可能会报一个tslint的错误：Unnecessary initialization to 'undefined'，就是不能给一个值赋undefined，但我们知道这是可以的，所以如果你的代码规范想让这种代码合理化，可以配置tslint，将"no-unnecessary-initializer"设为false即可
let n: null = null;

let obj: object;
obj = { name: 'zz'}
// obj.name /*  error 类型“object”上不存在属性“name” */

// ***********元组: 每个位置元素对应， 元素个数也要一致
let tuple: [string, number,boolean]
/*
  元组的声明效果等同于如下声明
  interface Tuple extends Array<number | string> {
    0: string;
    1: number;
    2: boolean;
    length: 3;
  }
*/
tuple = ['q', 2, false]
// tuple = [2, 2, false]  /* error 不能将类型“number”分配给类型“string”。 */
// tuple = ['q', 2] /* // error Property '2' is missing in type '[string, number]' but required in type '[string, number, boolean]' */


// ***********枚举: 可以获取对应key的值，同时也可以通过值获取对应的key; 定义枚举的语句之前加上const关键字，这样编译后的代码不会创建这个对象
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER,
}
const superAdmin = Roles.SUPER_ADMIN // 0
console.log(Roles[1]) // 'ADMIN' 反向映射
// 反向映射不支持 字符串枚举, 只支持数字枚举; 字符串枚举不能使用常量或者计算值，也不能使用其他枚举值中的成员;
enum Message {
  Error = 'Sorry, error',
  Success = 'Hoho, success'
}
console.log(Message.Error) // 'Sorry, error'
// Message['Sorry, error'] // error 类型“typeof Message”上不存在属性“Sorry, error”。
// 数字枚举在定义值的时候，可以使用计算值和常量。
// 但是要注意，如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值，这里不能使用默认的递增值
const getValue = () => {
  return 0;
}
enum ErrorIndex {
  a = getValue(),
  // b, // error 枚举成员必须具有初始化表达式
  // c
}
enum RightIndex {
  a = getValue(),
  b = 1,
  c,
}
const Start = 1;
enum Index {
  a = Start,
  // b, // error 枚举成员必须具有初始化表达式
}
enum Animal {
  Dog = 1,
  Cat = 2,
}
interface Dog {
  type: Animal.Dog
}
interface Cat {
  type: Animal.Cat
}
let cat1: Cat = {
  // type: Animal.Dog, // error 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
  // type: 2 // right
  type: Animal.Cat // right
}
// ***********枚举 End

// ***********void: 没有任意类型，就是什么类型也不是
// void 类型的变量只能赋值为 undefined 和 null, 其他类型不能赋值给void类型的变量
// 一般定义函数没有返回值会用到void
const consoleText = (text: string): void => {
  console.log(text);
}

// ***********never: 那些永不存在的值的类型，它是那些总会抛出异常或根本不会有返回值的函数表达式的返回值类型; 当变量永不为真的类型保护所约束时，也是never类型
const errorFunc = (message: string): never => {
  throw new Error(message)
}
// 根本不会有返回值
const infiniteFuc = (): never => {
  // tslint:disable-next-line:no-empty
  while(true) {}
}
/**
 * 1. never 是任何类型的子类型，它可以赋值给任何类型；
 * 2. 没有类型是never的子类型，除了它自身没有任何类型可以赋值给它，any类型不能赋值给never类型；
 */
let stringType = '123'
let neverVariable = (() => {
  // tslint:disable-next-line:no-empty
  while(true) {}
})()
stringType = neverVariable; /* Point1: no error */
// neverVariable = 123; /* error: 不能将类型“number”分配给类型“never” */


// ***********any: 任意类型，可以对其进行属性方法访问，不管有还是没有

// ***********unknown: 未知类型；与any不同，unknown是不允许随意操作的
let f: unknown;
f = 'hello'
f = false
let c: boolean;
// c = f // error: 不能将类型“unknown”分配给类型“boolean”
c = f as boolean // right

// ***********交叉类型: 取多个类型的并集，使用 & 符号定义，被&符链接的多个类型构成一个交叉类型，表示这个类型·同时·具备这几个连接起来的类型的特点；

// ***********联合类型: 要求只要符合联合类型中任意一种类型即可，它使用 | 符号定义。当我们的程序具有多样性，元素类型不唯一时，即使用联合类型；




