const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require ('cors')

app.use(bodyParser.json())
app.use(cors())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))


let persons = [
   {
     "name": "Arto Hellas",
     "number": "040-123456",
     "id": 1
   },
   {
     "name": "Martti Tienari",
     "number": "040-123456",
     "id": 2
   },
   {
     "name": "Arto Järvinen",
     "number": "040-123456",
     "id": 3
   },
   {
     "name": "Lea Kutvonen",
     "number": "040-123456",
     "id": 4
   },
   {
     "name": "Päivitettyyyyyyyyy",
     "number": "040-123456",
     "id": 5
   }
 ]

 app.get('/', (req, res) => {
   res.send('<h1>Hihhei!</h1>')
 })

 app.get('/api/persons', (req, res) => {
   res.json(persons)
 })

 app.get('/api/persons/:id', (req, res) => {
   const id = Number(req.params.id)
   const person = persons.find(person => person.id === id)

   if (person) {
     res.json(person)
   } else {
     res.status(404).end()
   }
 })

 app.delete('/api/persons/:id', (req, res) => {
   const id = Number(req.params.id)
   persons = persons.filter(person => person.id !== id)
   res.status(204).end()
 })

 app.post('/api/persons', (req, res) => {
   const personId = Math.floor(Math.random() * Math.floor(10000))
   const body = req.body

   if (body.name === undefined || body.name === "") {
     return res.status(400).json({error: 'Name missing.'})
   }
   if (persons.find(person => person.name === body.name)) {
     return res.status(400).json({error: 'Name already has a number.'})
   }
   if (body.number === undefined || body.number === "") {
     return res.status(400).json({error: 'Number missing.'})
   }

   const person = {
     name: body.name,
     number: body.number,
     id: personId
   }

   persons = persons.concat(person)
   res.json(person)
 })

 app.get('/info', (req, res) => {
   res.send(`<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>
             <p>` + new Date() + `</p>`)
 })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${port}`)
})
