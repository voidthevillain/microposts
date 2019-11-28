import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for post submit
document.querySelector('.post-submit').addEventListener('click', submitPost)

// Listen for post delete
document.querySelector('#posts').addEventListener('click', deletePost)

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
  const data = {
    title: title,
    body: body
  }

  // POST request
  http
    .post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post successfully added.', 'alert alert-success')
      ui.clearFields()
      getPosts()
    })
    .catch(err => console.log(err))

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
          ui.showAlert('Post successfully removed.', 'alert alert-danger')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }

  e.preventDefault()
}
