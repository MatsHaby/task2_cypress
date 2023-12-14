const { createUserInDb, getUserFromDb, updateUserInDb,
  authenticateUserDb, deleteUserFromDb } = require("../models/usersModel");
const { v4: uuid } = require('uuid');

const getUser = (req, reply) => {
  const user = getUserFromDb(req.params.id);
  reply.send(user);
}

const authenticateUser = (req, reply) => {
  const { password, email } = req.body;
  const data = authenticateUserDb(password, email)
  if (data.status === 'success') {
    reply.send(data)
  } else {
    reply.status(401).send(data)
  }
}

const createUserPost = (req, reply) => {
  const { name, password, email, id } = req.body;
  reply.send(createUserInDb({id: id || uuid(), name, password, email}));
};

const updateUserPassword = (req, reply) => {
  const { email, password } = req.body;
  const { id } = req.params
   reply.send(updateUserInDb({id, password, email}));
};

const deleteUser = (req, reply) => {
  const { email } = req.body;
  reply.send(deleteUserFromDb(email));
}

module.exports = {getUser, createUserPost, updateUserPassword, authenticateUser, deleteUser}