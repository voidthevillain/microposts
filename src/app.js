import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for post submit
document.querySelector('.post-submit').addEventListener('click', submitPost)

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
      getPosts()
    })
    .catch(err => console.log(err))

  e.preventDefault()
}
