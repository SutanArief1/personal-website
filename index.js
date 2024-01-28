const express = require('express')
const bcrypt = require('bcrypt');
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./assets/js/uploadFile')
const dbPool = require('./connection/index')
const { getIconPathByCategory, getDurationTime } = require('./assets/js/helper')
const app = express()
const port = 3000

// sequelize config
const { development } = require('./config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const SequelizePool = new Sequelize(development)

app.set('view engine', 'hbs')

app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000
  },
  resave: false,
  store: session.MemoryStore(),
  secret: 'session_storage',
  saveUninitialized: true,
  unset: 'destroy'
}))
app.use(flash())

app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('assets/uploads'))
app.use(express.urlencoded({ extended: false }))


app.get('/', home)
app.get('/project', project)
app.post('/project', upload.single('image'), handlePostProject)
app.get('/detail-project/:id', detailProject)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/delete/:id', handleDeleteProject)
app.get('/edit-project/:id', editProject)
app.post('/edit-project/:id', upload.single('image'), handleEditProject)
app.get('/register', formRegister)
app.post('/register', addRegister)
app.get('/login', formLogin)
app.post('/login', isLogin)
app.get('/logout', handleLogout)

// let dataProject = []
const options = [
  {
    label: 'React Js',
    value: 'reactJs'
  },
  {
    label: 'Node Js',
    value: 'nodeJs'
  },
  {
    label: 'Next Js',
    value: 'nextJs'
  },
  {
    label: 'Typescript',
    value: 'typescript'
  },
]

function home(req, res) {
  res.render('index', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

async function project(req, res) {
  try {
    let query

    if (req.session.isLogin) {
      const author = req.session.idUser

      query = await SequelizePool.query(`SELECT p.id, p.name, start_date, end_date, description, technologies, image, 
      p."createdAt", p."updatedAt", user_id, u.name AS author
      FROM projects p LEFT JOIN users u ON p.user_id = u.id 
      WHERE user_id = ${author}
      ORDER BY p.id DESC;`, { type: QueryTypes.SELECT });
    } else {
      query = await SequelizePool.query(`SELECT p.id, p.name, start_date, end_date, description, technologies, image, 
      p."createdAt", p."updatedAt", user_id, u.name AS author
      FROM projects p LEFT JOIN users u ON p.user_id = u.id ORDER BY p.id DESC;`, { type: QueryTypes.SELECT });
    }



    const data = query.map(res => ({
      ...res,
      isLogin: req.session.isLogin,
      dataIcon: res.technologies.map(el => {
        return getIconPathByCategory(el)
      }),
      duration: getDurationTime(res.start_date, res.end_date)
    }))

    res.render('project', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    throw error
  }
}

async function handlePostProject(req, res) {
  try {
    const { projectName, startDate, endDate, description, categories } = req.body
    const image = req.file.filename
    const author = req.session.idUser

    await SequelizePool.query(
      `
      INSERT INTO projects (name, start_date, end_date, description, technologies, image, user_id, "createdAt", "updatedAt")
       VALUES ('${projectName}','${startDate}','${endDate}','${description}','{${categories}}','${image}',${author},NOW(),NOW())`, { type: QueryTypes.INSERT })

    res.redirect('project')
  } catch (error) {
    throw error
  }
}

async function detailProject(req, res) {
  const { id } = req.params
  // const dataProjectDetail = dataProject[id]

  try {
    const query = await SequelizePool.query(`SELECT * FROM projects WHERE id = ${id}`, { type: QueryTypes.SELECT })


    const data = query.map(res => ({
      ...res,
      technologiesSection: res.technologies.map(technology => {
        const foundOption = options.find(option => option.value === technology)
        return {
          ...foundOption,
          icon: getIconPathByCategory(technology),
        }
      }),
      duration: getDurationTime(res.start_date, res.end_date),
      isLogin: req.session.isLogin
    }))

    res.render('detail-project', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    throw error
  }
}

function testimonial(req, res) {
  res.render('testimonial', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

function contact(req, res) {
  res.render('contact', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

async function handleDeleteProject(req, res) {
  try {
    const { id } = req.params
    await SequelizePool.query(`DELETE FROM projects WHERE id = ${id}`)

    res.redirect('/project')
  } catch (error) {
    throw error
  }
}

async function editProject(req, res) {
  const { id } = req.params

  try {
    const query = await SequelizePool.query(`SELECT * FROM projects WHERE id = ${id}`, { type: QueryTypes.SELECT })

    const data = query.map(res => ({
      ...res,
      techOptions: options.map(option => {
        const isExist = res.technologies.find(technology => technology === option.value)
        return {
          ...option,
          checked: Boolean(isExist)
        }
      }),
      isLogin: req.session.isLogin
    }))

    res.render('edit-project', {
      data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    throw error
  }
}

async function handleEditProject(req, res) {

  // let iconCategory = getIconPathByCategory(categories)
  // let getGapTime = getDurationTime(startDate, endDate)

  // dataProject.splice(id, 1, { projectName, description, iconCategory, getGapTime, startDate, endDate, categories })

  try {
    const { id } = req.params
    const { projectName, startDate, endDate, description, categories } = req.body
    const image = req.file.filename

    // const projectToUpdate = await SequelizePool.query(`SELECT * FROM projects`, { type: QueryTypes.SELECT })

    // const projectId = projectToUpdate[0].id

    await SequelizePool.query(
      `
      UPDATE projects SET name='${projectName}', start_date='${startDate}', end_date='${endDate}', description='${description}', 
      technologies='{${categories}}', "createdAt"=NOW(), "updatedAt"=NOW(), image='${image}' WHERE id=${id}
      `
      , { type: QueryTypes.UPDATE })

    res.redirect('/project')
  } catch (error) {
    throw error
  }
}

function formRegister(req, res) {
  res.render('register')
}

async function addRegister(req, res) {
  try {
    const { name, email, password } = req.body
    const salt = 10

    bcrypt.hash(password, salt, async (err, hashPassword) => {
      await SequelizePool.query(`INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}','${email}','${hashPassword}', NOW(), NOW())`)
    })
    res.redirect('/login')
  } catch (error) {
    throw error
  }
}

function formLogin(req, res) {
  res.render('login')
}

async function isLogin(req, res) {
  try {
    const { email, password } = req.body

    const checkEmail = await SequelizePool.query(`SELECT * FROM users WHERE email = '${email}'`, { type: QueryTypes.SELECT })

    if (!checkEmail.length) {
      req.flash('failed', 'Email is not register');
      return res.redirect('/login')
    }

    bcrypt.compare(password, checkEmail[0].password, function (err, result) {
      if (!result) {
        return res.redirect("/login")
      } else {
        req.session.isLogin = true
        req.session.user = checkEmail[0].name
        req.session.idUser = checkEmail[0].id
        req.flash('success', 'Login Success !!');
        return res.redirect('/')
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function handleLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login')
  })
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})