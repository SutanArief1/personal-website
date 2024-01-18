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

function getIconPathByCategory(technology) {
  let iconPath = ''
  switch (technology) {
    case 'nodeJs':
      iconPath = '/assets/img/node-js.png'
      break;
    case 'reactJs':
      iconPath = '/assets/img/react.png'
      break;
    case 'nextJs':
      iconPath = '/assets/img/next-js.png'
      break;
    case 'typeScript':
      iconPath = '/assets/img/typescript.png'
      break;
    default:
      console.error('Category not found')
      break;
  }

  return iconPath
}