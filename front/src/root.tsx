import * as React from 'react'
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Nav from "pages/Nav"
import Index from "pages/index"
import Gender from "pages/gender"
import Pay from "pages/pay"
import AdminIndex from "adminPages/index"
import Footer from "pages/footer"
import OnSale from "pages/onSale"
import productDetail from "pages/productDetail"
import loginAndSignUp from 'pages/loginAndSignUp'
import NoMatch from 'pages/NoMatch';
import { initState, makeReducer, Context } from 'store/store'

import {GlobalStyle} from 'style/globalStyle'
import 'style/bootstrap-grid.min.css';

const Root = () => {
    console.log('render root')
    const [state, dispatch] = React.useReducer(makeReducer, initState);
    return (
        <Context.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                <GlobalStyle/>
                    <div className="container">
                        <Nav />
                        <main>
                            <Switch>
                                <Route exact path="/" component={Index}></Route>
                                <Route path="/gender/:genderUrl/:subCategoryUrl" component={Gender}></Route>
                                <Route path="/detail/:productId" component={productDetail}></Route>
                                <Route path="/onSale/:onSaleId" component={OnSale}></Route>
                                <Route path="/loginAndSignUp" component={loginAndSignUp}></Route>
                                <Route path="/pay/" component={Pay}></Route>
                                <Route path="/admin/" component={AdminIndex}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </main>
                        <Footer />
                    </div>
                </BrowserRouter>
        </Context.Provider>
    )
}
export default Root