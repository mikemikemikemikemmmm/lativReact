import * as React from 'react'
import {
    BrowserRouter as NavLink, RouteComponentProps,
} from "react-router-dom";
import {Link} from 'react-router-dom'
//Link not belong browserRouter
import doAxios from 'utils/doAxios'
import gender from './gender';
interface ISubCategoryData {
    name: string
    id: number
}
interface ICategoryData {
    name: string
    subCategorys: ISubCategoryData[]
    id: number
}
interface IProps {
    gender: string
}
const GenderAside = (props: IProps) => {
    console.log('genderAside render')
    const [categoryData, setCategoryData] = React.useState<ICategoryData[]>([])
    React.useEffect(() => {
        const getCategoryData = async () => {
        }
    })
    return (
        <aside>
            {
                categoryData.length > 0 ?
                    categoryData.map((singleCategory: ICategoryData) => 
                        <section>
                            <div key={singleCategory.id}>{singleCategory.name}</div>
                            <ul>{
                                singleCategory.subCategorys.map((subCategory: ISubCategoryData) => 
                                    <li key={subCategory.id}><Link to={`/gender/${gender}/${subCategory.name}}`}>{subCategory.name}</Link></li>
                                )}
                            </ul>
                        </section>
                    )
                    :
                    null
            }
        </aside>
    )
}


export default GenderAside;
