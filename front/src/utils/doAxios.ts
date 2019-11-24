
import axios, { AxiosResponse } from 'axios'
import { backendUrl } from 'config/globalVariable'
interface IConnectDBResult {
    content: any
    isSuccess: boolean
}
interface IAxiosConfig {
    data?: any
    params?: any
    auth?: string
}
export default function doAxios(method: "get" | "post" | "put" | "delete", url: string, config?: IAxiosConfig) {
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
    return axios(tempConfig).then((res: AxiosResponse<IConnectDBResult>): IConnectDBResult => {
        return res.data
    }).catch((): IConnectDBResult => {
        return { content: `客戶端發生錯誤`, isSuccess: false }
    })
}