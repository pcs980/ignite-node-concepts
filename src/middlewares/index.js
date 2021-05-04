const { getUserByUsername } = require("../services/users");

exports.checksExistsUserAccount = (request, response, next) => {
  const { username } = request.headers;
  let status = 0;
  let userError = '';

  if (!username) {
    status = 403;
    userError = 'Username not provided';
  } else {
    const user = getUserByUsername(username);
    if (!user) {
      status = 404;
      userError = 'Username not found';
    }
  }

  if (userError) {
    response.status(status).json({
      error: userError
    });
  }

  request.username = username;

  next();
}
