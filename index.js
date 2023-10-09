const path = require('path')
const fs = require('fs')

const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const PORT = 3000

const app = express()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		return cb(null, `${Date.now()}-${file.originalname}`)
	},
})

const upload = multer({ storage })

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.render('homePage')
})

app.post('/uploads', upload.single('profileImage'), (req, res) => {
	console.log(req.body)
	console.log(req.file)
	return res.redirect('/')

	let data = req.file
	console.log(data)
	// fs.appendFile('new.txt', data, err => {
	// 	if (err) {
	// 		console.log(err)
	// 	}

	// 	console.log('file Saved')
	// })
})

app.post('/upload', upload.single('file'), (req, res) => {
	console.log('req: ', req.body)

	if (!req.file) {
		res.status(400).send('No file foun')
	}
	// try {
	// 	fs.appendFile('./new.mp4', req.file, err => {
	// 		if (err) {
	// 			console.log(err)
	// 		}

	// 		console.log('file Saved')
	// 	})
	// } catch (err) {
	// 	console.log(err)
	// 	res.send('something went wrong')
	// }

	return res.status(200).send('file iploaded')
})

app.get('/video', (req, res) => {
	const range = req.headers.range
	if (!range) {
		res.status(400).send('Requires Range header')
	}

	const vdieoPath = './uploads/hello.mp4'
	const videoSize = fs.statSync(vdieoPath).size

	const CHUNK_SIZE = 10 ** 6 // means 10 power 6 (1 MB)
	const start = Number(range.replace(/\D/g, ''))
	const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

	const length = end - start + 1
	const headers = {
		'Content-Range': `bytes ${start}-${end}/${videoSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': length,
		'Content-Type': 'vidoe/mp4',
	}

	res.writeHead(206, headers)

	const videoStream = fs.createReadStream(vdieoPath, { start, end })

	videoStream.pipe(res)
})

app.listen(PORT, () => {
	console.log(`app listening on http://localhost:${PORT}`)
})
