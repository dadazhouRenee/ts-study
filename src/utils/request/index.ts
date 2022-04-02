/*
 * @Author: 周冰洁
 */
import Request from "./baseRequset";

import type { RequestConfig } from './baseRequset';
interface NormalRquestConfig<T> extends RequestConfig {
  data?: T;
}
interface NormalResponse<T> {
  statusCode: number,
  desc: string,
  result: T
}

// 基础配置
const request = new Request({
  baseURL: '/api',
  timeout: 1000 * 60 * 5,
  interceptors: {
    requestInterceptors: config => config,
    responseInterceptors: result => result,
  }
})

/**
 * @description: 函数得描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {NormalRquestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const normalRequset = <D = any, T = any>(config: NormalRquestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<NormalResponse<T>>(config)
}

export const cancelReuqest = (url: string | string[]) => {
  return request.cancelRequest(url)
}

export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default normalRequset;
