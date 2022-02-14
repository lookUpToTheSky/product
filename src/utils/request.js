import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10*1000 // request timeout
})
// 请求拦截
service.interceptors.request.use(
    config => {
        // 添加请求token等
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 返回拦截
service.interceptors.response.use(
    response => {
        let res = response.data
        if(res.code === 200) {
            return res
        }else{
            return Promise.reject(new Error('请求错误！'))
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service