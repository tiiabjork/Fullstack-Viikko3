const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
var Schema = mongoose.Schema

const url = process.env.MONGODB_URI

mongoose.connect(url)

const personSchema = new Schema({ name: String, number: String})

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

personSchema.statics.format = formatPerson

const Person = mongoose.model('Person', personSchema)


module.exports = Person
