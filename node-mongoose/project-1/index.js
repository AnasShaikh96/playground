import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'

const app = express()

app.use(cors())
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
  courses: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'courses'
  }]
});

const User = mongoose.model('User', UserSchema);

app.get('/user/create', async (req, res) => {

  const { name, email, password } = req.query
  const user = await User.insertMany({ name: name, email: email, password: password })

  res.status(200).json(user)
})
app.get('/user/find', async (req, res) => {

  const user = await User.find({});
  res.status(200).json(user)

})
app.get('/user/update', async (req, res) => {

  const { id, name, email, password } = req.query;

  const user = await User.updateOne({ _id: id }, { name, email, password })

  res.status(200).json({
    message: 'Successfull',
    data: user
  })

})
app.get('/user/delete', async (req, res) => {

  const { id } = req.query;

  const user = await User.deleteOne({ _id: id })
  res.status(200).json(user)

})



const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  }]
})

const Course = mongoose.model('course', CourseSchema);


app.get('/course/create', async (req, res) => {

  const { title, description, userId } = req.query

  const course = await Course.create({ title: title, description: description, users: [userId] });
  // const userCourses = await User.findOne({ _id: userId })

  // console.log(userCourses.courses)

  await User.updateOne({ _id: userId }, { $set: { courses: [userCourses, course._id] } })

  // res.status(200).json(course)

})
