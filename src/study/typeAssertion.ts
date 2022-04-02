/*
 * @Author: 周冰洁
 * @desc: 类型断言
 */

const getLength = (target: string | number): number => {
  // if (target.length) { // error 报错信息看下方
  //   return target.length; // error 报错信息看下方
  // } else {
  //   return target.toString().length;
  // }
  return target.toString().length;
}

const getStrLength = (target: string | number): number => {
  if ((target as string).length) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}