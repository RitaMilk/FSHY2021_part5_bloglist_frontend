import axios from 'axios'
const baseUrl = '/api/blogs'

//part 5.2, also export setToken is added
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
//part 5.2
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll,setToken }