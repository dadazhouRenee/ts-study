/*
 * @Author: 周冰洁
 * @desc: 主要指 索引类型查询（keyof） 和 索引访问操作符
 */

export default {}

// keyof操作符，连接一个类型，会返回一个由这个类型的所有属性名组成的联合类型
interface Info {
  name: string,
  age: number,
}
let infoProp: keyof Info; // 相当于 'name' | 'age' 的联合类型
infoProp = 'age'
infoProp = 'name'
// infoProp = 'no' // error: 不能将类型“"no"”分配给类型“keyof Info”。

// 通过与泛型结合，检查使用了动态属性名的代码
function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(n => obj[n])
}
const info2 = {
  name: 'lison',
  age: 18,
}
// tslint:disable-next-line:prefer-const
let values: string[] = getValue(info2, ['name'])
// values = getValue(info2, ['aaa']) // error: 不能将类型“"aaa"”分配给类型“"name" | "age"”。
// values = getValue(info2, ['age']) // error: 不能将类型“number[]”分配给类型“string[]”。


/* 索引访问操作符: [] */

// 1. 可以用来访问某个属性的类型
interface Info3 {
  name: string,
  age: number
}
type NameType = Info3['name'] // string 类型
// let name: NameType = 123 // error: 不能将类型“number”分配给类型“string”

// 2. 如果索引类型为 number，那么实现该接口的对象的属性名必须是 number 类型
// 但是如果接口的索引类型是 string 类型，那么实现该接口的对象的属性名设置为数值类型的值也是可以的
interface Obj1<T> {
  [key: number]: T
}
interface Obj2<T> {
  [key: string]: T
}
// tslint:disable-next-line:prefer-const
let key1 : keyof Obj1<number>; // key 的类型是 number
let key2 : keyof Obj2<number>; // key 的类型是 number | string
key2 = 123 // 正确赋值
key2 = '2222' // 正确赋值

// 3. 当tsconfig.json里 strictNullChecks 设为false时，通过Type[keyof Type]获取到的，是除去never & undefined & null这三个类型之后的字段值类型组成的联合类型
interface Type {
  a: never,
  b: never,
  c: string,
  d: number,
  e: undefined,
  f: null,
  g: object,
}
type test = Type[keyof Type] // test的类型是 string | number | object
let testValue: test = '123'
testValue = 123
testValue = {}
// testValue = false // error: 不能将类型“boolean”分配给类型“test”
