/*
 * @Author: 周冰洁
 * @desc: 函数类型
 */
export default {}


let add: (x: number, y: number) => number; // 定义add变量，指定函数类型，包含参数和返回值类型；
add = (arg1: number, arg2: number): number => arg1 + arg2; // 给add赋了一个实际的函数，这个函数参数类型和返回类型都和上面函数类型中定义的一致；
// add = (arg1: string, arg2: string): string => arg1 + arg2; // error 参数“arg1”和“x” 的类型不兼容。


/* 使用接口定义函数类型 */
interface Add {
  // tslint:disable-next-line:callable-types
  (x: number, y: number): number;
}
// tslint:disable-next-line:prefer-const
let add2 : Add = (arg1: number, arg2: number) => arg1 + arg2


/* ———————————— 函数重载 ———————————— */
// Typescript的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的返回值进行检查；重载只能用 function 来定义，不能使用接口、类型别名;
// 前两个function定义的就称为函数重载，而第三个function并不算重载；
function handleData(x: string): string[]; // 重载的一部分，当参数类型为string,返回值为string构成的数组
function handleData(x: number): string; // 重载的一部分，当参数类型为number,返回值为string
function handleData(x: any): any { // 重载的内容，他是实体函数，不算做重载的部分
  if (typeof x === 'string') {
    return x.split('')
  } else {
    return x.toString().split('').join('')
  }
}
handleData('abc').join('')
// handleData(123).join('_') // error 类型“string”上不存在属性“join”。
// handleData(false) // error 没有与此调用匹配的重载
