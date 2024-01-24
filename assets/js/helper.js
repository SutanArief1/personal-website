function getDurationTime(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startTime = start.getTime() / 1000 / 60 / 60 / 24
  const endTime = end.getTime() / 1000 / 60 / 60 / 24

  const gap = endTime - startTime

  if (gap >= 360) {
    return `${Math.floor(gap / 360)} Years`
  } else if (gap >= 30) {
    return `${Math.floor(gap / 30)} Months`
  } else {
    return `${gap} Days`
  }

}

function getIconPathByCategory(categories) {
  let result = []

  if (!categories) {
    result = []
  } else {
    categories.forEach(el => {
      let iconPath = ''

      if (el === 'nodeJs') {
        iconPath += '../assets/img/node-js.png'
      } else if (el === 'reactJs') {
        iconPath += '../assets/img/react.png'
      } else if (el === 'nextJs') {
        iconPath += '../assets/img/next-js.png'
      } else if (el === 'typescript') {
        iconPath += '../assets/img/typescript.png'
      } else {
        console.error('Category not found')
      }

      result.push(iconPath)

    });
  }

  return result
}


module.exports = { getIconPathByCategory, getDurationTime };