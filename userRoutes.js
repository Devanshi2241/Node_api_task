const express = require('express')
const router = express.Router();

const {signup,login,get_all_users,get_all_userdetail} = require("./userController.js");
const checkAuth = require("./check-auth.js");



router.route("/signup").post(signup);
router.route('/login').post(login);
router.route("/:userId/all_users").get(checkAuth,get_all_users);
router.route("/:userId/all_users_detail").get(checkAuth,get_all_userdetail);

//router.get("/:userId/all_users",checkAuth,get_all_users);




module.exports = router;