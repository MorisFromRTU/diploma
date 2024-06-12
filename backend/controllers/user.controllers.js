const e = require("express");
const Token = require("../models/models/token.model");
const User  = require("../models/models/user.model");
const ApiError = require("../exceptions/api-error");
const userService = require("../services/user.service");

async function registration(req, res, next) {
  try {
    const { email, login, password } = req.body;
    if (!email) {
      return ApiError.RegisterError()
    }
    if (!password){
      return ApiError.RegisterError()
    }
    const userData = await userService.registration(email, login, password);
    res.json(userData);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await userService.login(email, password);
    if (!userData) {
      return ApiError.UnauthorizedError();
    }
    res.json(userData);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const refreshToken = req.header("token")
    const token = await userService.logout(refreshToken);
    await Token.destroy({
      where: {
        refresh_token: req.header("token"),
      },
    });
    res.status(200).json({message: "Success logout"})
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    if (!req.header("token")) res.status(401).json({message: "No token"})
    const userData = await userService.refresh(req.header("token"));
    res.json(userData);
  } catch (error) {
    next(e);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
}

async function addUserInfo(req, res, next){
  try{
    const { description, address, education_rating, education } = req.body;
    const userInfo = await userService.addUserInfo(req.query.user_id, description, address, education_rating, education)
    if (!userInfo){
      return ApiError.IncorrectInputError();
    }
    res.json(userInfo);
  } catch(error) {
    console.log(error);
    next(error);
  }
}

async function getUserInfo(req, res, next) {
  try{
    const user = await userService.getUserInfo(req.query.user_id);
    return res.json(user);
  }catch(error){
    next(error);
  }
}

async function updateUserInfo(req, res, next) {
  try{
    const {description, address, education_rating, education} = req.body;
    const newUserData = await userService.updateUser(req.query.user_id, description, address, education_rating, education);
    if (!newUserData){
      return ApiError.IncorrectInputError();
    }
    res.json(newUserData)
  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports = {
    registration,
    login,
    logout,
    refresh,
    getUsers,
    addUserInfo,
    getUserInfo,
    updateUserInfo,
}

