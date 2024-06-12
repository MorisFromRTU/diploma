const express = require('express');
const app = express();
const { initDB } = require('./models/dbindex.js')
const cors = require("cors")
const userRouter = require('./routes/user.routes.js')
const questionRouter = require('./routes/question.routes.js');
const lessonRouter = require('./routes/course.routes.js');
require("dotenv").config();
initDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}


app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log('URL = ', req.url)
  console.log('Original_URL = ', req.originalUrl)
  console.log('METHOD = ', req.method)
  console.log('HOST = ', req.headers.host)
  console.log('IsSecure = ', req.secure)
  console.log('BODY', req.body)
  console.log('QUERY', req.query)

  next()
});


const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`server is listening on ${PORT}`) })

app.get('/', (req, res) => {
  res.json("welcome to the todo application")
})
app.use('/', userRouter)
app.use('/question', questionRouter)
app.use('/lesson', lessonRouter);