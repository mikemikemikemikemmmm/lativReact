import { Request, Response } from "express";
import connectDB from "../utils/connectDB"
import sendWrapper from '../utils/sendWrapper'
import { orderFormSchema } from '../config/joi'
export default {
    async getOrder(req: Request, res: Response) {
        const { _email } = req.body
        const sqlQuery = `
            SELECT *
            FROM order
            INNER JOIN user
            ON user.email = '${_email}'
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async postOrder(req: Request, res: Response) {
        interface ICart {
            productId: number
            productNum: number
        }
        interface IForm {
            userEmail: string
            cart: ICart[]
        }
        const validateResult = orderFormSchema.validate(req.body)
        const validateError = validateResult.error
        if (validateError) {
            sendWrapper(res, { content: "POST格式錯誤", isSuccess: false })
            return
        }
        const form: IForm = validateResult.value
        const computeTotalPrice = async (form: IForm): Promise<number> => {
            let totalPrice: number = 0
            for (let index = 0; index < form.cart.length; index++) {
                const sqlQuery = `
                        SELECT *
                        FROM product
                        WHERE id = '${form.cart[index].productId}'
                    `
                const getPrice = await connectDB(sqlQuery)
                if (!getPrice.isSuccess) {
                    totalPrice = -1
                    break
                }
                totalPrice += getPrice.content[0].price * form.cart[index].productNum
            }
            return totalPrice
        }
        const totalPrice = await computeTotalPrice(form)
        if (totalPrice < 0) {
            sendWrapper(res, { content: '資料庫錯誤', isSuccess: false })
            return
        }
        const sqlQuery = `
            SELECT *
            FROM order
            INNER JOIN user
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async deleteOrder(req: Request, res: Response) {
        const { orderId } = req.body
        const sqlQuery = `
            SELECT *
            FROM order
            INNER JOIN user
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async changePassword(req: Request, res: Response) {
        const { newPassword } = req.body
        const sqlQuery = `
            SELECT *
            FROM order
            INNER JOIN user
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
}