import axios from 'axios'
const baseUrl = '/api/users'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getAll = () => {
  axios.get(baseUrl)
    .then(res => res.data)
}

const getOne = (id) => {
  console.log(id)
  axios.get(`${baseUrl}/${id}`)
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch((e) => {
      console.log(`Error: ${e}`)
    })
}

export default { getAll, getOne }