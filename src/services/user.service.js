import { authHeader } from '../helpers'
import axios from 'axios'
export const userService = {
  login,
  logout
  // register
}

function login (username, password) {
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, password })
  // }
  console.log(username)
  console.log(password)

  return axios
    .post(`https://jsonplaceholder.typicode.com/users`, {
      username,
      password
    })
    .then(res => {
      console.log(res)
      console.log(res.data)
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        // location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
