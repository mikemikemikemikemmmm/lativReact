import connectDB from "./global/connectDB"
import { Request, Response } from "express";
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
        res.send(await connectDB(sqlQuery))
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
        res.send(await connectDB(sqlQuery))
    },
    async getGender(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        res.send(await connectDB(sqlQuery))
    },
    async getProductDetail(req: Request, res: Response) {
        const { productId } = req.query
        const sqlQuery = `
            SELECT *
            FROM product
            WHERE id = '${productId}'
            INNER JOIN subProduct
            ON product.id=subProduct.productId
            INNER JOIN sizes
            ON subProduct.id=subProduct.subProductId
        `
        res.send(await connectDB(sqlQuery))
    },
    //undone
    async search(req: Request, res: Response) {
        const { name } = req.query
        const sqlQuery = `
            SELECT *
            FROM product
            WHERE id = ''
        `
        res.send(await connectDB(sqlQuery))
    },
    async login(req: Request, res: Response) {
        const { query } = req
        const sqlQuery = `
            SELECT *
            FROM product
            WHERE id = ''
            INNER JOIN subProduct
            ON product.id=subProduct.productId
            INNER JOIN sizes
            ON subProduct.id=subProduct.subProductId
        `
        res.send(await connectDB(sqlQuery))
    },
    async register(req: Request, res: Response) {
        const { query } = req
        const sqlQuery = `
            SELECT *
            FROM product
            WHERE id = ''
            INNER JOIN subProduct
            ON product.id=subProduct.productId
            INNER JOIN sizes
            ON subProduct.id=subProduct.subProductId
        `
        res.send(await connectDB(sqlQuery))
    },
}
