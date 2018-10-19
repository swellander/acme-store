import axios from 'axios';

const LOGIN = 'LOGIN';

const login = user => ({
  type: LOGIN,
  user
});

//send email + password
export const _login = credentials => dispatch => {
  console.log('hey')
  return axios.post('/api/auth', credentials)
    .then(response => response.data)
    .then(loggedInUser => console.log(loggedInUser))
    .catch(err => {
      throw err;
    })
}


const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}

export default reducer;