/*
 * @description: 全局js
 * @Author: Jay
 * @Date: 2023-09-04 13:53:47
 * @LastEditors: Jay
 * @LastEditTime: 2023-09-04 13:55:44
 */

// vuex 数据

//接口地址
const baseUrl = () => {
    return 'api'
    // if (process.env.NODE_ENV == "development") {
    //     //开发环境
    //     return "";
    // } else {
    //     //正式环境
    //     return "";
    // }
}

//获取用户token
const isToken = () => {
    // if (store.state.Authorization != '') {
    //     return store.state.Authorization
    // }
    return localStorage.getItem("token")
}

//上传请求头 登录验证
const uploadParameters = () => {
    return { 'token': isToken() }
    // return { 'Authori-zation': 'Bearer ' + isToken() }
}

/* eslint-disable */

/*
    格式化时间 加上时分秒
    num: 后台时间格式
    type: 'YY-MM-DD' 年月日 ,'HH-MM-SS' 时分秒 ,不传 年月日时分秒
*/
const happenTime = (num: any, type: string) => {
    let date = new Date(num * 1000);
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let y: any = date.getFullYear();
    let MM: any = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM; //月补0
    let d: any = date.getDate();
    d = d < 10 ? ('0' + d) : d; //天补0
    let h: any = date.getHours();
    h = h < 10 ? ('0' + h) : h; //小时补0
    let m: any = date.getMinutes();
    m = m < 10 ? ('0' + m) : m; //分钟补0
    let s: any = date.getSeconds();
    s = s < 10 ? ('0' + s) : s; //秒补0
    if (type === 'YY-MM-DD') {
        //年月日
        return y + '-' + MM + '-' + d;
    } else if (type === 'HH-MM-SS') {
        //时分秒
        return h + ':' + m + ':' + s;
    } else {
        //全部
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
}
/* eslint-enable */


// 页面回到顶部（滚动效果）
/*
使用方法
 //监听滚动事件
  window.addEventListener("scroll", proxy.$operate.handleScroll, {
    once: true,
  });
*/
const handleScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop, "scrollTop");
    if (scrollTop > 0) {
        const timeTop = setInterval(() => {
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop -= 50; //一次减50往上滑动
            if (scrollTop <= 0) {
                clearInterval(timeTop);
            }
        }, 10); //定时调用函数使其更顺滑
    }
};

export default {
    baseUrl,
    isToken,
    uploadParameters,
    happenTime,
    handleScroll
}