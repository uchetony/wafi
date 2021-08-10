import React from 'react'
import { useHistory } from 'react-router-dom'
import { depositMoney, getCurrentUser, signoutUser, transferMoney, withdrawMoney } from '../../server'

const Home = (): JSX.Element => {
    const history = useHistory();
    const user = getCurrentUser();
    const handleSignout = () => {
        signoutUser();
        history.push('/app');
    }

    const fundTransferFormInput = [
        {
            label: 'Amount($)',
            name: 'amount',
            type: 'number',
            placeholder: '100'

        },
        {
            label: 'Recipient',
            name: 'recipientUsername',
            type: 'text',
            placeholder: 'Recipient\'s username'

        },
    ];

    const handleFundsTransfer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fundsTransferFormValues: Record<string, string> = {};

        ['amount', 'recipientUsername'].forEach((key) => {
            fundsTransferFormValues[key] = event.currentTarget[key]?.value;
        });
        transferMoney({ amount: +fundsTransferFormValues.amount, recipientUsername: fundsTransferFormValues.recipientUsername });       
        history.push('/app');
    }

    const handleFundsDeposit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        depositMoney({ amount: +event.currentTarget.amount.value });
        history.push('/app');
    }

    const handleFundsWithdrawal = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        withdrawMoney({ amount: +event.currentTarget.amount.value });
        history.push('/app');
    }

    return (
        <div>
            Home page <br />

            Hi {user.first_name} <br />
            Your balance is  ${user.wallet_balance} <br />

            <div>
                <h3>Transfer funds</h3>
                <form onSubmit={handleFundsTransfer}>
                {fundTransferFormInput.map((item) => (
                    <div key={item.label}>
                        <label>{item.label}</label>
                        <input 
                            type={item.type} 
                            placeholder={item.placeholder} 
                            name={item.name} 
                        />
                    </div>
                ))}
                <button type="submit">Transfer</button>
                </form>
                
            </div> <br />

            <div>
                <h3>Deposit funds</h3>
                <form onSubmit={handleFundsDeposit}>
                <div>
                        <label>Amount($)</label>
                        <input 
                            type="number" 
                            placeholder="e.g 100" 
                            name="amount" 
                        />
                    </div>
                <button type="submit">Deposit</button>
                </form>
                
            </div> <br />

            <div>
                <h3>Withdraw funds</h3>
                <form onSubmit={handleFundsWithdrawal}>
                <div>
                        <label>Amount($)</label>
                        <input 
                            type="number" 
                            placeholder="e.g 100" 
                            name="amount" 
                        />
                    </div>
                <button type="submit">Deposit</button>
                </form>
                
            </div> <br />

            <button onClick={handleSignout} >sign out</button>
        </div>
    )
}

export default Home;
