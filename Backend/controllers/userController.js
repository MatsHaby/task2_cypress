const { createUserInDb, getUserFromDb, updateUserInDb, authenticateUserDb } = require("../models/usersModel");
const { v4: uuid } = require('uuid');

const getUser = (req, reply) => {
  const user = getUserFromDb(req.params.id);
  reply.send(user);
}

const authenticateUser = (req, reply) => {
  const { password, email } = req.body;
  reply.send(authenticateUserDb(password, email))
}

const createUserPost = (req, reply) => {
  const { name, password, email } = req.body;
  reply.send(createUserInDb({id: uuid(), name, password, email}));
};

const updateUserPassword = (req, reply) => {
  const { email, password } = req.body;
  const { id } = req.params
   reply.send(updateUserInDb({id, password, email}));
};

module.exports = {getUser, createUserPost, updateUserPassword, authenticateUser}