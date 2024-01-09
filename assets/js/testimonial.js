const testimonials = [
  {
    author: "Fajar",
    content: "Terima Kasih Jasanya!",
    image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4
  },
  {
    author: "Natasha",
    content: "Luar Biasa.",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5
  },
  {
    author: "John Doe",
    content: "Perlu ditingkatkan lagi..",
    image: "https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 2
  },
  {
    author: "Nolan",
    content: "Sangat keren!!",
    image: "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4
  }
]

function renderAllTestimonial() {
  let htmlTestimonial = ''

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



function filterTestimonial(rating) {
  const filteredTestimonial = testimonials.filter((value) => value.rating === rating)
  let htmlTestimonial = ''

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