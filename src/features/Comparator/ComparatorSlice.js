import { createSlice } from '@reduxjs/toolkit'
// Slice

const initialComparator = localStorage.getItem('comparator')
  ? JSON.parse(localStorage.getItem('comparator'))
  : []

const ComparatorSlice = createSlice({
  name: 'ComparatorSlice',
  initialState: {
    comparator: initialComparator
  },
  reducers: {
    updateComparator: (state, action) => {
      state.comparator = action.payload
      localStorage.setItem('comparator', JSON.stringify(action.payload))
    },
    emptyMyComparator: (state, action) => {
      state.comparator = null
      localStorage.setItem('comparator', JSON.stringify([]))
    }
  }
})
export default ComparatorSlice.reducer
// Actions
const { updateComparator, emptyMyComparator } = ComparatorSlice.actions
export const comparator = comparator => async dispatch => {
  try {
   
    dispatch(updateComparator(comparator))
  } catch (e) {
    return console.error(e.message)
  }
}
export const emptyComparator = () => async dispatch => {
  try {
    return dispatch(emptyMyComparator())
  } catch (e) {
    return console.error(e.message)
  }
}
export const deleteItemComparator = Id => async dispatch => {
  try {
    console.log('here1')

    const comparator = JSON.parse(localStorage.getItem('comparator'))
    if (comparator.length === 1) {
      console.log('here1')
      return dispatch(emptyMyComparator())
    } else {
      console.log('here2')
      const check_index = comparator.findIndex(item => item.ProductId === Id)

      if (check_index !== -1) {
        console.log('here3')
        comparator.splice(check_index, 1)
      } else {
        console.log('here4')
      }
      return dispatch(updateComparator(comparator))
    }
  } catch (e) {
    return console.error(e.message)
  }
}
