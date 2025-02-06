const mongoose = require('mongoose')
require('dotenv').config()

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

const password = process.argv[2]

const url = process.env.TEST_MONGODB_URI
//`mongodb+srv://bjorncarlsson94:${password}@fullstack-cluster.pkist5q.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-cluster`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'I am really liking the way the notes are done!',
  important: true,
})

note.save().then((result) => {
  console.log('note saved!', result)
  mongoose.connection.close()
})
