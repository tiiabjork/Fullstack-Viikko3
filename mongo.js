const mongoose = require('mongoose')

const url = 'mongodb://fullstack:salainen@ds229388.mlab.com:29388/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv.length === 4) {
  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(response => {
      console.log(`Lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(persons => {
      console.log('Puhelinluettelo:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}
