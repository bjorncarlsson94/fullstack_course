const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://bjorncarlsson94:${password}@fullstack-cluster.pkist5q.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-cluster`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Viewing the note in console.log instead of the mongo db is less important',
  important: false,
})

note.save().then(result => {
  console.log('note saved!', result)
  mongoose.connection.close()
})