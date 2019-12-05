import React from 'react'
import { themeData, ITheme, IThemeData } from 'style/theme'
interface ICLEAN_DATACACHE {
    type: 'CLEAN_DATACACHE'
}
interface ISET_THEME {
    type: 'SET_THEME'
    value: keyof IThemeData
}
interface ISET_DATACACHE {
    type: 'SET_DATACACHE'
    value: any
}
interface ISET_ISLOADING {
    type: 'SET_ISLOADING'
    value: boolean
}
type IAction = ISET_DATACACHE | ISET_ISLOADING | ISET_THEME | ICLEAN_DATACACHE

interface IContextState {
    theme: ITheme
    isLoading: boolean
    cleanedDataCache: any
}
export interface IUseContext {
    state: IContextState,
    dispatch: React.Dispatch<IAction>
}
export const initState = {
    theme: themeData['default'],
    isLoading: false,
    cleanedDataCache: {}
}
interface ICleanedCache {
    genderUrl?: string
    detailId?: number
    subCategoryUrl?: string
    cleanedData: any
}
function handleCleanedCache(data: ICleanedCache) {

}

export function makeReducer(state: IContextState = initState, action: IAction) {
    switch (action.type) {
        case 'SET_ISLOADING':
            return { ...state, isLoading: action.value }
        case 'SET_THEME':
            return { ...state, theme: themeData[action.value] }
        case 'SET_DATACACHE':
            return {
                ...state, cleanedDataCache: { ...state.cleanedDataCache, ...action.value }
            }
        case 'CLEAN_DATACACHE':
            return {
                ...state, cleanedDataCache: {}
            }
        default:
            return state
    }
}
const state: IContextState = initState
//@ts-ignore
const dispatch: React.Dispatch<IAction> = {}
const a = 123
export const Context = React.createContext({ state, dispatch })
