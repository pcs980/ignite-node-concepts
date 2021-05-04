const { STATUS_CODES } = require('../utils/constants');
const { checksExistsUserAccount } = require('../middlewares');
const {
  createTodo,
  completeTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} = require('../services/todos');

module.exports = (app) => {
  app.get('/todos', checksExistsUserAccount, (request, response) => {
    const { username } = request;

    try {
      const result = getTodos(username);
      response.status(STATUS_CODES.DONE).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });

  app.post('/todos', checksExistsUserAccount, (request, response) => {
    const { username } = request;
    const todo = request.body;

    try {
      const result = createTodo(username, todo);
      response.status(STATUS_CODES.CREATED).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });

  app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
    const { username } = request;
    const { id } = request.params;
    const todo = {
      id,
      ...request.body,
    };

    try {
      const result = updateTodo(username, todo);
      response.status(STATUS_CODES.DONE).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });

  app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
    const { username } = request;
    const { id } = request.params;

    try {
      const result = completeTodo(username, id);
      response.status(STATUS_CODES.DONE).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });

  app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
    const { username } = request;
    const { id } = request.params;

    try {
      deleteTodo(username, id);
      response.status(STATUS_CODES.NO_CONTENT).send();
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });
};
