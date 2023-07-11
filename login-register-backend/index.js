const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database successfully");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});
//created user Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
})
// creating Modell
const User = new mongoose.model("User", userSchema)

// Routes
app.get('/', (req, res) => {
  res.send('welcome to the api')

})
app.get('/doc', async (req, res) => {
  data = await User.find()
  res.json(data)
})


app.post('/login', async(req, res) => {
  console.log(req.body);
  const {email,password}=req.body
  const LoggedInuser = await User.findOne({email:email})
  if(LoggedInuser){
    if (LoggedInuser.password === password) {
      // res.send({mgs:"login success"})
      res.json({msg:"Login Successfull",user: LoggedInuser})
    }
    else{
      
      res.json({msg:"Login Unsuccessful"})
    }
  }
  else{
    res.json({msg:"User Not Registered"})
  }
  
});



//todo writing logic for the signup api endponint
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body
  const userFound = await User.findOne({ email: email })
  console.log(userFound);
  // res.send(userFound)
  if (userFound) {
    res.send({ message: "User already registered" })
  } else {
    const user = new User({
      firstName,
      lastName,
      email,
      password
    })
    user.save()
    res.send({ messgae: "User Created Successfully" })
  }
});


// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
