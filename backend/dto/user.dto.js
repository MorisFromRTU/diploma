module.exports = class UserDto {
    email;
    id;
    login;
    constructor(model) {
      this.email = model.email;
      this.id = model.id;
      this.login = model.login;
    }
  };
  