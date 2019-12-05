import * as React from 'react'
import { backendUrl } from 'config/globalVariable'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Context, IUseContext } from 'store/store'

interface IProductCard {
    id: number
    name: string
    price: number
    colorCodes: string[]
} 

const ProductCard = (props: IProductCard) => {
    const { theme } = React.useContext(Context).state
    const ProductCardWrapper = styled(Link)`
        font-size:${theme.itemFontSize};
        text-align:center;
        color:${theme.colors.card};
        &:hover{
        color:${theme.colors.card};
        }
        .productCard{
            &__img{
                width:100%;
                height:200px;
                margin-bottom:${theme.layout.itemInterval};
            }
            &__name{
                margin-bottom:${theme.layout.itemInterval};
            }
            &__price{
            }
        }
`
    return (
        <ProductCardWrapper to={`/detail/${props.id}`} className='col-3'>
            <img className='productCard__img' src={`${backendUrl()}static/productImg/${props.id}/1.jpg`} alt="" />
            <div className='productCard__name'>{props.name}</div>
            <div className='productCard__price'>NT$ {props.price}</div>
        </ProductCardWrapper>
    )
}
export default ProductCard