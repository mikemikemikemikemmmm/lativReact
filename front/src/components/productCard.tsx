import * as React from 'react'
import { backendUrl } from 'config/globalVariable'
interface IProductCard {
    id: number
    name: string
    price: number
    colorCodes: string[]
}
const ProductCard = (props: IProductCard) => {
    return (
        <div>
            <img style={{width:100,height:200}} src={`${backendUrl()}static/productImg/${props.id}/1.jpg`} alt=""/>
            名稱:{props.name}
            價格:{props.price}
            {props.colorCodes.map(colorCode => <div>{colorCode}</div>)}
        </div>
    )
}
export default ProductCard