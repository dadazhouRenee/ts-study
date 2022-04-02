/*
 * @Author: 周冰洁
 * @desc: 类型保护
 * 使用类型保护可以更好地指定某个值的类型，可以把这个指定理解为一种强制转换，这样编译器就能知道我们这个值是我们指定的类型
 */

const valueList = [123, 'abc'];
const getRandomValue = () => {
  const value = Math.random() * 10; // 这里取一个[0, 10)范围内的随机值
  if (value < 5) { return valueList[0]; } else { return valueList[1]; } // 否则返回"abc"
};

/* 自定义类型保护 */
function isString(value: number | string): value is string { // 函数的返回值类型是一个结构为 value is type 的类型谓语，value 的命名无所谓，但是谓语中的 value 名必须和参数名一致
  return typeof value === 'string'
}
const item1 = getRandomValue()
if(isString(item1)) {
  console.log(item1.length) // item1 是string类型
} else {
  console.log(item1.toFixed()) // number 类型
  // console.log(item1.length) // error: 类型“number”上不存在属性“length”
}

/**
 * typeof 类型保护:
 * 1. 只能使用=和!两种形式来比较: (typeof item).includes(‘string’)这种判断是不行的
 * 2. type 只能是number、string、boolean 和 symbol四种类型; object、function和 undefined 只代表普通的js语句，不具有类型保护的效果
 */
if (typeof item1 === 'string') {
  console.log(item1.length)
} else {
  console.log(item1.toFixed())
}
// tslint:disable-next-line:no-empty
const valueList2 = [{}, () => {}];
const getRandomValue2 = () => {
  const number1 = Math.random() * 10;
  if (number1 < 5) {
    return valueList2[0];
  } else {
    return valueList2[1];
  }
}
const res2 = getRandomValue2()
if (typeof res2 === 'object') {
  console.log(res2.toString())
} else {
  // console.log(res2()) // error: 此表达式不可调用。类型 "{}" 没有调用签名
}

/* instanceof 类型保护 */
class CreateByClass1 {
  public age = 18;
  // tslint:disable-next-line:no-empty
  constructor() {}
}
class CreateByClass2 {
  public name = 'lison';
  // tslint:disable-next-line:no-empty
  constructor() {}
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}
const classItem = getRandomItem()
if (classItem instanceof CreateByClass1) {
  console.log(classItem.age)
} else {
  console.log(classItem.name)
}