const fs = require('fs')

const dataBase = "database.json"

const authenticateUserDb = (password, email) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.email === email && u.password === password);
  if (index === -1) return ({ status: 'fail', data: 'Fel e-post eller lösenord'}) ;
  return { status: 'success', data: users[index] };
}

const createUserInDb = (user) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.email === user.email);
  if (index !== -1) return ({ status: 'fail', data: { email: 'E-Post finns redan registrerad' } });

  users.push(user);
  fs.writeFileSync(dataBase, JSON.stringify({ users }, null, 2));
  return ({ status: 'success', data: 'Användare skapad' });
}

const updateUserInDb = (user) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.id === user.id);
  const updatedUser = users[index].password  = user.password ;
  fs.writeFileSync(dataBase, JSON.stringify({ users }, null, 2));
  return ({ status: 'success', data: updatedUser });
}

const getUsersFromDb = () => {
  if (!fs.existsSync(dataBase)) {
    fs.writeFileSync(dataBase, JSON.stringify({ users: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(dataBase)).users;
}

const getUserFromDb = (id) => {
  const users = getUsersFromDb();
  return ({ status: 'success', data: users.find(u => u.id === id) });
}

const deleteUserFromDb = (id) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.id === id);
  users.splice(index, 1);
  fs.writeFileSync(dataBase, JSON.stringify({ users }, null, 2));
  return ({ status: 'success', data: 'Användaren är nu borttagen' });
}

module.exports = {createUserInDb, updateUserInDb, getUsersFromDb, getUserFromDb, deleteUserFromDb, authenticateUserDb}