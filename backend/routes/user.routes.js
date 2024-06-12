const express = require('express')
const userRouter = express.Router()
const { asyncHandler, requireToken } = require("../middleware/middleware");
const {authCheck} = require('../middleware/auth.middleware');
const {registration, login, logout, refresh, getUsers, addUserInfo, getUserInfo, updateUserInfo} = require('../controllers/user.controllers');

userRouter.post("/registration", asyncHandler(registration));
userRouter.post("/login", asyncHandler(login));
userRouter.post("/logout", asyncHandler(authCheck), asyncHandler(logout));
userRouter.get("/refresh", asyncHandler(refresh));
userRouter.post("/addUserInfo", asyncHandler(authCheck), asyncHandler(addUserInfo))
userRouter.patch("/updateUserInfo", asyncHandler(authCheck), asyncHandler(updateUserInfo))
userRouter.get("/userinfo", asyncHandler(authCheck), asyncHandler(getUserInfo));
userRouter.get("/users", asyncHandler(getUsers));

module.exports = userRouter