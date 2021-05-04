const { STATUS_CODES } = require('../utils/constants');
const { createUser, getUserById } = require('../services/users');

module.exports = (app) => {
  app.post('/users', (request, response) => {
    const user = request.body;

    try {
      const result = createUser(user);
      response.status(STATUS_CODES.CREATED).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json({
        error: error.message,
      });
    }
  });

  app.get('/users/:id', (request, response) => {
    const { id } = request.params;

    try {
      const result = getUserById(id);
      response.status(STATUS_CODES.DONE).json(result);
    } catch (error) {
      response.status(error.status || STATUS_CODES.INTERNAL_ERROR).json(error);
    }
  });
};