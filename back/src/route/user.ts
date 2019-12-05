
import * as express from "express";
import userApi from '../api/user'
import { validateToken } from '../middleware/userAuth'
const router = express.Router();
router.use(validateToken);
router.route('/order')
    .get((req, res) => {
        userApi.getOrder(req, res)
    })
    .post((req, res) => {
        userApi.postOrder(req, res)
    })
    .delete((req, res) => {
        userApi.deleteOrder(req, res)
    })
router.route('/changePassword')
    .post((req, res) => {
        userApi.changePassword(req, res)
    })

export default router