import * as React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import doAxios from 'utils/doAxios'
import styled from 'styled-components'
import { Context } from 'store/store'
import { checkCleanedCache, setCleanedCache } from 'utils/cache'

//Link not belong browserRouter

interface ICategoryData {
    name: string
    subCategorys: ISubCategoryData[]
    id: number
}
interface IOriginalData {
    id: number
    url: string
    name: string
    genderId: number
    subCategoryId: number
    subCategoryName: string
    subCategoryUrl: string
}
interface ISubCategoryData {
    subCategoryId: number
    subCategoryName: string
    subCategoryUrl: string
}
const GenderAside = (props: { genderUrl: string }) => {
    console.log('genderAside render')
    const contextInstance = React.useContext(Context)
    const { theme } = contextInstance.state
    const AsideWrapper = styled.aside`
    font-size:${theme.itemFontSize};
        .categoryContainer{
            &__bigCategory{
                font-weight: bolder;
                margin-bottom:15px;
            }
            &__category{
                display:block;
                color:${theme.colors.aside};
                margin-bottom:${theme.layout.itemInterval};
                &:hover{
                    cursor:pointer;
                    text-decoration: underline;
                    color: lighten(${theme.colors.aside}, 50%);
                }
            }
        }
    `
    const [categoryData, setCategoryData] = React.useState<ICategoryData[]>([]);
    const histroy = useHistory()
    const { genderUrl } = props
    React.useEffect(() => {
        const getData = async () => {
            const checkCache = checkCleanedCache(contextInstance, { type: 'category', params: { genderUrl } })
            if(checkCache){
                setCategoryData(checkCache)
                return
            }
            const result = await doAxios('get', 'category', { params: { genderUrl } })
            if (result.isSuccess) {
                /**
                 * make data to
                 * {id,name,subCategorys:[{subCategoryId,subCategorName,subCategoryUrl}]}
                 */
                const makeData = () => {
                    const originalData = [...result.content]
                    let categoryTempData: ICategoryData[] = [];
                    (result.content as IOriginalData[]).forEach((originalData: IOriginalData) => {
                        const indexInTemp = categoryTempData.findIndex((tempData) => {
                            return tempData.id === originalData.id
                        })
                        if (indexInTemp !== -1) {
                            categoryTempData[indexInTemp]['subCategorys'].push({
                                subCategoryId: originalData.subCategoryId,
                                subCategoryName: originalData.subCategoryName,
                                subCategoryUrl: originalData.subCategoryUrl,
                            })
                        } else {//if not exist in tempData, then create
                            categoryTempData.push({
                                id: originalData.id,
                                name: originalData.name,
                                subCategorys: [
                                    {
                                        subCategoryId: originalData.subCategoryId,
                                        subCategoryName: originalData.subCategoryName,
                                        subCategoryUrl: originalData.subCategoryUrl,
                                    }
                                ]
                            })
                        }
                    })
                    return categoryTempData
                }
                const cleanedData = makeData()
                setCategoryData(cleanedData)
                setCleanedCache(contextInstance,{ type: 'category', params: { genderUrl } },cleanedData)
            } else {
                histroy.push('')
            }
        }
        getData()
    }, [genderUrl])
    return (
        <AsideWrapper className='col-3'>
            {
                categoryData.length >= 1 ?
                    categoryData.map((singleCategory: ICategoryData) =>
                        <section key={singleCategory.id} className='categoryContainer'>
                            <div className='categoryContainer__bigCategory' >。{singleCategory.name}</div>
                            {
                                singleCategory.subCategorys.map((subCategory: ISubCategoryData) =>
                                    <Link className='categoryContainer__category' key={subCategory.subCategoryId} to={`/gender/${genderUrl}/${subCategory.subCategoryUrl}`}>〉{subCategory.subCategoryName}</Link>
                                )}

                        </section>
                    )
                    :
                    null
            }
        </AsideWrapper>
    )
}


export default GenderAside;
