const dbKey = "wafi-test-database";
const dbData = localStorage.getItem(dbKey);

const db: IUser[] = dbData ? JSON.parse(dbData) : [];

export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  wallet_balance: number;
  username: string;
};

const existingUser: IUser = {
  first_name: "Anthony",
  last_name: "Uche",
  email: "uchetony007@gmail.com",
  password: "Wafi123!",
  wallet_balance: 100,
  username: "uchetony007",
};

const seedDb = () => {
  const mutatedDb = [...db];
  mutatedDb.push(existingUser);
  localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
};

const addUser = (user: Omit<IUser, "wallet_balance">) => {
  const mutatedDb = [...db];
  mutatedDb.push({ ...user, wallet_balance: 0 });
  localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
};

const getCurrentUser = () => {
  const currentUserData = localStorage.getItem("current_user");
  const currentUser = currentUserData ? JSON.parse(currentUserData) : {};
  return currentUser;
};

const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const newUser = db.find(
    (dbUser) => dbUser.email === email && dbUser.password === password
  );
  newUser && localStorage.setItem("current_user", JSON.stringify(newUser));
};

const signoutUser = () => {
  localStorage.removeItem("current_user");
};

const transferMoney = ({
  recipientUsername,
  amount,
}: {
  recipientUsername: string;
  amount: number;
}) => {
  const mutatedDb = [...db];
  const currentUserData = localStorage.getItem("current_user");
  const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {};

  const currentUserDbIndex = db.findIndex(
    (dbUser) => dbUser.username === currentUser.username
  );
  const recipientUserDbIndex = db.findIndex(
    (dbUser) => dbUser.username === recipientUsername
  );

  if (recipientUserDbIndex !== -1 && currentUserDbIndex !== -1) {
    mutatedDb[currentUserDbIndex].wallet_balance =
      db[currentUserDbIndex]?.wallet_balance - amount;
    mutatedDb[recipientUserDbIndex].wallet_balance =
      db[recipientUserDbIndex]?.wallet_balance + amount;
  }

  localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
  localStorage.setItem(
    "current_user",
    JSON.stringify({ ...mutatedDb[currentUserDbIndex] })
  );
};

const depositMoney = ({ amount }: { amount: number }) => {
  const mutatedDb = [...db];
  const currentUserData = localStorage.getItem("current_user");
  const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {};

  const currentUserDbIndex = db.findIndex(
    (dbUser) => dbUser.username === currentUser.username
  );
  if (currentUserDbIndex !== -1) {
    mutatedDb[currentUserDbIndex].wallet_balance =
      db[currentUserDbIndex].wallet_balance + amount;
  }

  localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
  localStorage.setItem(
    "current_user",
    JSON.stringify({ ...mutatedDb[currentUserDbIndex] })
  );
};

const withdrawMoney = ({ amount }: { amount: number }) => {
  const mutatedDb = [...db];
  const currentUserData = localStorage.getItem("current_user");
  const currentUser: IUser = currentUserData ? JSON.parse(currentUserData) : {};

  const currentUserDbIndex = db.findIndex(
    (dbUser) => dbUser.username === currentUser.username
  );
  if (currentUserDbIndex !== -1) {
    mutatedDb[currentUserDbIndex].wallet_balance =
      db[currentUserDbIndex].wallet_balance - amount;
  }

  localStorage.setItem(dbKey, JSON.stringify(mutatedDb));
  localStorage.setItem(
    "current_user",
    JSON.stringify({ ...mutatedDb[currentUserDbIndex] })
  );
};

export {
  seedDb,
  addUser,
  getCurrentUser,
  loginUser,
  signoutUser,
  transferMoney,
  depositMoney,
  withdrawMoney,
};
