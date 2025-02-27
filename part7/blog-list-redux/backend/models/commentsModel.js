const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
  },
})

commentsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.blog
  },
})

module.exports = mongoose.model('CommentPost', commentsSchema)
