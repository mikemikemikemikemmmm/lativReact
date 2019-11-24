import { Response } from "express";
import IConnectDBResult from './interface'
const sendResult = (res: Response, queryResult: IConnectDBResult) => {
    console.log(queryResult)
    switch (queryResult.status) {
        case '1':
            res.status(200).send(queryResult)
            break;
        case '2':
            res.sendStatus(204)
            break;
        case '3':
            res.sendStatus(500)
            break;
        case '4':
            res.sendStatus(500)
            break;
    }
}
export default sendResult