import * as React from 'react'
import styled from 'styled-components'
const IndexWrapper = styled.section`
`
const Index = () => {
    return (
        <IndexWrapper>
            <div></div>
            <div>
                <img src={require('img/index/comment.gif')} alt="" />
                <img src={require('img/index/icon_line.gif')} alt="" />
                <img src={require('img/index/app.gif')} alt="" />
                <img src={require('img/index/icon_line.gif')} alt="" />
                <img src={require('img/index/fb.gif')} alt="" />
                <img src={require('img/index/icon_line.gif')} alt="" />
                <img src={require('img/index/line.gif')} alt="" />
            </div>
            <div>
            </div>
        </IndexWrapper>
    )
}


export default Index;
