const { v4: uuidv4 } = require('uuid');
const TodoError = require('../errors/TodoError');
const { STATUS_CODES } = require('../utils/constants');

const users = [];

const createUser = (user) => {
  const { name, username } = user;
  if (!name || name.trim().length === 0) {
    throw new Error('Invalid name');
  }
  if (!username || username.trim().length === 0) {
    throw new Error('Invalid username');
  }

  const duplicated = users.filter((user) => user.username === username);

  if (duplicated.length > 0) {
    throw new TodoError(STATUS_CODES.BAD_REQUEST, `Username ${username} is already in use`);
  }

  user.id = uuidv4();
  user.todos = [];
  users.push(user);

  return user;
};

const getUserById = (id) => {
  if (!id) {
    throw new Error('Invalid user id');
  }

  return users.find((u) => u.id === id);
};

const getUserByUsername = (username) => {
  if (!username) {
    throw new Error('Invalid username');
  }
  return users.find((u) => u.username === username);
};

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
  users,
}