import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

const ProtectedRoute = ({ children, ...props }: RouteProps):JSX.Element => {
    const curentUser = localStorage.getItem('current_user');
    return (
        <Route
            {...props}
            render={({ location }) => {
                if (!curentUser) {
                    return (
                        <Redirect to={{ pathname: '/login', state: { from: location } }} />
                    )
                };
                return children;
            }}
        />
    )
}

export default ProtectedRoute;