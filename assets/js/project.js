const listProjectData = []

function selectFile() {
  const inputFile = document.getElementById('select-file')

  inputFile.click()

  inputFile.addEventListener('change', getFile)
}

function getFile(event) {
  const file = event.target.files[0]
  const fileNameElement = document.getElementById('file-name')
  const fileName = file.name
  const textNode = document.createTextNode(fileName)
  fileNameElement.appendChild(textNode)
}

function submitData() {
  const projectName = document.getElementById("projectName").value
  const startDate = document.getElementById("startDate").value
  const endDate = document.getElementById("endDate").value
  const description = document.getElementById("description").value
  const technologies = [...document.querySelectorAll('#technologies:checked')].map((inputEl) => inputEl.name)
  const fileImage = document.getElementById("select-file").files[0]

  if (!projectName) {
    return alert("Project Name must be filled out")
  } else if (!startDate) {
    return alert("Start Date must be filled out")
  } else if (!endDate) {
    return alert("End Date must be filled out")
  } else if (!description) {
    return alert("Description must be filled out")
  } else if (!technologies.length) {
    return alert("Technologies must be filled out")
  } else if (!fileImage) {
    return alert("File Image must be filled out")
  }

  const payload = { projectName, startDate, endDate, description, technologies, fileImage }

  const container = document.getElementById('list-project')

  listProjectData.unshift(payload)
  console.log('list Data Project', listProjectData);

  renderAllProjectCard(listProjectData, container)
}

function renderAllProjectCard(listProjectData, parentElement) {
  let htmlStringContent = ""

  for (let i = 0; i < listProjectData.length; i++) {
    const projectData = listProjectData[i];
    const { projectName, startDate, endDate, description, technologies, fileImage } = projectData
    const stringTechnologies = technologies.map((techItem) => {
      return `<img src='${getIconPathByCategory(techItem)}' />`
    }).join(' ')
    const getGapTime = getDurationTime(startDate, endDate)
    htmlStringContent += `
      <div class="project-card">
      
        <img
          src="${URL.createObjectURL(fileImage)}"
          alt="#" class="project-card__img-thumbnail" />
        <h3>${projectName}</h3>
        <p class="project-card__time-post">Duration : ${getGapTime}</p>
        <p class="project-card__desc">${description}</p>
        <div class="project-card__list-category">
          ${stringTechnologies}
        </div>
        <div class="project-card__cta">
          <button>edit</button>
          <button>delete</button>
        </div>
      </div>
    `
  }
  parentElement.innerHTML = htmlStringContent
}