const User = require("../models/models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const UserDto = require("../dto/user.dto");
const UserInfoDto = require("../dto/userInfo.dto");
const ApiError = require("../exceptions/api-error");
const UserInfo = require("../models/models/userInfo.model");

class UserService {
  async registration(email, login, password) {
    let user = await User.findOne({ where: { email } });
    if (user) {
      throw ApiError.BadRequest(
        `пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    user = await User.create({
      email,
      password: hashPassword,
      login,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest(
        `пользователь с таким email ${email} не был найден`
      );
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.findAll();
    console.log(users);
    return users;
  }

  async addUserInfo(user_id, description, address, education_rating, education){
    let userInfo = await UserInfo.findOne({ where: { user_id } });
    if (userInfo) {
      throw ApiError.BadRequest(
        `информация об этом пользователе с user_id ${user_id} уже существует, нужен метод для её обновления`
      );
    }
    userInfo = await UserInfo.create({
      user_id,
      description,
      address,
      education_rating,
      education,
    });
    const userInfoDto = new UserInfoDto(userInfo);
    return {
      userInfo: userInfoDto,
    };
  }

  async getUserInfo(user_id){
    let user = await User.findByPk(user_id);
    if (!user) {
      throw ApiError.BadRequest(
        `пользователь с таким id ${user_id} не был найден`
      );
    }
    const userDto = new UserDto(user);

    let user_info = await UserInfo.findOne({ where : { user_id } });
    if (!user_info) {
      throw ApiError.BadRequest(
        `информация о пользователе с таким id ${user_id} не была найдена`
      );
    }
    const userInfoDto = new UserInfoDto(user_info)
    return {
      user: userDto,
      user_info: userInfoDto
    };
  }

  async updateUser(user_id, description, address, education_rating, education){
    let userInfo = await UserInfo.findOne({ where: { user_id } });
    if (!userInfo) {
      throw ApiError.BadRequest(
        `пользователь с таким user_id ${user_id} не был найден`
      );
    }
    await userInfo.update({description, address, education_rating, education});  
    const updUser = await UserInfo.findOne({ where: { user_id } });
    const userInfoDto = new UserInfoDto(updUser);
    return{
      user: userInfoDto,
    }
  }
}

module.exports = new UserService();
