const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require ('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))


app.get('/api/persons', (req, res) => {
  console.log('kukkuu')
   Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
 })

 app.get('/api/persons/:id', (req, res) => {
   Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(Person.format(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(404).send({error: 'malformatted id'})
    })
 })

 app.delete('/api/persons/:id', (req, res) => {
   const id = req.params.id

   Person
    .findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(404).send({error: 'malformatted id'})
    })
 })

 app.post('/api/persons', (req, res) => {
   const body = req.body

   if (body.name === undefined || body.name === "") {
     return res.status(400).json({error: 'Name missing.'})
   }
   if (body.number === undefined || body.number === "") {
     return res.status(400).json({error: 'Number missing.'})
   }

   Person
    .find({name: body.name})
    .then(result => {
      if (result.length !==0) {
        return res.status(400).json({error: 'Person is already has a number.'})
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })
        person
          .save()
          .then(savedPerson => {
            res.json(Person.format(savedPerson))
        })
      }
    })
 })

 app.get('/info', (req, res) => {
   Person
    .find({})
    .count()
    .then(count => {
      res.send(`<p>Puhelinluettelossa on ${count} henkilön tiedot</p>
                <p>` + new Date() + `</p>`)
    })

 })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
