import * as React from 'react'
import { Link, useHistory ,useParams} from 'react-router-dom'
import doAxios from 'utils/doAxios'
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
const GenderAside = () => {
    console.log('genderAside render')
    const [categoryData, setCategoryData] = React.useState<ICategoryData[]>([]);
    const histroy = useHistory()
    const {genderUrl} = useParams()
    React.useEffect(() => {
        const getData = async () => {
            const result = await doAxios('get', 'category', { params: { genderUrl } })
            console.log(result)
            if (result.isSuccess) {
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
                        } else {
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
                setCategoryData(makeData())
            } else {
                console.log(2)
                histroy.push('')
            }
        }
        getData()
    }, [genderUrl])
    return (
        <aside>
            {
                categoryData.length >= 1 ?
                    categoryData.map((singleCategory: ICategoryData) =>
                        <section>
                            <div key={singleCategory.id}>{singleCategory.name}</div>
                            <ul>{
                                singleCategory.subCategorys.map((subCategory: ISubCategoryData) =>
                                    <li key={subCategory.subCategoryId}><Link to={`/gender/${genderUrl}/${subCategory.subCategoryUrl}`}>{subCategory.subCategoryName}</Link></li>
                                )}
                            </ul>
                        </section>
                    )
                    :
                    123
            }
        </aside>
    )
}


export default GenderAside;
