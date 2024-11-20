import express from 'express'
import mongoose from 'mongoose';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => console.log('Server Up at 3000'))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected'));
}

main().catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/create', async (req, res) => {

  const { name, email, password } = req.query
  const user = await User.insertMany({ name: name, email: email, password: password })

  res.status(200).json(user)
})
app.get('/find', async (req, res) => {

  const user = await User.find({});
  res.status(200).json(user)

})
app.get('/update', async (req, res) => {

  const { id, name, email, password } = req.query;

  const user = await User.updateOne({ _id: id }, { name, email, password })

  res.status(200).json({
    message: 'Successfull',
    data: user
  })

})
app.get('/delete', async (req, res) => {

  const { id } = req.query;

  const user = await User.deleteOne({ _id: id })
  res.status(200).json(user)

})
