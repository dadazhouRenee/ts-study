/*
 * @Author: 周冰洁
 * @desc: 泛型是 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
 */
export default {}

const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value)
}


getArray<number[]>([1, 2], 3).forEach(item => {
  console.log(item.length)
})

getArray<number>(2, 3).forEach(item => {
  // console.log(item.length) // error: 类型“number”上不存在属性“length”。
})


// 不是所有类型都能做的操作不能做，不是所有类型都能调用的方法不能调用
// const getLength = <T>(param: T): number => {
//   return param.length; // error 类型“T”上不存在属性“length”
// };


/* ------------ 泛型函数类型 ------------ */
// 1. 简单定义
const getArray1: <T>(arg: T, times: number) => T[] = (arg, times) => {
  return new Array(times).fill(arg)
}
// 2. 使用类型别名
type GetArray2 = <T>(arg: T, times: number) => T[];
const getArray2: GetArray2 = <T>(arg: T, times: number) => {
  return new Array(times).fill(arg)
}
// 3. 接口定义， 将泛型变量提升到接口最外层
interface GetArray3<T> {
  (arg: T, times: number): T[];
  tag: T;
}
const getArray3: GetArray3<number> = <T>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg)
}
getArray3.tag = 12
getArray3(12222, 1)
// getArray3.tag = "a"; // 不能将类型“"a"”分配给类型“number”
// getArray3("a", 1); // 不能将类型“"a"”分配给类型“number”


/* ------------ 泛型约束: 使用一个类型和extends对泛型进行约束 ------------ */
// 在泛型约束中使用类型参数
const getProp = <T, K extends keyof T>(object: T, propName: K) => {
  return object[propName]
}
const obj = {a: 'aa', b: 'bb'}
getProp(obj, 'a')
// 只能访问对象上存在的属性
// getProp(obj, 'c') // error: 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
