import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import User from './pages/user';

ReactDOM.render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/user" component={User}/>
            </Switch>
        </App>
    </Router>
    ),
    document.getElementById('root')
);