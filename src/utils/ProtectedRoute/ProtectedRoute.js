import React from 'react';
import {Route ,Redirect} from 'react-router-dom';

const protectedRoute =({isAllowed,...props})=>
    isAllowed ? <Route {...props}/> : <Redirect to="/login" />


export default protectedRoute;