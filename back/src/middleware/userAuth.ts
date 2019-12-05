import { Request, Response, NextFunction } from "express";
import { jwtKey } from '../config/crypto'
import sendWrapper from '../utils/sendWrapper'
import * as JWT from 'jsonwebtoken'
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body
    JWT.verify(token, jwtKey, function (err: any, decoded: any) {
        console.log(decoded)
        if (err) {
            sendWrapper(res, { content: '驗證錯誤', isSuccess: false })
            return
        }
        req.body._email = decoded 
        next()
    });
}
