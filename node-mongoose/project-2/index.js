import express from 'express'
import UserRoutes from './routes/user.routes.js'
import mongoose from 'mongoose';

const app = express();

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Db Connected'))
}

connectDb().catch((err) => console.log('Db Connection Err', err))

app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))


app.use('/user', UserRoutes)

app.listen(3000, () => console.log('Serve up at 3000'))

// medium

// user registers
// user writes blogs

// blogs has comments
// comments has replies

// hashtags

