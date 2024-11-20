import mongoose from "mongoose";
import Student from '../app/student.js'
import assert from 'assert'

describe("Create user test", () => {
  it("creates user with db", () => {
    const sam = new Student({ name: 'Sam' })
    sam.save().
      then(() => {
        assert(!sam.isNew)
      })
      .catch((err) => console.log(err))
  })
})