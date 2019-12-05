import * as React from 'react'
import doAxios from 'utils/doAxios'
import ProductCard from 'components/productCard'
import { useParams, useHistory } from 'react-router';
import { Context } from 'store/store'
import { checkCleanedCache, setCleanedCache } from 'utils/cache'
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
    const contextInstance = React.useContext(Context)
    const { theme } = contextInstance.state
    const { subCategoryUrl, genderUrl } = useParams()
    const history = useHistory()
    const [cardListData, setCardListData] = React.useState<IProductCard[]>([])
    React.useEffect(() => {
        const getData = async () => {
            const checkCache = checkCleanedCache(contextInstance, { type: 'productList', params: { genderUrl, subCategoryUrl } })
            if (checkCache) {
                setCardListData(checkCache)
                return
            }
            const result = await doAxios('get', 'productList', { params: { genderUrl, subCategoryUrl } })
            if (result.isSuccess) {
                /**
                 * make data to match 
                 * @interface IProductCard
                 */
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
                const cleanedData = makeData()
                setCardListData(cleanedData)
                setCleanedCache(contextInstance,{ type: 'productList', params: { genderUrl, subCategoryUrl } },cleanedData)
            } else {
                history.push('')
            }
        }
        getData()
    }, [genderUrl, subCategoryUrl])
    return (
        <div className='col-9 row'>
            {cardListData.length > 0 ?
                cardListData.map((cardData: IProductCard) =>
                    <ProductCard key={cardData.id} {...cardData} />)
                :
                <div>loading</div>}
        </div>
    )
}


export default ProductCardList;
