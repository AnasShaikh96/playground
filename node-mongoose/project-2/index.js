import express from 'express'

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.listen(3000, () => console.log('Serve up at 3000'))

// medium

// user registers
// user writes blogs

// blogs has comments
// comments has replies

// hashtags

