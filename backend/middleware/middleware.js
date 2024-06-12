const Token = require("../models/models/token.model");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token.service");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const requireToken = async (req, res, next) => {
  const token = req.header("token")
  if (!token) {
      throw new Error("Token wast sent ", 400);
  }
  console.log(token)
  const dbToken = await Token.findOne({
      where: { refresh_token: token },
  });

  if (!dbToken) {
      throw new Error("Incorrect token", 401)
  }

  next()
};

const authCheck = async(req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}

module.exports = {
  asyncHandler,
  syncHandler,
  requireToken,
  authCheck,
};
