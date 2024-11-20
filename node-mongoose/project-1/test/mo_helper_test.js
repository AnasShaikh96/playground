import mongoose from "mongoose";
// import * as mocha from 'mocha'

before((done) => {
  mongoose.connect('mongodb://localhost:27017/randomDb');
  mongoose.connection
    .once("open", () => {
      console.log('Connected')
      done()
    })
    .on('error', (err) => console.log('Error', err))
})


beforeEach((done) => {
  mongoose.connection.collections.students.drop(() => done())
})
