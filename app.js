require('dotenv').config()
const express= require('express')
const app=express()
const bodyParser= require('body-parser')
const mongoose =  require('mongoose')
const  userRoutes = require('./userRoutes.js')
const  productRoutes = require('./productRoutes.js')

app.use(express.json())


//database connection
mongoose.connect('mongodb+srv://sample-users:'+process.env.MONGO_ATLAS_PW +'@nodetask.ocv1f.mongodb.net/samples?retryWrites=true&w=majority',{
    useNewUrlParser: true
},{ useUnifiedTopology: true}) 

mongoose.Promise = global.Promise
app.use(bodyParser.urlencoded({extended: false}))
app .use(bodyParser.json())

app.use("/user", userRoutes)
app.use("/product", productRoutes)


 const PORT = process.env.PORT
app.listen(PORT, console.log(`Your server is running at localhost:${PORT}/` ))
