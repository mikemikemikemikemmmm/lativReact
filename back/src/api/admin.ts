import connectDB from "./global/connectDB"
import { Request, Response } from "express";
export const product= {
    async postNew(req: Request, res: Response) {
        const { genderUrl } = req.query
        const { subCategoryUrl } = req.query
        const sqlQuery = `
            SELECT id,name,gender,price,colors
            FROM product
            WHERE gender = '${genderUrl}' ${subCategoryUrl !== 'all'?`AND subCategory = '${subCategoryUrl}'`:''}
        `
        res.send(await connectDB(sqlQuery))
    },
    async put(req: Request, res: Response) {
        const { genderUrl } = req.query
        const sqlQuery = `
            SELECT *
            FROM category
            WHERE category.genderId IN(
                SELECT id
                FROM gender
                WHERE url = '${genderUrl}'
            )
            INNER JOIN subCatrgory
            ON category.id=subCatrgory.categoryId
        `
        res.send(await connectDB(sqlQuery))
    },
    async delete(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        res.send(await connectDB(sqlQuery))
    }
}
export const category= {
    async postNew(req: Request, res: Response) {
        const { genderUrl } = req.query
        const { subCategoryUrl } = req.query
        const sqlQuery = `
            SELECT id,name,gender,price,colors
            FROM product
            WHERE gender = '${genderUrl}' ${subCategoryUrl !== 'all'?`AND subCategory = '${subCategoryUrl}'`:''}
        `
        res.send(await connectDB(sqlQuery))
    },
    async put(req: Request, res: Response) {
        const { genderUrl } = req.query
        const sqlQuery = `
            SELECT *
            FROM category
            WHERE category.genderId IN(
                SELECT id
                FROM gender
                WHERE url = '${genderUrl}'
            )
            INNER JOIN subCatrgory
            ON category.id=subCatrgory.categoryId
        `
        res.send(await connectDB(sqlQuery))
    },
    async delete(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        res.send(await connectDB(sqlQuery))
    }
}
export const gender= {
    async postNew(req: Request, res: Response) {
        const { genderUrl } = req.query
        const { subCategoryUrl } = req.query
        const sqlQuery = `
            SELECT id,name,gender,price,colors
            FROM product
            WHERE gender = '${genderUrl}' ${subCategoryUrl !== 'all'?`AND subCategory = '${subCategoryUrl}'`:''}
        `
        res.send(await connectDB(sqlQuery))
    },
    async put(req: Request, res: Response) {
        const { genderUrl } = req.query
        const sqlQuery = `
            SELECT *
            FROM category
            WHERE category.genderId IN(
                SELECT id
                FROM gender
                WHERE url = '${genderUrl}'
            )
            INNER JOIN subCatrgory
            ON category.id=subCatrgory.categoryId
        `
        res.send(await connectDB(sqlQuery))
    },
    async delete(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        res.send(await connectDB(sqlQuery))
    }
}
export const onSale= {
    async postNew(req: Request, res: Response) {
        const { genderUrl } = req.query
        const { subCategoryUrl } = req.query
        const sqlQuery = `
            SELECT id,name,gender,price,colors
            FROM product
            WHERE gender = '${genderUrl}' ${subCategoryUrl !== 'all'?`AND subCategory = '${subCategoryUrl}'`:''}
        `
        res.send(await connectDB(sqlQuery))
    },
    async put(req: Request, res: Response) {
        const { genderUrl } = req.query
        const sqlQuery = `
            SELECT *
            FROM category
            WHERE category.genderId IN(
                SELECT id
                FROM gender
                WHERE url = '${genderUrl}'
            )
            INNER JOIN subCatrgory
            ON category.id=subCatrgory.categoryId
        `
        res.send(await connectDB(sqlQuery))
    },
    async delete(req: Request, res: Response) {
        const sqlQuery = `
            SELECT *
            FROM gender
        `
        res.send(await connectDB(sqlQuery))
    }
}

