const uuid = require("uuid");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const postsModel = require("../models/posts-model");

class PostService {
  async createPost(title, content, images) {
    const candidate = await postsModel.findOne({ title });
    if (candidate) {
      throw ApiError.BadRequest(`Post with title: ${title} already exists`);
    }
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const registrationDate =
      date + "-" + month + "-" + year + " " + hour + ":" + minute;
    const post = await postsModel.create({
      title,
      content,
      images,
      registrationDate,
    });
    return post;
  }

  // async logout(refreshToken) {
  //   const token = await tokenService.removeToken(refreshToken);
  //   return token;
  // }

  async getPosts() {
    const posts = await postsModel.find();
    return posts;
  }
}

module.exports = new PostService();
