const express = require('express')
const cors = require('cors')
const youtubedl = require('youtube-dl-exec')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
	const url = 'https://youtube.com/watch?v=' + req.query.id
	youtubedl(url, {
	  dumpSingleJson: true,
	  noCheckCertificates: true,
	  noWarnings: true,
	  preferFreeFormats: false,
	  addHeader: [
	    'referer:youtube.com',
	    'user-agent:googlebot'
	  ]
	}).then(output => res.json({...output, status: true})).catch((err) => {
		console.log(err)
		res.json({status: false})
	})
})

app.listen(port, () => {
	console.log('Listening PORT: ' + port)
})
