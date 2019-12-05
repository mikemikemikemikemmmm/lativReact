import { IUseContext } from "store/store"
interface IParams {
    type: 'gender' | 'category' | 'productList'
    data?: any
    params?: any
}
export const checkCleanedCache = (context: IUseContext, params: IParams): any => {
    const cacheIndex = JSON.stringify(params)
    console.log(cacheIndex, '快取索引')
    if (cacheIndex in context.state.cleanedDataCache) {
        return context.state.cleanedDataCache[cacheIndex]
    } else {
        return false
    }
}
export const setCleanedCache = (context: IUseContext, params: IParams, data: any): void => {
    const cacheIndex = JSON.stringify(params)
    console.log(cacheIndex, '設置快取索引')
    if (Object.keys(context.state.cleanedDataCache).length > 20) {
        context.dispatch({ type: 'CLEAN_DATACACHE' })
        console.log(cacheIndex, '清空快取索引')
    }
    context.dispatch({ type: 'SET_DATACACHE', value: { [cacheIndex]: data } })
}