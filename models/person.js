const mongoose = require('mongoose')

const url = 'mongodb://fullstack:salainen@ds229388.mlab.com:29388/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})


module.exports = Person
