import * as React from 'react'
import { NavLink,Link } from "react-router-dom";
import styled from 'styled-components'
import doAxios from 'utils/doAxios'
import { Context } from 'store/store'
import {IThemeData} from 'style/theme'
import {darken,lighten} from 'polished'
import {checkCleanedCache,setCleanedCache} from 'utils/cache'
interface IGender {
    id: number
    name: string
}
const Nav = () => {
    const contextInstance = React.useContext(Context)
    const {theme} = contextInstance.state
    const {dispatch}= contextInstance
    const NavWrapper = styled.nav`
        .logo{
            color:${theme.colors.logo};
            font-size:48px;
            display:inline-flex;
            justify-content:center;
            align-items:center;
        }
        .navButtonContainer{
            display:inline-flex;
            justify-content:space-between;
            align-items:center;
            .navLinkContainer{
                &__item{
                    display:inline-block;
                    width:100px;
                    font-size:28px;
                    color:${theme.colors.navLink};
                    margin:20px;
                    text-align:center;
                    &:hover{
                        color:${theme.colors.logo};
                    }
                }
                .active{
                    color:${theme.colors.logo};
                    background-color:${lighten(0.4,theme.colors.card)};
                }
            }
            .loginAndCartContainer{
                color:${theme.colors.logo};
                font-size:${theme.itemFontSize};
                &__loginbtn{
                    &:hover{
                        cursor:pointer;
                        text-decoration: underline;
                    }
                }
                &__cart{
                    &:hover{
                        cursor:pointer;
                        text-decoration: underline;
                    }
                }
            }
        }
    `
    const [genderData, setGenderData] = React.useState<IGender[]>([])
    React.useEffect(() => {
        const getGenderData = async () => {
            const checkCache = checkCleanedCache(contextInstance,{type:'gender'})
            if(checkCache){
                setGenderData(checkCache)
                return
            }
            const result = await doAxios('get', 'gender')
            if (result.isSuccess) {
                setGenderData(result.content)
                setCleanedCache(contextInstance,{type:'gender'},result.content)
            }
        }
        getGenderData()
    }, [])
    const changeTheme=(themeName:keyof IThemeData)=>{
        dispatch({type:'SET_THEME',value:themeName})
    }
    console.log('nav render')
    return (
        <NavWrapper className='row'>
            <div className='col-12'> <button onClick={()=>changeTheme('dark')}>切換成黑暗風格</button> <button onClick={()=>changeTheme('default')}>切換成預設風格</button>
            <button onClick={()=>console.log(contextInstance.state)}>查看state</button></div>
            <Link to='/' className='logo col-3'>Fativ</Link>
            <span className='navButtonContainer col-9'>
                <span className='navLinkContainer'>
                    {genderData.length > 0 ? genderData.map((gender) =>
                        <NavLink className='navLinkContainer__item' key={gender.name} to={`/gender/${gender.name}/all`}>
                            {gender.name}
                        </NavLink>
                    ) : null}
                </span>
                <span className='loginAndCartContainer'>
                    <a className='loginAndCartContainer__loginbtn'>登入</a>
                    <a className='loginAndCartContainer__cart'>購物車</a>
                </span>
            </span>
        </NavWrapper>
    )
}


export default Nav;
