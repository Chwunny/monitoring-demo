const  express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '772467300cae48628fea6335297678e2',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const students = []

const app = express()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res) => {
    const { name } = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('Student added successfully', {author: 'Zach', type: 'manual entry'})
    res.status(200).send(students)
})

const port = process.env.PORT || 4545

app.use(rollbar.errorHandler())

app.listen(port, () => console.log('Take us to warp 4545'))