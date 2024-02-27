require("dotenv").config();
const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const postController = require("../controllers/post-controller");
const upload = require("../middlewares/upload");
const Grid = require("gridfs-stream");
const { route } = require("../controllers/image-controller");
const connection = require("../db");
const mongoose = require("mongoose");

let gfs;
connection();
const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `${API_URL}/file/${req.file.filename}`;
  return res.send(imgUrl);
});

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/posts", authMiddleware, postController.getPosts);
router.post("/posts", postController.create);

module.exports = router;
