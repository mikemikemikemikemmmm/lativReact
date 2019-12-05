import * as React from 'react'
import { RouteComponentProps } from 'react-router';
import GenderAside from 'pages/genderAside'
import styled from 'styled-components';
import doAxios from 'utils/doAxios'
import { backendUrl } from 'config/globalVariable'

interface ISubProduct {
    "subCategoryId": number
    "subproductName": string
    "colorCode": string
    "S": number
    "M": number
    "L": number
    "XL": number
}
interface IProductDetail {
    price: number
    name: string
    id: number
    genderId: number
    subProduct: ISubProduct[]
    genderUrl: string
}
interface IOriginalProductDetail {
    "id": number
    "name": string
    "genderId": number
    "subCategoryId": number
    "price": number
    "genderUrl": string
    "subproductName": string
    "colorCode": string
    "S": number
    "M": number
    "L": number
    "XL": number
}
const ProductDetail = (props: RouteComponentProps<{ productId: string }>) => {
    //router params only accept string
    const { productId } = props.match.params
    const [detailData, setDetailData] = React.useState<IProductDetail>()
    React.useEffect(() => {
        const getProductDetailData = async () => {
            const result = await doAxios<IOriginalProductDetail[]>('get', 'productDetail', { params: { productId } })
            if (!result.isSuccess) {
                return
            }
            console.log(result.content)
            const cleanData = () => {
                let tempObj!: IProductDetail
                (result.content as IOriginalProductDetail[]).forEach(item => {
                    if (!tempObj) {
                        tempObj = Object.assign({})
                        tempObj.id = item.id
                        tempObj.name = item.name
                        tempObj.price = item.price
                        tempObj.genderUrl = item.genderUrl
                        tempObj.genderId = item.genderId
                        tempObj.subProduct = []
                    }
                    tempObj.subProduct.push({
                        subCategoryId: item.subCategoryId,
                        subproductName: item.subproductName,
                        colorCode: item.colorCode,
                        S: item.S,
                        M: item.M,
                        L: item.L,
                        XL: item.XL
                    })
                })
                console.log(tempObj)
                return { ...tempObj }
            }
            setDetailData(cleanData())
        }
        getProductDetailData()
    }, [productId])

    console.log('detail render')
    const DetailWrapper = styled.div`
        display:flex;
        .detailContainer{
            &__informationSection{
                display:flex;
            }
            &__Img{
                width:300px;
                height:300px;
                margin-right: 30px;
                padding-bottom: 20px;
            }
            .informationSection{
                flex-grow:1;
                &__TitleAndPrice{
                display:flex;
                   
                } 
                &__Title{

                    }
                    &__Price{
                        margin-left:auto;
                    }

                &__Sub{

                }
            }
            
        }
     `
    return (
        <DetailWrapper>
            {detailData ?
                <>
                    <GenderAside genderUrl={detailData.genderUrl} />
                    <section className='detailContainer col-9'>
                        <div className='detailContainer__informationSection'>
                            <img className='detailContainer__Img' src={`${backendUrl()}static/productImg/${detailData.id}/1.jpg`} alt="" />
                            <span className='informationSection'>
                                <div className='informationSection__TitleAndPrice'>
                                    <div className='informationSection__Title'>
                                        {detailData.name}
                                    </div>
                                    <div className='informationSection__Price'>
                                        {detailData.price}
                                    </div>
                                </div>

                                <div className='informationSection__Sub'>

                                </div>
                            </span>
                        </div>
                        <div className='detailContainer__'>
                        </div>
                    </section>
                </> : null
            }
        </DetailWrapper>
    )
}
export default ProductDetail;