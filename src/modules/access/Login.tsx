import React from 'react'
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../server';
import { Link } from 'react-router-dom'

const Login = (): JSX.Element => {
    const history = useHistory();

    const loginFormInput = [
        {
            label: 'Email',
            type: 'text',
            placeholder: 'Email address'

        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password'

        },
    ];

    const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginFormValues: Record<string, string> = {};

        ['email', 'password'].forEach((key) => {
            loginFormValues[key] = event.currentTarget[key]?.value || '';
        });
        loginUser(loginFormValues as { email: string; password: string });
        history.push('/app');
    }

    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                {loginFormInput.map((item) => (
                    <div key={item.label}>
                        <label>{item.label}</label>
                        <input 
                            type={item.type} 
                            placeholder={item.placeholder} 
                            name={item.label.toLowerCase()} 
                        />
                    </div>
                ))}
                <button type="submit">login</button>
            </form>

            <Link to="/signup">Sign up</Link>
        </div>
    )
}

export default Login;
