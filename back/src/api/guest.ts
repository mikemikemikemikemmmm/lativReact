
import { Request, Response } from "express";
import * as bcryptjs from 'bcryptjs'
import * as JWT from 'jsonwebtoken'

import connectDB from "../utils/connectDB"
import sendWrapper from '../utils/sendWrapper'
import { saltRounds, jwtKey } from '../config/crypto'
import { userSchema } from '../config/joi'
export default {
    async getProductList(req: Request, res: Response) {
        const { genderUrl, subCategoryUrl } = req.query
        const sqlQuery = `
            SELECT product.id,
                product.name,
                product.price,
                subproduct.colorCode,
                gender.name as genderName
            FROM product
            INNER JOIN subproduct
            ON subproduct.productId = product.id
            INNER JOIN gender
            ON gender.id = product.genderId AND gender.url = '${genderUrl}'
            ${subCategoryUrl === 'all' ? '' : `
            INNER JOIN subcategory
            ON product.subCategoryId= subcategory.id AND subcategory.url = '${subCategoryUrl}'
            `}
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async getCategory(req: Request, res: Response) {
        const { genderUrl } = req.query
        const sqlQuery = `
            SELECT category.*,
                subcategory.id as subCategoryId,
                subcategory.name as subCategoryName,
                subcategory.url as subCategoryUrl
            FROM category
            INNER JOIN subcategory
            ON category.id=subcategory.categoryId
            WHERE category.genderId IN(
                SELECT id AS genderId
                FROM gender
                WHERE url = '${genderUrl}'
            )
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async getGender(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async getProductDetail(req: Request, res: Response) {
        const { productId } = req.query
        const sqlQuery = `
            SELECT product.* ,
                gender.url as genderUrl,
                subproduct.name as subproductName,
                subproduct.colorCode,
                subproduct.S,
                subproduct.M,
                subproduct.L,
                subproduct.XL
            FROM product
            INNER JOIN gender
            ON gender.id = product.genderId
            LEFT JOIN subproduct
            ON subproduct.productId=product.id
            WHERE product.id = '${productId}'
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async search(req: Request, res: Response) {
        const { name } = req.query
        const sqlQuery = `
            SELECT *
            FROM product
            WHERE name LIKE %${name}%
        `
        sendWrapper(res, await connectDB(sqlQuery))
    },
    async register(req: Request, res: Response) {
        interface IValue {
            email: string
            password: string
        }
        const validateResult = userSchema.validate(req.body)
        const value: IValue = validateResult.value
        const validateError = validateResult.error
        if (validateError) {
            sendWrapper(res, { content: "POST格式錯誤", isSuccess: false })
            return
        }
        try {
            const findUserSqlQuery = `
                SELECT *
                FROM user
                WHERE email = '${value.email}'
            `
            const findUser = await connectDB(findUserSqlQuery)
            if (findUser.isSuccess) {
                sendWrapper(res, { content: '用戶已存在', isSuccess: false })
                return
            }
            const salt = await bcryptjs.genSalt(saltRounds)
            const hash = await bcryptjs.hash(value.password, salt)
            const createUserSqlQuery = `
            INSERT INTO user (email,password)
            VALUES ('${value.email}','${hash}');
        `
            const createUser = await connectDB(createUserSqlQuery)
            if (!createUser.isSuccess) {
                sendWrapper(res, { content: '寫入資料庫時發生錯誤', isSuccess: false })
                return
            }
            sendWrapper(res, { content: '註冊成功', isSuccess: true })
        } catch {
            sendWrapper(res, { content: '發生錯誤', isSuccess: false })
        }
    },
    async getToken(req: Request, res: Response) {
        interface IValue {
            email: string
            password: string
        }
        const validateResult = userSchema.validate(req.body)
        const value: IValue = validateResult.value
        const validateError = validateResult.error
        if (validateError) {
            sendWrapper(res, { content: '格式錯誤', isSuccess: false })
            return
        }
        try {
            const findUserSqlQuery = `
                SELECT *
                FROM user
                WHERE email = '${value.email}'
            `
            const findResult = await connectDB(findUserSqlQuery)
            if (!findResult.isSuccess) {
                sendWrapper(res, { content: '找不到用戶', isSuccess: false })
                return
            }
            const isPasswordCorrect = await bcryptjs.compare(value.password, findResult.content[0].password)
            if (!isPasswordCorrect) {
                sendWrapper(res, { content: '密碼錯誤', isSuccess: false })
                return
            }
            const token = JWT.sign(value.email, jwtKey)
            sendWrapper(res, { content: { token: token, email: value.email }, isSuccess: true })
        } catch (error) {
            sendWrapper(res, { content: `資料庫錯誤${error}`, isSuccess: false })
        }
    }
}
