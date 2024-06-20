import {
  renderStatus,
  setupPageBasics,
  renderUsers,
  renderPosts,
  renderNewUser,
} from './render-functions.js';
import {
  checkResponseStatus,
  getUserPosts,
  createNewUser,
  getUsers
} from './fetch-functions.js';

export default function app(appDiv) {
  /** FEEDBACK: Because you did not destructure your object, every time you need an element from the object you will need to do website.element. */
  const website = setupPageBasics(appDiv)
  checkResponseStatus()
  .then((data) => {
    // console.log(data)
    renderStatus(website.statusDiv, data)
  })
  getUsers()
  .then((data) => {
    // console.log(data)
    renderUsers(website.usersUl, data)
  })
  /** FEEDBACK: Here is an example of where this occurs, here instead of getting the element by its id, you should be targeting the element through your website object. */
  const user = document.getElementById("users-list")
  // console.log(user)
  /** FEEDBACK: Instead of user.addEventListener... etc, you should write website.usersUl! */
  user.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      // console.log(event.target.getAttribute("data-user-id"))
      /** FEEDBACK: Same here, use the elements that were given and are currently stored in your website variable. */
      const userId = event.target.getAttribute("data-user-id")
      getUserPosts(userId)
      .then((data) => {
        // console.log(data)
        const postsUl = document.querySelector('#posts-list')
        renderPosts(postsUl, data)
      })
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const userObj = 
    {
      name: form.username.value,
      email: form.email.value
    }
    // console.log(userObj)
    createNewUser(userObj)
    .then(data => {
      const newUserDiv = document.getElementById("new-user")
      console.log(data)
      renderNewUser(newUserDiv, data)
    })
    form.reset()
  }
  const newUserForm = document.getElementById("new-user-form")
  // console.log(newUserForm)
  newUserForm.addEventListener("submit", handleSubmit)

  
}