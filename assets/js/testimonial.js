class Testimonial {
  #image
  #content
  #author

  constructor(image, content, author) {
    this.image = image
    this.content = content
    this.author = author
  }

  get image() {
    return this.#image
  }

  get content() {
    return this.#content
  }

  get author() {
    return this.#author
  }

  set image(value) {
    this.#image = value
  }

  set content(value) {
    this.#content = value
  }

  set author(value) {
    this.#author = value
  }

  html() {
    throw new Error('You must choose as author or company')
  }
}

class PersonalTestimonial extends Testimonial {
  html() {
    return `
    <div class="testimonial-card">
        <img src="${this.image}" alt="testimonial" class="testimonial__profile-picture" />
        <p class="testimonial__content">"${this.content}"</p>
        <p class="testimonial__author">- ${this.author}</p>
      </div>
    `
  }
}

class CompanyTestimonial extends Testimonial {
  html() {
    return `
    <div class="testimonial-card">
        <img src="${this.image}" alt="testimonial" class="testimonial__profile-picture" />
        <p class="testimonial__content">"${this.content}"</p>
        <p class="testimonial__author">- ${this.author} Company</p>
      </div>
    `
  }
}

const testimonial1 = new PersonalTestimonial('https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Terima Kasih Jasanya!', 'Fajar')
const testimonial2 = new PersonalTestimonial('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Luar Biasa.', 'Natasha')
const testimonial3 = new CompanyTestimonial('https://images.pexels.com/photos/1182825/pexels-photo-1182825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Perlu ditingkatkan lagi..', 'John Doe')

const testimonials = [testimonial1, testimonial2, testimonial3]

htmlTestimonials = ''

for (let i = 0; i < testimonials.length; i++) {
  htmlTestimonials += testimonials[i].html()
}

document.getElementById('testimonials').innerHTML = htmlTestimonials