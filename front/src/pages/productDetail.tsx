import * as React from 'react'
import { RouteComponentProps } from 'react-router';
interface ISize{
    id:number
}
interface ISubProduct{
    colorCode:string
    name:string
    id:number
    sizes:ISize[]
}
interface IProductDetail {
    price:number
    name:string
    subCategoryId:number
    id:number
    genderId:number
    subProduct:ISubProduct[]
    pictureLength:number
}
const ProductDetail = (props: RouteComponentProps<{ productId: string }>) => {
    //router params only accept string
    const { productId } = props.match.params
    const [productDetailData, setProductDetailData] = React.useState<IProductDetail>()
   /*React.useEffect(() => {
        const getProductDetailData = async () => {
        }
    })*/
    
    return (
        <section>
            商品ID:{productId}
        </section>
    )
}
export default ProductDetail;