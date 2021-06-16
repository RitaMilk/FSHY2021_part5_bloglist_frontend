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
const getAll = async() => {
  const response =  await axios.get(baseUrl)
  return response.data
  //return request.then(response => response.data)
}

//part 5.8 update likes
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll,create,update,setToken }