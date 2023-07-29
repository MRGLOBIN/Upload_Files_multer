const express = require('express')
const path = require('path')

const PROT = 6000

const app = express()

app.set('view engine', ejs)
app.set('view', path.join(__dirname, 'views'))

app.use(express.json())

app.get('/', (req, res) => {
    res.render('homePage')
})

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})