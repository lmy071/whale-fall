//导入 Axios 请求
import request from '../utils/axios'
//其他配置
import operate from '../utils/operate';

const baseUrl = 'user/'

export const login = (data?: any) => {
    return request({
        url: baseUrl+'login',
        method: 'post',
        data,
        //登录token
        isToken: operate.isToken(),
        //加载动画是否启动
        ifLoading: true,
        //是否允许重复请求
        repeatRequest: false,
    })
}


export const getDict = (data?: any) => {
	return request({
			url: baseUrl+'getDict',
			method: 'post',
			data,
			//登录token
			isToken: operate.isToken(),
			//加载动画是否启动
			ifLoading: true,
			//是否允许重复请求
			repeatRequest: false,
	})
}