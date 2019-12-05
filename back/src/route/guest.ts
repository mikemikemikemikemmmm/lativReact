
import * as express from "express";
import guestApi from '../api/guest'
const router = express.Router();
router.route('/')
    .get((req, res) => {
        console.log(123)
    })
router.route('/productDetail')
    .get((req, res) => {
        guestApi.getProductDetail(req, res)
    })
router.route('/productList')
    .get((req, res) => {
        guestApi.getProductList(req, res)
    })
router.route('/gender')
    .get((req, res) => {
        guestApi.getGender(req, res)
    })
router.route('/category')
    .get((req, res) => {
        guestApi.getCategory(req, res)
    })
router.route('/register')
    .post((req, res) => {
        guestApi.register(req, res)
    })
router.route('/getToken')
    .post((req, res) => {
        guestApi.getToken(req, res)
    })
export default router