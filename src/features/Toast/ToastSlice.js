import { createSlice } from '@reduxjs/toolkit'
// Slice

const initialToast = localStorage.getItem('toast')
  ? JSON.parse(localStorage.getItem('toast'))
  : null

const ToastSlice = createSlice({
  name: 'ToastSlice',
  initialState: {
    toast: initialToast
  },
  reducers: {
    toastSuccess: (state, action) => {
      state.toast = action.payload

      localStorage.setItem('toast', JSON.stringify(action.payload))
    },
    toastRemove: (state, action) => {
      localStorage.removeItem('toast')
    }
  }
})
export default ToastSlice.reducer
// Actions
const { toastSuccess, toastRemove } = ToastSlice.actions
export const toastCalling = mess => async dispatch => {
  try {
    dispatch(toastSuccess(mess))
  } catch (e) {
    return console.error(e.message)
  }
}
export const removeToast = () => async dispatch => {
  try {
    dispatch(toastRemove())
  } catch (e) {
    return console.error(e.message)
  }
}
