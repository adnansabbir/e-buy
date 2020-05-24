import React from 'react';
import './App.scss';
import Homepage from "./pages/homepage/homepage.page";
import {Route} from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
    return (
        <div>
            <Header/>
            <Route exact={true} path='/' component={Homepage}/>
            <Route exact={true} path='/shop' component={ShopPage}/>
        </div>
    );
}

export default App;
