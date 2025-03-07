import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    //const responseData = request.then(response => response.data)
    return request.then(response => response.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    //const requestData = request.then(response => response.data)
    return request.then(response => response.data)
}

export default {getAll, create, update, deleteNumber}