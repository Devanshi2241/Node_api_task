const path = require('path');
const express = require('express')
const router = express.Router();
const multer = require('multer');
const {create_product, products_get_all} = require("./productController.js");
const checkAuth = require("./check-auth.js");






const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req,file, cb) => {
  // reject a file
  console.log(file)
  if (file.mimetype === 'text/csv' ) {
    cb(null, true);
   
  } else {
    cb(null, false);
 
  }
};

const upload = multer({
  storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
fileFilter: function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if(ext !== '.csv' ) {
      return callback(new Error('Only csv files are allowed'))
  }
  callback(null, true)
}
});


//router.route("/:userId/createProduct").upload.single('productFile').get(checkAuth,create_product);
router.route("/:userId/createProduct").post(checkAuth,upload.single('filename'),create_product);
router.route("/:userId/Product").get(checkAuth,products_get_all);
//router.route("/:userId/all_users_detail").get(checkAuth,get_all_userdetail);

//router.get("/:userId/all_users",checkAuth,get_all_users);




module.exports = router;