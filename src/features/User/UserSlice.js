import { createSlice } from '@reduxjs/toolkit'
// Slice
import axios from 'axios'

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null
console.log(initialUser)

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: {
    user: initialUser
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) => {
      state.user = null
      console.log('hello')

      localStorage.removeItem('user')
    }
  }
})
export default UserSlice.reducer
// Actions
const { loginSuccess, logoutSuccess } = UserSlice.actions
export const loginUser = authData => async dispatch => {
  console.log(authData)

  try {
    axios({
      method: 'post',
      url: '/api/login-management',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(authData)
    }).then(res => {
      dispatch(loginSuccess(res.data))
    })
  } catch (e) {
    return console.error(e.message)
  }
}
export const logout = () => async dispatch => {
  try {
    console.log('hello')

    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message)
  }
}
