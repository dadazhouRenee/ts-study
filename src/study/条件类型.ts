/*
 * @Author: 周冰洁
 * @desc: 条件类型
 */
export default {}

type Type<T> = T extends string ? string : number;
let index: Type<'a'> // index 的类型为 string
let index2: Type<false> // index2 的类型为 number
index = 'lison'
index2 = 123

// A extends B，是指类型A可以分配给类型B，而不是说类型A是类型B的子集。
type A1 = 'x' extends 'x' ? string : number; // string
type A2 = 'x' | 'y' extends 'x' ? string : number; // number


// 如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。也就是下面所说的分布式条件类型; 如果需要阻断条件判断类型的分配，可以用[]将泛型参数括起来，此时会被当成一个整体，不在分配，如[T]
type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'> // string | number
/*
 * 分布式条件类型
 * 当待检测的类型是联合类型，则该条件类型被称为‘分布式条件类型’，在实例化时会自动分发成联合类型
*/
type TypeName<T> = T extends any ? T : never;
type type1 = TypeName<string | number>; // Type1的类型是 string | number
type TypeName2<T> = T extends string
? string
: T extends number
? number
: T extends boolean
? boolean
: T extends undefined
? undefined
// tslint:disable-next-line:ban-types
: T extends Function
// tslint:disable-next-line:ban-types
? Function
: object;
type Type2 = TypeName2<() => void> // 类型为 Function
type Type3 = TypeName2<string[]> // 类型为 object
type Type4 = TypeName2<(() => void ) | string[]> // 类型为 object | Function

// never是所有类型的子类型；never被认为是空的联合类型；
type A21 = never extends 'x' ? string : number; // string
type P2<T> = T extends 'x' ? string : number;
// 没有联合项可以分配，所以P<T>的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。
type A22 = P2<never> // never

// eg: 条件类型和映射类型结合的例子
type Type5<T> = {
  // tslint:disable-next-line:ban-types
  [ K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
interface Part {
  id: number;
  name: string;
  subpart: Part[];
  updatePart(newName: string): void;
  deletePart(id: number): void;
}
type Test = Type5<Part>; // Test的类型为 updatePart | deletePart

// 条件类型的类型推断- infer
// tslint:disable-next-line:array-type
type Type6<T> = T extends Array<infer U> ? U : T;
type test1 = Type6<string[]> // test1 类型是 string
type test2 = Type6<string> // test2 类型是 string
type test3 = Type6<number[]> // test3 类型是 number
type test4 = Type6<(number | boolean)[]> // test4 类型是 number | boolean

// TS 预定义类型
// InstanceType: 获取构造函数类型的实例类型
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
? R
: any;
class A {
  // tslint:disable-next-line:no-empty
  constructor(){}
}
type T1 = InstanceType<typeof A> // 类型为A ;typeof A返回的的是类 A 的类型，也就是 A，这里不能使用 A 因为它是值不是类型，类型 A 是构造函数，所以 T1 是 A 构造函数的实例类型，也就是 A
type T2 = InstanceType<any>; // T2的类型为any ; any 是任何类型的子类型
type T3 = InstanceType<never>; // T3的类型为never
// type T4 = InstanceType<string>; // error: 类型“string”不满足约束“new (...args: any[]) => any”。