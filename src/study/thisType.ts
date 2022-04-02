/*
 * @Author: 周冰洁
 * ThisType是一个内置的接口，用来在对象字面量中键入this
 */
export default {}
/*
 * 1. 对象字面量具有ThisType<T>指定的类型， 此时 this 的类型为T；
 * 2. 不包含ThisType<T>指定的上下文类型, 那么此时的this具有上下文类型；
 */
type ObjectDescriptior<D, M> = { // 使用类型别名定义一个接口， 使用泛型， 泛型变量D和M
  data?: D,
  methods?: M & ThisType<D & M>, // 类型为M和ThisType<D & M> 组成的交叉类型
}

function makeObject<D, M>(desc: ObjectDescriptior<D, M>): D & M {
  const data: object = desc.data || {}
  const methods: object = desc.methods || {}
  return {...data, ...methods} as D & M
}

const obj = makeObject({
  data: { x: 0, y: 0},
  methods: {
    moveBy(dx: number, dy: number) : void {
      this.x += dx; // 所以这里的this是我们通过ThisType<D & M>指定的，this的类型就是D & M
      this.y += dy;
    }
  }
})

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
