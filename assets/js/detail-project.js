const projectData = {
  projectName: 'Remake Instagram',
  startDate: '09 Jan 2024',
  endDate: '25 Mar 2024',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  technologies: ['reactJs', 'typeScript'],
  fileImage: 'assets/img/b.jpg'
}

const container = document.getElementById('detail-project')

function renderDetailProject(projectData, container) {
  let htmlDetailProject = ''

  const { projectName, startDate, endDate, description, technologies, fileImage } = projectData
  const stringTechnologies = technologies.map((techItem) => {
    return `<img src='${getIconPathByCategory(techItem)}' />
    <p>${techItem}</p>
    `
  }).join(' ')
  const getGapTime = getDurationTime(startDate, endDate)
  htmlDetailProject += `
    <h1 style="text-align: center; margin-bottom: 30px;">${projectName}</h1>
    <div style="display: flex; flex-direction: column;">
    <div style="display: flex; margin-bottom: 50px;">
    <div style="width: 70%; min-width: 320px; height: auto; aspect-ratio: 2/1; margin-right: 30px;">
      <img
        src="${fileImage}"
        alt="thumbnail" style="object-fit: cover; width: 100%; height: 100%">
    </div>
    <div>
      <h3>Duration</h3><br>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 30px;">
        <img src="assets/img/calendar.png" alt="calendar" style="height: 25px; width: 25px;">
        <p style="color: #585252; font-weight: bold;">${startDate} - ${endDate}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 60px;">
        <img src="assets/img/clock.png" alt="duration" style="height: 25px; width: 25px;">
        <p style="color: #585252; font-weight: bold;">${getGapTime}</p>
      </div>
      <h3>Technologies</h3><br>
      <div style="display: flex; flex-wrap: wrap; width: 280px;">
        <div class="list-category__icon">
          ${stringTechnologies}
        </div>
      </div>
    </div>
  </div>
  <div style="display: flex;">
    <div>
      <p style="text-align: justify;">${description}</p>
    </div>
  </div>
  </div>`

  container.innerHTML = htmlDetailProject
}

window.onload = () => {
  console.log('test');
  renderDetailProject(projectData, container)
}