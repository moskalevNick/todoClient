import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Registration from '../components/Registration';
import Auth from '../components/Auth';

const UnAuthRoutes = () => {
    return(
        <Router>
            <Switch>
                <Route path='/auth'>
                    <Auth/>
                </Route>
                <Route path='/registration'>
                    <Registration/>
                </Route>
                <Redirect to='/auth'/>
            </Switch>
        </Router>
    )
}

export default UnAuthRoutes;