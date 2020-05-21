import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import Routes from './routes';




const App = (props) => {
    return(
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));


