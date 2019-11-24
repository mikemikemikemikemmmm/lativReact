import * as React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Link,
    NavLink
} from "react-router-dom";
import styled from 'styled-components'
import { primaryColor } from 'style/global'
import doAxios from 'utils/doAxios'
interface IGender {
    id: number
    name: string
}
const Logo = styled.span`
    color:${primaryColor};
    font-size:20px;
`
const SearchSection = styled.div``
const NavLinkContainer = styled.span``
const CartAndLoginContainer = styled.span``
const Nav = () => {
    const [genderData, setGenderData] = React.useState<IGender[]>([])
    React.useEffect(() => {
        const getData = async () => {
            const result = await doAxios('get', 'gender')
            console.log(result)
            if (result.isSuccess) {
                console.log(result)
                setGenderData(result.content)
            }
        }
        getData()
    }, [])
    console.log('nav render')
    return (
        <nav>
            <SearchSection></SearchSection>
            <Logo>Fativ</Logo>
            <NavLinkContainer>
                {genderData.length > 0 ? genderData.map((gender) =>
                    <NavLink className='navGenderLink' key={gender.name} to={`/gender/${gender.name}/all`}>
                        {gender.name}
                    </NavLink>
                ) : null}
                <NavLink to="/">test</NavLink>
            </NavLinkContainer>
            <CartAndLoginContainer>
                <button className='loginBtn'>登入</button>
                <button >購物車</button>
            </CartAndLoginContainer>
        </nav>
    )
}


export default Nav;
