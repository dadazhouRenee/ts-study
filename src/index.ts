import normalRequset from '@/utils/request/index';

interface Req {
  key: string;
  keyword: string;
}
interface Res {
  name: string,
  range: string,
  zdzt: string,
  yd: string,
}

const h1 = document.createElement('h1');
h1.innerHTML = 'Hello, I am zhouzhou';
document.body.appendChild(h1);


const get15DaysWeatherByArea = (data: Req) => {
  return normalRequset<Req, Res>({
    url: '/fapig/constellation/query',
    method: 'GET',
    data,
    interceptors: {
      requestInterceptors(res) {
        console.log('星座接口请求拦截')
        return res
      },
      responseInterceptors(result) {
        console.log('星座接口响应拦截')
        return result
      }
    }
  })
}
// window.onload = async () => {
//   const res = await get15DaysWeatherByArea({
//     key: '',
//     keyword: '1996-11-22',
//   })
//   console.log(res)
// }