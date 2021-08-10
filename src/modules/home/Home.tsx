import React from "react";
import { useHistory } from "react-router-dom";
import {
  depositMoney,
  getCurrentUser,
  signoutUser,
  transferMoney,
  withdrawMoney,
} from "../../server";
import "./styles/Home.scss";

const Home = (): JSX.Element => {
  const history = useHistory();
  const user = getCurrentUser();
  const handleSignout = () => {
    signoutUser();
    history.push("/app");
  };

  const fundTransferFormInput = [
    {
      label: "Amount($)",
      name: "amount",
      type: "number",
      placeholder: "100",
    },
    {
      label: "Recipient",
      name: "recipientUsername",
      type: "text",
      placeholder: "Recipient's username",
    },
  ];

  const handleFundsTransfer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fundsTransferFormValues: Record<string, string> = {};

    ["amount", "recipientUsername"].forEach((key) => {
      fundsTransferFormValues[key] = event.currentTarget[key]?.value;
    });
    transferMoney({
      amount: +fundsTransferFormValues.amount,
      recipientUsername: fundsTransferFormValues.recipientUsername,
    });
    history.push("/app");
  };

  const handleFundsDeposit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    depositMoney({ amount: +event.currentTarget.amount.value });
    history.push("/app");
  };

  const handleFundsWithdrawal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    withdrawMoney({ amount: +event.currentTarget.amount.value });
    history.push("/app");
  };

  return (
    <div className="home-page-wrapper">
      <div className="all-transactions-form-holder">
        <div className="user-account-details">
          <div>
            <h3>Hi {user.first_name}</h3>
            <span>
              Your balance is <b>${user.wallet_balance}</b>
            </span>
          </div>
          <div>
            <button onClick={handleSignout}>sign out</button>
          </div>
        </div>
        <hr />
        <form onSubmit={handleFundsTransfer} className="form">
          <div className="header">
            <h1>Transfer funds</h1>
          </div>
          {fundTransferFormInput.map((item) => (
            <div key={item.label} className="formGroup">
              <label>{item.label}</label>
              <div className="input-field">
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                />
              </div>
            </div>
          ))}
          <button type="submit">Transfer</button>
        </form>
        <hr />
        <form onSubmit={handleFundsDeposit} className="form">
          <div className="header">
            <h1>Deposit funds</h1>
          </div>
          <div className="formGroup">
            <label>Amount($)</label>
            <div className="input-field">
              <input type="number" placeholder="e.g 100" name="amount" />
            </div>
          </div>
          <button type="submit">Deposit</button>
        </form>
        <hr />
        <form onSubmit={handleFundsWithdrawal} className="form">
          <div className="header">
            <h1>Withdraw funds</h1>
          </div>
          <div className="formGroup">
            <label>Amount($)</label>
            <div className="input-field">
              <input type="number" placeholder="e.g 100" name="amount" />
            </div>
          </div>
          <button type="submit">Withdraw</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
