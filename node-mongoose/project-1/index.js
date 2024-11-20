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
app.get('/update', (req, res) => {

})
app.get('/delete', (req, res) => {

})



// async function updateOne() {
//   await User.updateOne({ _id: '673de0e94014e9bdd3aba46a' }, { $set: { password: '123456' } })
// }

// updateOne()
// const res = await
// const sam = new User({ name: "Sam", email: 'sam@234.com', password: 'pass@123' })
// await sam.save()