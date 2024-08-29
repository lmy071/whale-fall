/*
 * @description: 请求封装
 * @Author: Jay
 * @Date: 2023-04-11 13:24:41
 * @LastEditors: Jay
 * @LastEditTime: 2023-09-04 15:04:28
 */

// 导入axios
import axios  from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// 使用element-ui ElMessage做消息提醒  ElLoading加载
import { ElMessage, ElLoading } from "element-plus";
//请求头
import operate from "./operate"

//加载配置
let loadingInstance: { close: () => void };
let requestNum = 0;
//加载动画
const addLoading = () => {
    // 防止重复弹出
    requestNum++;
    if (requestNum === 1) {
        loadingInstance = ElLoading.service({ fullscreen: true });
    }
}
// 关闭 加载动画
const cancelLoading = () => {
    requestNum--;
    if (requestNum === 0) loadingInstance?.close();
}

//格式化请求链接
function getRequestKey(config: AxiosRequestConfig) {
    const { url, method, data, params } = config,
        //字符串化参数
        dataStr = JSON.stringify(data) || '',
        paramsStr = JSON.stringify(params) || '',
        //记得这里一定要处理 每次请求都掉会变化的参数(比如每个请求都携带了时间戳),否则二个请求的key不一样
        key = [method, url, dataStr, paramsStr].join("&");
    return key;
}

//创建存储 key 的 集合
const pendingMap = new Map()

//是否重复请求key
function setPendingMap(config: AxiosRequestConfig) {
    // 手动取消请求
    const controller = new AbortController()
    config.signal = controller.signal
    const key = getRequestKey(config)
    //判断是否存在key 存在取消请求 不存在添加
    if (pendingMap.has(key)) {
        // abort取消请求
        pendingMap.get(key).abort()
        //删除key
        pendingMap.delete(key)
    } else {
        pendingMap.set(key, controller)
    }
}

//增加新的请求参数类型
declare module 'axios' {
    //请求自定义参数
    interface AxiosRequestConfig {
        // 是否显示加载框
        ifLoading?: boolean
        // 是否允许重复请求
        repeatRequest?: boolean
        // 登录 token
        isToken?: any;
    }
}

//创建axios的一个实例
const axiosInstance: AxiosInstance = axios.create({
    //接口统一域名
    baseURL: operate.baseUrl(),
    //设置超时
    timeout: 1000 * 30,
    //跨域携带cookie
    withCredentials: true,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config:any) => {
				config.headers.userId = localStorage.getItem('userId')
        //加载动画
        if (config?.ifLoading) addLoading();
        //是否判断重复请求
        if (!config.repeatRequest) {
            setPendingMap(config)
        }

        //判断是否有token 根据自己的需求判断
        const token = config.isToken
        // console.log("判断是否有token", token)
        if (token != undefined) {
            //如果要求携带在参数中
            // config.params = Object.assign({}, config.params, operate.uploadParameters())
            // 如果要求携带在请求头中
            // config.headers = Object.assign({}, config.headers, operate.uploadParameters())
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    const config = response.config
    // 关闭加载 动画
    if (config?.ifLoading) cancelLoading();
    //是否登录过期
    if (response.data.code == 400 || response.data.code == 401) {
        ElMessage.error("登录过期,请重新登录")
        // //清除登录缓存
        // store.commit("LOGOUT")
        // //返回首页
        // setTimeout(() => {
        //     router.push("/");
        // }, 500);
        return
    }
    // 返回参数
    return response.data
})

// 错误处理
axiosInstance.interceptors.response.use(undefined, (error:any) => {
    const config = error.config
    // 关闭加载 动画
    if (config?.ifLoading) cancelLoading();

    //拦截掉重复请求的错误,中断promise执行
    if (axios.isCancel(error)) return []

    /***** 接收到异常响应的处理开始 *****/
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                // window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            error.message = '服务器响应超时，请刷新当前页'
        } else {
            error.message = '连接服务器失败'
        }
    }

    //提示
    ElMessage.error(error.message)

    /***** 处理结束 *****/
    return Promise.resolve(error)
})

export default axiosInstance