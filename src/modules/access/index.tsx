import React from 'react';
import { Route, Switch } from 'react-router';

const Login = React.lazy(() => import('./Login'));
const Signup = React.lazy(() => import('./Signup'));

const accessRoutesConfig = [
    {
        name: 'Login',
        exact: false,
        path: '/login',
        renderComponent: function LoginPage() {
            return <Login />
        }
    },
    {
        name: 'Signup',
        exact: true,
        path: '/signup',
        renderComponent: function SignupPage() {
            return <Signup />
        }
    }
]

const AccessPages = ():JSX.Element => {
    return (
        <Switch>
            {accessRoutesConfig.map((route) => {
                return (
                    <Route key={route.name} exact={route.exact} path={route.path}>
                        {route.renderComponent()}
                    </Route>
                )
            })}
        </Switch>
    )
}

export default AccessPages;