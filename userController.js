const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./userModel.js");

const signup =async(req, res, next) => {
    await User.find({ username: req.body.username })
     .exec()
     .then(user => {
       if (user.length >= 1) {
         return res.status(409).json({
           message: "Username exists"
         });
       } else {
         bcrypt.hash(req.body.password, 10, (err, hash) => {
           if (err) {
             return res.status(500).json({
               error: err
             });
           } else {
             const user = new User({
               _id: new mongoose.Types.ObjectId(),
               firstname: req.body.firstname,
               lastname: req.body.lastname,
               username: req.body.username,
               password: hash
             });
             user
               .save()
               .then(result => {
                 res.status(201).json({
                   message: "User created",
                   id: result._id,
                    firstname:result.firstname,
                    lastname:result.lastname,
                    username:result.username,
                 });
               })
               .catch(err => {
                 res.status(500).json({
                   error: err
                 });
               });
           }
         });
       }
     })
}

const login =  async(req,res) => {
    
        User.find({ username: req.body.username })
          .exec()
          .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
              if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                });
              }
              if (result) {
                const token = jwt.sign(
                  {
                    username: user[0].username,
                    userId: user[0]._id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "1h"
                  }
                );
                return res.status(200).json({
                  message: "Auth successful",
                  token: token,
                  
                });
              }
              res.status(401).json({
                message: "Auth failed"
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      
}

const get_all_users= (req, res, next) => {
    User.find()
      .select("firstname lastname")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          Users: docs.map(doc => {
            return {
              Firstname: doc.firstname,
              Lastname: doc.lastname,
             
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  const get_all_userdetail= (req, res, next) => {
    User.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          Users: docs.map(doc => {
            return {
             _id: doc._id,
              Firstname: doc.firstname,
              Lastname: doc.lastname,
              username:doc.username
            };
          })
        };
        
        res.status(200).json(response);
       
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  

   module.exports= {signup,login,get_all_users,get_all_userdetail};