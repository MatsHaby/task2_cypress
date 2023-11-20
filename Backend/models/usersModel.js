const fs = require('fs')

const dataBase = "database.json"

// const verifyIfUserExists = (user) => {
//   const users = getUsersFromDb();
//   const index = users.findIndex(u => u.email === user.email);
//   if (index === -1) return ('Email already taken');
// }

const authenticateUserDb = (password, email) => {
  console.log('uuuuuser', password, email)
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.email === email && u.password === password);
  if (index === -1) return ({ status: 'fail', data: 'Wrong email or password'}) ;
  return { status: 'success', data: users[index] };
}

const createUserInDb = (user) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.email === user.email);
  if (index !== -1) return ({ status: 'fail', data: { email: 'Email already taken' } });

  users.push(user);
  fs.writeFileSync(dataBase, JSON.stringify({ users }));
  return ({ status: 'success', data: 'User is created' });
}

const updateUserInDb = (user) => {
  const users = getUsersFromDb();
  const index = users.findIndex(u => u.id === user.id);
  const updatedUser = users[index] = user;
  fs.writeFileSync(dataBase, JSON.stringify({ users }));
  return ({ status: 'success', data: updatedUser });
}

const getUsersFromDb = () => {
  if (!fs.existsSync(dataBase)) {
    fs.writeFileSync(dataBase, JSON.stringify({ users: [] }));
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
  fs.writeFileSync(dataBase, JSON.stringify({ users }));
  return ({ status: 'success', data: 'User is deleted' });
}

module.exports = {createUserInDb, updateUserInDb, getUsersFromDb, getUserFromDb, deleteUserFromDb, authenticateUserDb}