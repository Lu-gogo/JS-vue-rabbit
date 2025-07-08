//axios basic pack
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user'
import router from '@/router'

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

  //401token过期
  //清除用户信息 跳转登录页
  if (e.response.status === 401) {
    const userStore = useUserStore()
    userStore.clearUserInfo()
    //跳转到登录页
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance;
