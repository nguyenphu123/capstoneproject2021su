import { createSlice } from '@reduxjs/toolkit'
// Slice
import axios from 'axios'

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialError = localStorage.getItem('error')
  ? JSON.parse(localStorage.getItem('error'))
  : null

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: {
    user: initialUser,
    error: initialError
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      localStorage.removeItem('error')

      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    updateSuccess: (state, action) => {
      state.user = action.payload

      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailed: (state, action) => {
      console.log('hello')

      localStorage.setItem(
        'error',
        JSON.stringify('Wrong username or password')
      )
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
const {
  loginSuccess,
  logoutSuccess,
  loginFailed,
  updateSuccess
} = UserSlice.actions
export const loginUser = authData => async dispatch => {
  try {
    axios({
      method: 'post',
      url: '/api/login-management',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(authData)
    })
      .then(res => {
        console.log(res)

        if (res.data === null) {
          dispatch(loginFailed())
        } else {
          dispatch(loginSuccess(res.data))
        }
      })
      .catch(function (error) {
        dispatch(loginFailed())
      })
  } catch (e) {
    return console.error(e.message)
  }
}
export const updateUserInformation = authData => async dispatch => {
  try {
    dispatch(updateSuccess(authData))
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
