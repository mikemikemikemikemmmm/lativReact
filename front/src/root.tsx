import * as React from 'react'
import * as ReactDom from "react-dom"
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import Nav from "pages/Nav"
import Index from "pages/index"
import Gender from "pages/gender"
import Pay from "pages/pay"
import AdminIndex from "adminPages/index"
import Footer from "pages/footer"
import OnSale from "pages/onSale"
import productDetail from "pages/productDetail"
import ProductCardList from 'pages/productCardList'

import 'style/bootstrap-grid.min.css';
import NoMatch from 'pages/NoMatch';

//1051619
const Root = () => {
    console.log('render root')
    return (
        <BrowserRouter>
            <div className="container">
                <Nav />
                <main>
                    <Switch>
                        <Route exact path="/" component={Index}></Route>
                        <Route path="/gender/:genderUrl/:subCategoryUrl" component={Gender}></Route>
                        <Route path="/detail/:productId" component={productDetail}></Route>
                        <Route path="/onSale/:onSaleId" component={OnSale}></Route>
                        <Route path="/pay/" component={Pay}></Route>
                        <Route path="/admin/" component={AdminIndex}></Route>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}
export default Root