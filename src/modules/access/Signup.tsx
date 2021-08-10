import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { addUser, IUser } from '../../server';

const Signup = (): JSX.Element => {
    const history = useHistory();

    const signupFormInput = [
        {
            label: 'First Name',
            name: 'first_name',
            type: 'text',
            placeholder: 'First name'

        },
        {
            label: 'Last Name',
            name: 'last_name',
            type: 'text',
            placeholder: 'Last name'

        },
        {
            label: 'Email',
            name: 'email',
            type: 'text',
            placeholder: 'Email address'

        },
        {
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: 'Username'

        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password'

        },
    ];

    const handleSignupFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signupFormValues: Record<string, string> = {};

        ['first_name', 'last_name', 'email', 'username', 'password'].forEach((key) => {
            signupFormValues[key] = event.currentTarget[key]?.value || '';
        });
        addUser(signupFormValues as Omit<IUser, 'wallet_balance'>);
        history.push('/app');
    };

    return (
        <div>
            <form onSubmit={handleSignupFormSubmit}>
                {signupFormInput.map((item) => (
                    <div key={item.label}>
                        <label>{item.label}</label>
                        <input 
                            type={item.type} 
                            placeholder={item.placeholder} 
                            name={item.name} 
                        />
                    </div>
                ))}
                <button type="submit">Signup</button>
            </form>

            <Link to="/login">Login</Link>
        </div>
    )
}

export default Signup;
