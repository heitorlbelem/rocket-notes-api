const authConfig = require("../config/auth")
const { verify } = require("jsonwebtoken")

async function ensureAuthenticated(request, response, next) {
  const [, token] = request.headers.authorization.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated