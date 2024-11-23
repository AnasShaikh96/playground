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
    type: mongoose.Schema.Types.ObjectId, ref: 'course'
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

  const user = await User.deleteMany({})
  res.status(200).json(user)

})





const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
  }]
})

const Course = mongoose.model('course', CourseSchema);


app.get('/course/create', async (req, res) => {

  const { title, description, userId } = req.query

  const course = await Course.create({ title: title, description: description, users: [userId] });

  res.status(200).json(course)

})


app.get('/course/find', async (req, res) => {

  const course = await Course.find({})
  res.status(200).json(course)

})

app.get('/course/delete', async (req, res) => {

  const course = await Course.deleteMany({})
  res.status(200).json(course)

})

app.get('/course/update', async (req, res) => {

  const { courseId, userId } = req.query;

  const user = await User.findOne({ _id: userId })
  if (!user.courses.includes(courseId)) {
    user.courses.push(courseId)
    await user.save()
  }

  const course = await Course.findById(courseId);
  if (!course.users.includes(userId)) {
    course.users.push(userId)
    await course.save()
  }

  res.status(200).json({
    user: user,
    course: course
  })


})