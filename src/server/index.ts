const dbKey = 'wafi-test-database';
const dbData = localStorage.getItem(dbKey)

const db: IUser[] = dbData ? JSON.parse(dbData) : [];

type IUser = {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    wallet_balance: number;
    user_name: string;
}

const existingUser: IUser = {
    first_name: "Anthony",
    last_name: "Uche",
    email: "uchetony007@gmail.com",
    password: "Wafi123!",
    wallet_balance: 100,
    user_name: "uchetony007"
}

const seedDb = () => {
    const mutatedDb = db.push(existingUser)
    localStorage.setItem(dbKey, JSON.stringify(mutatedDb))
}

const addUser = (user: IUser) => {
    const mutatedDb = db.push(user);
    localStorage.setItem(dbKey, JSON.stringify(mutatedDb))
}

const loginUser = (email: string, password: string) => {
    const newUser = db.find(dbUser => {
        dbUser.email === email && dbUser.password === password
    });
    localStorage.setItem('current_user', JSON.stringify(newUser));
    return newUser || null;
}

const signoutUser = () => {
    localStorage.removeItem('current_user');
}

const transferMoney = (recipientUserName: string, amount: number) => {
    const mutatedDb = [...db];
    const currentUserData = localStorage.getItem('current_user');
    const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {}

    const currentUserDbIndex = db.findIndex((dbUser) => dbUser.user_name === currentUser.user_name);
    const recipientUserDbIndex = db.findIndex((dbUser) => dbUser.user_name === recipientUserName);
    mutatedDb[currentUserDbIndex].wallet_balance = mutatedDb[currentUserDbIndex].wallet_balance - amount;
    mutatedDb[recipientUserDbIndex].wallet_balance = mutatedDb[recipientUserDbIndex].wallet_balance + amount;

    localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
}

const depositMoney = (amount: number) => {
    const mutatedDb = [...db];
    const currentUserData = localStorage.getItem('current_user');
    const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {}

    const currentUserDbIndex = db.findIndex((dbUser) => dbUser.user_name === currentUser.user_name);
    mutatedDb[currentUserDbIndex].wallet_balance = mutatedDb[currentUserDbIndex].wallet_balance + amount;

    localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
}

const withdrawMoney = (amount: number) => {
    const mutatedDb = [...db];
    const currentUserData = localStorage.getItem('current_user');
    const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {}

    const currentUserDbIndex = db.findIndex((dbUser) => dbUser.user_name === currentUser.user_name);
    mutatedDb[currentUserDbIndex].wallet_balance = mutatedDb[currentUserDbIndex].wallet_balance - amount;

    localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
}

export {
    seedDb,
    addUser,
    loginUser,
    signoutUser,
    transferMoney,
    depositMoney,
    withdrawMoney
}