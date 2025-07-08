//axios basic pack
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user'

const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000
})

// Add a request interceptor
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //从pinia获取token数据
  const userStore = useUserStore()
  //按要求拼接数据
  const token = userStore.userInfo.token
  if (token) {
    //如果有token就添加到请求头中
    config.headers.Authorization = `Bearer ${token}`
  }
  //返回配置对象
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //错误提示统一
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance;
