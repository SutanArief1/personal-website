const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'hbs')

app.use('/assets', express.static('assets'))

app.get("/runtest", greeting)
app.get('/', home)
app.get('/project', project)
app.get('/detail-project/:id', detailProject)
app.get('/testimonial', testimonial)
app.get('/contact', contact)

function greeting(req, res) {
  res.send('Hello World!')
}

function home(req, res) {
  res.render('index')
}

function project(req, res) {
  res.render('project')
}

function detailProject(req, res) {
  res.render('detail-project')
}

function testimonial(req, res) {
  res.render('testimonial')
}

function contact(req, res) {
  res.render('contact')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})