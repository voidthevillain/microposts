import { timingSafeEqual } from 'crypto'

class UI {
  constructor() {
    this.post = document.querySelector('#posts')
    this.titleInput = document.querySelector('#title')
    this.bodyInput = document.querySelector('#body')
    this.idInput = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.formState = 'add'
  }

  showPosts(posts) {
    let output = ''

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link text-primary" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link text-primary" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `
    })

    this.post.innerHTML = output
  }

  showAlert(message, className) {
    this.clearAlert()

    const div = document.createElement('div')
    div.className = className + ' text-center mt-3'
    div.innerHTML = `<strong>${message}</strong>`

    const container = document.querySelector('.posts-container')
    const posts = document.querySelector('#posts')

    container.insertBefore(div, posts)

    setTimeout(() => {
      this.clearAlert()
    }, 3000)
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert')

    if (currentAlert) {
      currentAlert.remove()
    }
  }

  clearFields() {
    this.titleInput.value = ''
    this.bodyInput.value = ''
  }

  fillForm(data) {
    const { id, title, body } = data
    this.titleInput.value = title
    this.bodyInput.value = body
    this.idInput.value = id

    this.changeFormState('edit')
  }

  clearIdInput() {
    this.idInput.value = ''
  }

  changeFormState(type) {
    switch (type) {
      case 'edit':
        this.postSubmit.textContent = 'Update Post'
        this.postSubmit.className = 'post-submit btn btn-primary btn-block'

        // Cancel button
        const button = document.createElement('button')
        button.className = 'post-cancel btn btn-light btn-block'
        button.appendChild(document.createTextNode('Cancel'))

        // Get parent and end
        const cardForm = document.querySelector('.card-form')
        const formEnd = document.querySelector('.form-end')
        cardForm.insertBefore(button, formEnd)
        break
      case 'add':
        this.postSubmit.textContent = 'Post It'
        this.postSubmit.className = 'post-submit btn btn-success btn-block'

        // check if cancel button and remove
        if (document.querySelector('.post-cancel')) {
          document.querySelector('.post-cancel').remove()
        }

        // Clear id from hidden
        this.clearIdInput()

        // Clear fields
        this.clearFields()
        break
    }
  }
}

export const ui = new UI()
