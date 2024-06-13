import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    const requestResponse = request.then(response=>response.data)
    //console.log(("ResponseData: ", requestResponse));
    return requestResponse
}

export default {getAll}