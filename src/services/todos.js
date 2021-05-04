const { v4: uuidv4 } = require('uuid');
const TodoError = require('../errors/TodoError');
const { STATUS_CODES } = require('../utils/constants');
const { getUserByUsername } = require('./users');

const completeTodo = (username, id) => {
  const user = getUserByUsername(username);

  const todo = user.todos.find((t) => t.id === id);
  if (!todo) {
    throw new TodoError(STATUS_CODES.NOT_FOUND, 'Todo not found');
  } else if (todo.done) {
    // in the name of idempotence
    return todo;
  }

  todo.done = true;
  user.todos = user.todos.filter((t) => t.id !== id);
  user.todos.push(todo);
  return todo;
};

const createTodo = (username, todo) => {
  validate(todo);
  const user = getUserByUsername(username);

  todo.id = uuidv4();
  todo.done = false;
  todo.created_at = new Date();
  user.todos.push(todo);

  return todo;
};

const deleteTodo = (username, id) => {
  const user = getUserByUsername(username);

  const todo = user.todos.find((t) => t.id === id);
  if (!todo) {
    throw new TodoError(STATUS_CODES.NOT_FOUND, 'Todo not found');
  }

  user.todos = user.todos.filter((t) => t.id !== id);
  return;
};

const getTodos = (username) => {
  const user = getUserByUsername(username);
  if (!user) {
    throw new Error('Unknown username');
  }
  return user.todos;
};

const updateTodo = (username, newTodo) => {
  const user = getUserByUsername(username);

  const oldTodo = user.todos.find((t) => t.id === newTodo.id);
  if (!oldTodo) {
    throw new TodoError(STATUS_CODES.NOT_FOUND, 'Todo not found');
  }

  newTodo = {
    ...oldTodo,
    title: newTodo.title || oldTodo.title,
    deadline: newTodo.deadline || oldTodo.deadline,
  };

  user.todos = user.todos.filter((t) => t.id !== newTodo.id);
  user.todos.push(newTodo);
  return newTodo;
};

const validate = (todo) => {
  const { title, deadline } = todo;
  if (!title || title.trim().length === 0) {
    throw new TodoError(STATUS_CODES.BUSINESS_ERROR, 'Invalid title');
  }
  if (!deadline) {
    throw new TodoError(STATUS_CODES.BUSINESS_ERROR, 'Invalid deadline');
  }
};

module.exports = {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
};