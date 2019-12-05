
import IConnectDBResult from './interface'
import { Response } from 'express'
export default (res:Response,content:IConnectDBResult)=>{
    res.send(content)
}