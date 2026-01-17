const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/authmiddleware");
const userController = require("../controllers/user.controller");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);


router.post("/todos", userAuth, userController.createTodo);
router.get("/todos", userAuth, userController.getAllTodos);
router.delete("/todos/:id", userAuth, userController.dltTodo);

module.exports = router;
