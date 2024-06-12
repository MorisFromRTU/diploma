module.exports = class UserInfoDto {
    description
    address;
    userinfo_id
    education_rating;
    education;
  
    constructor(model) {
        this.userinfo_id = model.userinfo_id;
        this.address = model.address;
        this.description = model.description;
        this.education_rating = model.education_rating;
        this.education = model.education
    }
  };
  