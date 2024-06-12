const ApiError = require("../exceptions/api-error");
const Tag = require("../models/models/tag.model");

class TagService {
    async getTags(){
        const tags = await Tag.findAll();
        if (!tags) {
            throw ApiError.BadRequest(
              `тэгов не обнаружено`
            );
        }
        return tags;
    }
}

module.exports = new TagService();
