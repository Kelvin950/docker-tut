const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userSchema = mongoose.Schema({
  name: String,
  age: String,
  sex: String,
});
const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.send(
    `<form action=/createUser method=POST> 
<div> <input name=name placeholder=name type=text >
</div>
<div> <input name=age placeholder=age type=text ></div>
<div>
<input name=sex placeholder=sex type=text/>
</div> 
<input type=submit value=submit> 
 </form>`
  );
});

app.post("/createUser", async (req, res) => {
  const { name, age, sex } = req.body;
  const user = new User({
    name,
    sex,
    age,
  });
  await user.save();
  res.redirect("/users");
});
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
const start = async () => {
  try {
    await mongoose.connect("mongodb://mongodb/users");
    app.listen(8080, () => {
      console.log("server opened");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
