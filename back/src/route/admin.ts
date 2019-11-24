
import * as express from "express";
import guestApi from '../api/guest'

const router = express.Router();
router.route('/productList')
    .get((req, res) => {
        guestApi.getProductList(req, res)
    })

export default router