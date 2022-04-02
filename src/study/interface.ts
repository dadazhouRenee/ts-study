/*
 * @Author: 周冰洁
 * @desc: 接口定义几乎任意机构
 */

/* ----- 绕开多余属性检查 start ------  */

// 1. 使用类型断言
interface Vegetables1 {
  color?: string,
  type: string,
}
const getVegetables1 = ({color, type}: Vegetables1) => {
  return `A ${color ? color + ' ' : ''}${type}`
}
getVegetables1({
  type: 'tomato',
  size: 1.2,
  price: 1.2
} as Vegetables1);

// 2. 添加索引签名
interface Vegetables2 {
  color: string,
  type: string,
  [prop: string]: any
}
const getVegetables2 = ({color, type}: Vegetables2) => {
  return `A ${color ? color + ' ' : ''}${type}`
}
getVegetables2({
  color: 'red',
  type: 'tomato',
  size: 1.2,
  price: 1.2
})
// 3. 利用类型兼容性（不推荐使用）
interface Vegetables3 {
  type: string
}
const getVegetables3 = ({ type }: Vegetables3) => {
  return `A ${type}`
}
// 是因为直接将对象字面量传入函数，和先赋给变量再将变量传入函数，这两种检查机制是不一样的，后者是因为类型兼容性。
// 如果 b 要赋值给 a，那要求 b 至少需要与 a 有相同的属性，多了无所谓;
const option = { type: 'tomato', size: 12}
getVegetables3(option)

/* ----- 绕开多余属性检查 end ------  */

// 可以设置索引类型为 number。但是这样如果你将属性名设置为字符串类型，则会报错；但是如果你设置索引类型为字符串类型，那么即便你的属性名设置的是数值类型，也没问题.
// 因为 JS 在访问属性值的时候，如果属性名是数值类型，会先将数值类型转为字符串，然后再去访问
const obj = {
  123: 'a',
  // '123': 'b', // error 对象文本不能具有多个名称相同的属性
}

// 混合类型 定义下面的案例
/*
  let countUp = () => {
    return ++countUp.count;
  }
  countUp.count = 0
  console.log(countUp()) // 1
  console.log(countUp()) // 2
*/
interface Counter {
  () : void; // 顶一个Counter这个结构必须包含一个函数，要求是无参数，返回void,即没有返回值
  count: number;
}

const getCounter = () : Counter => {
  const c = () => {
    c.count++
  }
  c.count = 0
  return c;
}
const counter:Counter = getCounter()
counter()
console.log(counter.count) // 1
counter()
console.log(counter.count) // 2




export default {}

