import React from 'react';
import './App.scss';

import Homepage from "./pages/homepage/homepage.page";
import {Route} from "react-router-dom";

function App() {
    return (
        <div>
            <Route exact={true} path='/' component={Homepage}/>
        </div>
    );
}

export default App;
