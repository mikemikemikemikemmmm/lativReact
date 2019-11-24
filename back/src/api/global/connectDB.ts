
import * as mysql from 'mysql'
import sqlConfig from '../../config/sql'
import IConnectDBResult from './interface'
const connectDB = (sqlQuery: string) => {
    return new Promise<IConnectDBResult>((resolve, reject) => {
        const connection = mysql.createConnection(sqlConfig)
        connection.connect((connectErr) => {
            if (connectErr) {
                console.log(connectErr.message)
                reject({ content: '連接資料庫時發生錯誤', isSuccess: false })
                return
            }
        });
        connection.query(sqlQuery, (queryError, results, fields) => {
            if (queryError) {
                console.log(queryError.message)
                reject({ content: '查詢資料庫時發生錯誤', isSuccess: false })
                return
            }
            if (results.length === 0) {
                resolve({ content: results, isSuccess: false })
                return
            }
            resolve({ content: results, isSuccess: true })
        });
    }).catch((errObj: IConnectDBResult) => {
        return errObj
    })
}
export default connectDB