import * as React from 'react'
import GenderAside from 'pages/genderAside'
import ProductCardList from 'pages/productCardList'
import styled from 'styled-components'
import {  useParams } from 'react-router-dom'
const GenderWrapper = styled.div`
display:flex;
`
const Gender = () => {
    console.log('gender render')
    const { genderUrl } = useParams()

    return (
        <GenderWrapper>
            <GenderAside genderUrl={(genderUrl as string)} />
            <ProductCardList />
        </GenderWrapper>
    )
}


export default Gender;
