const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const postService = require("../service/post-service");

class UserController {
  async create(req, res, next) {
    try {
      const { title, content, images } = req.body;
      const userData = await postService.createPost(title, content, images);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // async logout(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const token = await userService.logout(refreshToken);
  //     res.clearCookie("refreshToken");
  //     return res.json(token);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getPosts(req, res, next) {
    try {
      const posts = await postService.getPosts();
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
