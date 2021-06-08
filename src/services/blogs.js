import axios from 'axios'
const baseUrl = '/api/blogs'

//part 5.2, also export setToken is added
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
//part 5.2

//part 5.3
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
//part 5.3
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll,create,setToken }