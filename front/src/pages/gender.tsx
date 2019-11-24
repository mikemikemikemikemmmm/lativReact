import * as React from 'react'
import GenderAside from 'pages/genderAside'
import ProductCardList from 'pages/productCardList'

const Gender = () => {
    console.log('gender render')

    return (
        <>
            <GenderAside/>
            <ProductCardList />
        </>
    )
}


export default Gender;
