/*
 * @Author: 周冰洁
 * @desc: 声明合并
 * 将名字相同的多个声明合并为一个声明，合并后的声明同时拥有多个声明的特性
 */

/*
 * TypeScript的所有声明概括起来，会创建这三种实体之一：命名空间、类型和值：
 * 1. 命名空间的创建实际是创建一个对象，对象的属性是在命名空间里export导出的内容
 * 2. 类型的声明是创建一个类型并赋给一个名字
 * 3. 值的声明就是创建一个在JavaScript中可以使用的值
 * Namespace: 创建了命名空间                创建了值
 * Class:                     创建了类型    创建了值
 * Enum:                      创建了类型    创建了值
 * interface:                 创建了类型
 * Type Alias:                创建了类型
 * Function:                                创建了值
 * Varibale:                                创建了值
 * (注意这里Variable是变量，不是常量，常量是可以作为类型使用的)
*/


/*
 * 1. 合并接口
 * 多个同名接口，定义的非函数的成员命名应该是不重复的，如果重复了，类型应该是相同的
 * 对于函数成员，每个同名函数成员都会被当成这个函数的重载，且合并时后面的接口具有更高的优先级
*/

/*
 * 2. 合并命名空间
 * 同名命名空间最后会将多个命名空间导出的内容进行合并
 * 在命名空间里，有时我们并不是把所有内容都对外部可见，对于没有导出的内容，在其它同名命名空间内是无法访问的（eg: 2.1）
*/
// eg:2.1
// tslint:disable-next-line:no-namespace
namespace Validation {
  const numberReg = /^[0-9]+$/
  export const stringReg = /^[A-Za-z]+$/
  // tslint:disable-next-line:no-empty
  export const checkString = () => {}
}
// tslint:disable-next-line:no-namespace
namespace Validation {
  export const checkNumber = (value: any) => {
    // return numberReg.test(value) // error: 找不到名称“numberReg”
    return stringReg.test(value) // right
  }
}

/*
 * 3. 命名空间和类的合并
 * 类的定义必须在命名空间前面
 * 合并是 一个包含一些以命名空间导出内容为静态属性的类
 * ???? 这边需要查看官方changelog 看下更新
*/
class Validation3 {
  // tslint:disable-next-line:no-empty
  checkType() {}
}
// tslint:disable-next-line:no-namespace
namespace Validation3 {
  export const numberReg = /^[0-9]+$/
  export const stringReg = /^[A-Za-z]+$/
  // tslint:disable-next-line:no-empty
  export const checkString = () => {}
}
// tslint:disable-next-line:no-namespace
namespace Validation3 {
  export const checkNumber = (value: any) => {
    return numberReg.test(value)
  }
}
console.log(Validation3.prototype)
console.log(Validation3.prototype.constructor)

/*
 * 4. 命名空间和函数的合并
 * 函数的定义要在命名空间前面
*/
function countUp () {
  countUp.count++
}
// tslint:disable-next-line:no-namespace
namespace countUp {
  export let count  = 0
}
countUp()
countUp()
console.log(countUp.count) // 2

/*
 * 5. 命名空间和枚举的合并
 * 先后顺序没有要求，会为枚举拓展内容
*/

enum Colors {
  red,
  green,
  blue
}
// tslint:disable-next-line:no-namespace
namespace Colors {
  export const yellow = 3
}
console.log(Colors)
// {
//   "0": "red",
//   "1": "green",
//   "2": "blue",
//   "red": 0,
//   "green": 1,
//   "blue": 2,
//   "yellow": 3
// }