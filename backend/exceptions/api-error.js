module.exports = class ApiError extends Error {
    status;
    errors;
  
    constructor(status, message, errors = []) {
      super(message);
      this.errors = errors;
      this.status = status;
    }
  
    static UnauthorizedError() {
      return new ApiError(401, "Пользователь не авторизован");
    }
  
    static RegisterError() {
      return new ApiError(401, "Неверный формат данных");
    }

    static IncorrectInputError(){
      return new ApiError(401, "Неверный формат данных о пользователе");
    }
  
    static BadRequest(message, errors = []) {
      return new ApiError(400, message, errors);
    }
  };
  