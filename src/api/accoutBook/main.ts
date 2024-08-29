/*
 * @description: 请求接口 配置
 * @Author: Jay
 * @Date: 2023-04-11 13:24:41
 * @LastEditors: Jay
 * @LastEditTime: 2023-09-04 13:30:09
 */

//导入 Axios 请求
import request from '../../utils/axios'
//其他配置
import operate from '../../utils/operate';

const baseUrl = 'accountBook/'

export const getDetail = (data?: any) => {
    return request({
        url: baseUrl+'/detail/get',
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

export const addDetail = (data?: any) => {
    return request({
        url: baseUrl+'detail/set',
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

/*
请求配置与使用

* 请求 方式
    export const 名字 = (data: any) =>
        request.post("接口", data, {
            直接为空
            注：只能配置 AxiosRequestConfig 里有的参数名 可不用配置
        });

*使用 方法
   *引入
        import {
            名字
        } from "../api/api"
    *生命周期中 请求
        名字({请求参数}).then((res) => {
            console.log(res)
        })
*/