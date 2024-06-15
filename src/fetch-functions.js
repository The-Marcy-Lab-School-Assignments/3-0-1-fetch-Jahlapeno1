const userUrl = 'https://jsonplaceholder.typicode.com/users'

export const checkResponseStatus = () => {
  return fetch(userUrl)
  .then(response => {
    const statusOkUrlObj = {
      ok: response.ok,
      status: response.status,
      url: response.url
    }
    return statusOkUrlObj
  })
};

export const getUsers = () => {
  return fetch(userUrl)
  .then(response => {
    // console.log(response)
    // console.log(response.json())
    return response.json()
  })
};

export const getUserPosts = (userId, maxNumPosts = 3) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts
  `
  return fetch(url)
  .then(response => {
    return response.json()
  })
};

export const createNewUser = (newUserData) => {
  const postOption = {
    method: "POST",                      // The type of HTTP request
    body: JSON.stringify(newUserData),       // The data to be sent to the API
    headers: {
      "Content-Type": "application/json" // The format of the body's data
    }  
  }
  return fetch(userUrl, postOption)
  .then(response => {
    // console.log(response)
    return response.json()
  })
  // .then(data => data)
}
