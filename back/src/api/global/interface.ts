
export default interface IConnectDBResult {
    content: any
    /**
     * to tell you what's the result is
     * '1' success get data 
     * '2' success get data, but length is 0
     * '3' fail get data, when connect db
     * '4' fail get data, when sql query
     */
    status?: '1' | '2' | '3' | '4'
    isSuccess:boolean
}