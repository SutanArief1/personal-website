const express = require('express')
const app = express()
const port = 3000

const { getIconPathByCategory, getDurationTime } = require('./assets/js/helper')


app.set('view engine', 'hbs')

app.use('/assets', express.static('assets'))
app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/project', project)
app.post('/project', handlePostProject)
app.get('/detail-project/:id', detailProject)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/delete/:id', handleDeleteProject)
app.get('/edit-project/:id', editProject)
app.post('/edit-project/:id', handleEditProject)

let dataProject = []

function home(req, res) {
  res.render('index')
}

function project(req, res) {
  res.render('project', { dataProject })
}

function handlePostProject(req, res) {
  const { projectName, startDate, endDate, description, categories, image } = req.body

  let iconCategory = getIconPathByCategory(categories)
  let getGapTime = getDurationTime(startDate, endDate)

  dataProject.unshift({ projectName, description, iconCategory, getGapTime, startDate, endDate })
  console.log('ini data setelah ditambah', dataProject);

  res.redirect('/project')
}

function detailProject(req, res) {
  const { id } = req.params
  const dataProjectDetail = dataProject[id]

  const { projectName, description, iconCategory, startDate, endDate } = dataProjectDetail

  res.render('detail-project', { dataProject: dataProjectDetail })
}

function testimonial(req, res) {
  res.render('testimonial')
}

function contact(req, res) {
  res.render('contact')
}

function handleDeleteProject(req, res) {
  const { id } = req.params

  dataProject.splice(id, 1)
  res.redirect('/project')
}

function editProject(req, res) {
  const { id } = req.params
  const dataProjectDetail = dataProject[id]

  res.render('edit-project', { dataProject: dataProjectDetail })
}

function handleEditProject(req, res) {
  const { id } = req.params
  const { projectName, startDate, endDate, description, categories, image } = req.body

  dataProject[id] = {
    projectName,
    description,
    iconCategory: getIconPathByCategory(categories),
    getGapTime: getDurationTime(startDate, endDate),
    startDate,
    endDate
  };

  console.log('ini data setelah diupdate', dataProject);
  res.redirect('/project')
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})