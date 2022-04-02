/*
 * @Author: 周冰洁
 * 借助旧类型创建一个新类型的方式，它可以用相同的形式去转换旧类型中的每个属性
 */
export default {}

// 内置映射类型： Readonly / Partial
interface Info {
  age: number,
}
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P] // 定义一个ReadonlyType<T>的映射类型
}
type ReadonlyInfo = ReadonlyType<Info>
const info : ReadonlyInfo = {
  age: 18,
}
console.log('info', info.age)
// info.age = 28 // error: 无法分配到 "age" ，因为它是只读属性。

// 另外两个内置映射类型的实现：
type Pick<T, K extends keyof T> = { [P in K] : T[P]}
type Record<K extends keyof any, T> = { [P in K]: T }
// usage of Pick
interface Info2 {
  name: string,
  age: number,
  address: string,
}
const info2: Info2 = {
  name: 'lison',
  age: 18,
  address: 'bj'
}
function pick<T, K extends keyof T>(obj: T, kyes: K[]): Pick<T, K> {
  const res = {} as Pick<T, K>
  kyes.forEach(key => {
    res[key] = obj[key]
  })
  return res
}
// usage of Record
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const res = {} as Record<K, U>
  // tslint:disable-next-line:forin
  for(const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}
const names = { 0: "hello", 1: "world", 2: "bye" };
const lengths = mapObject(names, s => s.length); // { 0: 5, 1: 5, 2: 3 }

// 使用映射类型包装一个类型的属性后，也可以进行逆向操作，也就是拆包
// 包装操作
type Proxy<T> = {
  get(): T,
  set(value: T): void
}
type Proxify<T> = { // 定义一个映射类型，将一个对象的所以属性值类型都变为Proxy<T>处理后的类型
  [P in keyof T]: Proxy<T[P]>
}
function proxify<T>(obj: T): Proxify<T> {
  const result = {} as Proxify<T>
  // tslint:disable-next-line:forin
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: value => (obj[key] = value)
    }
  }
  return result
}
const props = {
  name: 'lison',
  age: 18
}
const proxyProps = proxify(props)
console.log(proxyProps.name.get()) // 'lison'
proxyProps.name.set('lily')
// 拆包
function unproxify<T>(t: Proxify<T>): T {
  const result = {} as T
  // tslint:disable-next-line:forin
  for(const k in t) {
    result[k] = t[k].get()
  }
  return result
}
const originalProps = unproxify(proxyProps)
console.log(originalProps) // { "name": "lily", "age": 18 }

/* 使用+和-符号作为前缀来指定增加还是删除修饰符, 但用的最多的是”-"。因为如果需要给某个字段加修饰符，"+"是可以省略不写的 */
interface Info1 {
  name: string,
  age: number,
}
type RemoveModifier<T> = {
  -readonly [P in keyof T]-?: T[P];
}
type InfoType = RemoveModifier<Readonly<Partial<Info1>>>
// let info3: InfoType = {
//   name: 'lison',
//   // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "RemoveModifier<Readonly<Partial<Info1>>>" 中需要该属性
// }
const info4: InfoType = {
  name: 'lison',
  age: 18
}
info4.name = '' // right, can edit