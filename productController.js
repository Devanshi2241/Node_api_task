const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const fs = require('fs');
const User = require("./userModel.js");
const Product = require("./productModel.js");


const create_product = async (req,res)=>{

  //console.log(req.file.path)
  const folderPath = './uploads/';




 //fs.readdir(folderPath, (err, files) => {
// //console.log(files);
// var arrayToInsert = [];
   //for(i=0;i<files.length;i++){
    //console.log("./uploads/"+files[i]);

    const id=req.params.userId;
    User.findById(id).select("username").exec()
   .then(users => {

    if(!users){
      res.json({
        message:"SignUp for Uploading product"
      })
    }
    else{
    csvtojson()
    .fromFile(req.file.path)
    .then(csvData => {
    // console.log(csvData)
    for(i=0;i<csvData.length;i++){
     console.log(csvData[i].name);
      // Product.insertMany([
      //   {name:csvData[i].name},
      //   {name:csvData[i].name},
      //   {createdBy: users.username}
      //   ],(err) => {
        
      //   if(err){  
      //     console.log(err);  
      //     }else{  
      //       console.log(users)
      //       // const username= new Product({
      //       //   _id: new mongoose.Types.ObjectId(),
      //       //   createdBy: users.username
      //       // })
      //       // username.save()
      //       return res.json({
      //         message: "Product created successfully:)"
      //       }); 
      //    // console.log('Created');
      //     }  
      // });
       const username= new Product({
              _id: new mongoose.Types.ObjectId(),
              name:csvData[i].name,
              price:csvData[i].price,
              quantity:csvData[i].quantity,
              description:csvData[i].description,
              createdBy: users.username
            })
            username.save().then(result => {
              res.status(201).json({
                message: "Product created successfully:)"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
    }
    });
  }
  })

   // }
    
  //})

// catch(err) {
//   console.log(err);
//   res.status(500).json({
//     error: err
//   });
// };
}
  const products_get_all = async(req, res, next) => {
   
      Product.find()
      .select("name price quantity description createdBy")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
           
            return {
              name: doc.name,
              price: doc.price,
             quantity:doc.quantity,
             description:doc.description,
             createdBy: doc.createdBy
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
  //  })
  
    
  };

  


    
    


module.exports ={create_product, products_get_all}