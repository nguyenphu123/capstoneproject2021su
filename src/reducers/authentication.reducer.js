const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action)
      return action

    case 'LOGOUT':
      return 0
    default:
      return state
  }
}

export default login
