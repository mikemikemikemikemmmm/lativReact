
import axios, { AxiosResponse } from 'axios'
import { backendUrl } from 'config/globalVariable'
interface IConnectDBResult<T> {
    content: T
    isSuccess: boolean
}
interface IAxiosConfig {
    data?: any
    params?: any
    auth?: string
}
/** 
 * @param method is one of get, post, put, delete
 * @param url is url of backend, it will be finally `${global_variable_backendUrl}/${url}`
 * @param config is a obj, data is for post method, params is for get method which will add to url finally
*/
export default function doAxios<T = any>(method: "get" | "post" | "put" | "delete", url: string, config?: IAxiosConfig) {
    console.log('發出axios')
    let tempConfig: any = {
        method: method,
        url: backendUrl() + url
    }
    if (config) {
        if (config.data) {
            tempConfig.data = config.data
        }
        if (config.params) {
            tempConfig.params = config.params
        }
        if (config.auth) {
            tempConfig.headers = { 'Authorization': "bearer " + config.auth }
        }
    }
    return axios(tempConfig)
        .then((res: AxiosResponse<IConnectDBResult<T>>): IConnectDBResult<T> =>
            res.data)
        .catch((error): IConnectDBResult<string> => { return { content: `客戶端發生錯誤${error}`, isSuccess: false } })
}