const express = require('express')
const path = require('path')
const multer = require('multer')

const PROT = 6000

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.filename}`)
  },
})

const upload = multer({ storage })

app.set('view engine', ejs)
app.set('view', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('homePage')
})

app.post('/uploads', upload.single('profileImage'), (req, res) => {
  console.log(req.body)
  console.log(req.file)

  return res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`)
})
