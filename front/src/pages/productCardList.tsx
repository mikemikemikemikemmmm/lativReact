import * as React from 'react'
import doAxios from 'utils/doAxios'
import ProductCard from 'components/productCard'
import { useParams, useHistory } from 'react-router';
interface IProductCard {
    id: number
    name: string
    price: number
    colorCodes: string[]
}
interface IOriginalCard {
    colorCode: string
    genderName: string
    id: number
    name: string
    price: number
}
const ProductCardList = () => {
    console.log('productCardList render')
    const { subCategoryUrl, genderUrl } = useParams()
    const history = useHistory()
    const [cardListData, setCardListData] = React.useState<IProductCard[]>([])
    React.useEffect(() => {
        const getData = async () => {
            const result = await doAxios('get', 'productList', { params: { genderUrl, subCategoryUrl } })
            if (result.isSuccess) {
                const makeData = () => {
                    let tempData: IProductCard[] = []
                    result.content.map((product: IOriginalCard) => {
                        const indexInTemp = tempData.findIndex((tempProduct) => tempProduct.id === product.id)
                        if (indexInTemp !== -1) {
                            tempData[indexInTemp]['colorCodes'].push(product.colorCode)
                        } else {
                            tempData.push({
                                ...product, colorCodes: [product.colorCode]
                            })
                        }
                    })
                    return tempData
                }
                setCardListData(makeData())
            } else {
                history.push('')
            }
        }
        getData()
    }, [genderUrl, subCategoryUrl])
    return (
        <>
            {cardListData.length > 0 ?
                cardListData.map((cardData: IProductCard) =>
                    <ProductCard {...cardData} />)
                :
                <div>loading</div>}
        </>
    )
}


export default ProductCardList;
