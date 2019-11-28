import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for submit
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listen for delete
document.querySelector('#posts').addEventListener('click', deletePost)

// Listen for edit
document.querySelector('#posts').addEventListener('click', enableEdit)

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)

// Get posts
function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => {
      ui.showPosts(data)
    })
    .catch(err => console.log(err))
}

// Submit post
function submitPost(e) {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value

  const data = {
    title: title,
    body: body
  }

  // Validate
  if (title === '' || body === '') {
    return ui.showAlert('Please complete the fields.', 'alert alert-primary')
  } else {
    // Check for ID
    if (id === '') {
      // POST request - create post
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added.', 'alert alert-success')
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))
    } else {
      // PUT request - update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated.', 'alert alert-primary')
          ui.changeFormState('add')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }

  e.preventDefault()
}

// Delete post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post deleted.', 'alert alert-danger')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }

  e.preventDefault()
}

// Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    const data = { id, title, body }

    // Fill form with current data
    ui.fillForm(data)
  }
  e.preventDefault()
}

// Cancel edit
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }

  e.preventDefault()
}
