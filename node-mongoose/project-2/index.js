import express from 'express'
import UserRoutes from './routes/user.routes.js'
import BlogRoutes from './routes/blog.routes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'

const app = express();

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/preject-2').then(() => console.log('Db Connected'))
}

connectDb().catch((err) => console.log('Db Connection Err', err))

app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/user', UserRoutes)
app.use('/blog', BlogRoutes)

app.listen(3000, () => console.log('Serve up at 3000'))

// medium

// user registers
// user writes blogs

// blogs has comments
// comments has replies

// hashtags

