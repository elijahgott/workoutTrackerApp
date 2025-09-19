import axios from 'axios'
const baseUrl = '/api/workouts'

// let token = null

// const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

// const getByUser = async (userId) => {
//   const res = await axios
// }

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

const deleteById = async (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, getOne, create, update, deleteById }