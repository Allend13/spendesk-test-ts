import axios from 'axios'

const api = axios.create({
  baseURL: 'https://s3-eu-west-1.amazonaws.com/spx-development'
})

export default api
