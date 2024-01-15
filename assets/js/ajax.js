function getTestimonialData() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.npoint.io/c31ad0a3d238d7bc9a38", true)
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      } else {
        reject("Error loading data.")
      }
    }

    xhr.onerror = () => {
      reject("Network Error!")
    }

    xhr.send()
  })
}


async function renderAllTestimonial() {
  let htmlTestimonial = ''
  const testimonials = await getTestimonialData()

  testimonials.forEach((value) => {
    const { image, content, author, rating } = value
    htmlTestimonial += `
      <div class="testimonial-card">
        <img src="${image}" alt="testimonial" class="testimonial__profile-picture" />
        <p class="testimonial__content">"${content}"</p>
        <p class="testimonial__author">- ${author}</p>
        <p class="testimonial__rating"><img src="assets/img/star.png" /> ${rating}</p>
      </div>
    `
  })

  document.getElementById('testimonials').innerHTML = htmlTestimonial
}



async function filterTestimonial(rating) {
  let htmlTestimonial = ''
  const testimonials = await getTestimonialData()
  const filteredTestimonial = testimonials.filter((value) => value.rating === rating)
  console.log(filteredTestimonial.length);

  if (!filteredTestimonial.length) {
    return document.getElementById('testimonials').innerHTML = "<h1>Rating Not Found!</h1>"
  }

  filteredTestimonial.forEach((value) => {
    const { image, content, author, rating } = value
    htmlTestimonial += `
          <div class="testimonial-card">
            <img src="${image}" alt="testimonial" class="testimonial__profile-picture" />
            <p class="testimonial__content">"${content}"</p>
            <p class="testimonial__author">- ${author}</p>
            <p class="testimonial__rating"><img src="assets/img/star.png" /> ${rating}</p>
          </div>
        `
  })

  document.getElementById('testimonials').innerHTML = htmlTestimonial
}

renderAllTestimonial()