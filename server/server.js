const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server 5000 portunda başarıyla çalışmaktadır. 💥");
});

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.1b1s8ig.mongodb.net/user-app?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(newUser);
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndDelete(id).exec();
  res.json("Başarılı.");
});

app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    age: req.body.age,
    img: req.body.img,
  };
  const updatedUser = await UserModel.findByIdAndUpdate(id, newUser);
  res.json(updatedUser);
});

// app.put("/updateUser/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const newUser = {
//       name: req.body.name,
//       username: req.body.username,
//       age: req.body.age,
//       img: req.body.img,
//     };

//     const updatedUser = await UserModel.findByIdAndUpdate(id, newUser);

//     if (!updatedUser) {
//       return res.status(404).json({ error: "Kullanıcı bulunamadı" });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Sunucu hatası" });
//   }
// });
