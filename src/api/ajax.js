/* ajax请求函数模块
返回值： promise对象 (异步返回的数据是response.data)
const response = await ajax()
const result = response.data
新建Promise的作用是简化外部调用 const result = await ajax()
*/
import axios from 'axios'

export default function ajax (url = '', data, type = 'GET') {
  // 参数resolve, reject是函数，接收函数的函数称为高阶函数
  return new Promise(function (resolve, reject) {
    // 执行异步ajax异步请求
    let promise
    if (type === 'GET') {
    //   准备url query 参数数据，把data里的数据拼到url里
    //   let dataStr = ''
    //   Object.keys(data).forEach(key => {
    //     dataStr += key + '=' + data[key] + '&'
    //   })
    //   if (dataStr !== '') {
    //     // 提取dataStr首位开始一直到最后一个&前的字符串
    //     dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
    //     url = url + '?' + dataStr
    //   }
    //   发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
    }
    promise.then(function (response) {
      // 成功调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败调用reject()
      alert('请求失败，发现错误：' + error)
      reject(error)
    })
    return promise
  })
}
