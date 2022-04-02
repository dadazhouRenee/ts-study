/*
 * @Author: 周冰洁
 */

// ***********symbol类型：unique symbol 是 symbol的子类型，只能由Symbol() 或者Symbol.for()创建（必须要const 不能使用let）；仅可用于常量的定义和用于属性名；
let sym: symbol = Symbol()
const key1: unique symbol = Symbol() // 不可以使用let创建
let key2: symbol = Symbol();
const obj1 = {
  [key1]: 'value1',
  [key2]: 'value2',
}
console.log(obj1[key1]);
console.log(obj1[key2]);