interface ICartProductItem {
    id: number
    num: number
}
const cart = localStorage.getItem('cart')
export const addCartItem = (cartProductItem: ICartProductItem) => {
    if (cart) {
        const parseCart: ICartProductItem[] = JSON.parse(cart)
        parseCart.push(cartProductItem)
        localStorage.setItem('cart', JSON.stringify(parseCart))
        return
    }
    localStorage.setItem('cart', JSON.stringify([cartProductItem]))
}
export const removeCartItem = (cartProductItemIndex: number) => {
    if (cart) {
        const parseCart: ICartProductItem[] = JSON.parse(cart)
        parseCart.splice(cartProductItemIndex, 1)
        localStorage.setItem('cart', JSON.stringify(parseCart))
    }
}
export const changeCartItemNum = (cartProductItemIndex: number,isPlus:boolean) => {
    if (cart) {
        const parseCart: ICartProductItem[] = JSON.parse(cart)
        parseCart[cartProductItemIndex]['num'] += (isPlus?1:-1)
        localStorage.setItem('cart', JSON.stringify(parseCart))
    }
}