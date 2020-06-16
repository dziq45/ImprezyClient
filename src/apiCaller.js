import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'http://46.41.143.64:8080',
  timeout: 2000,
  headers: {'X-Custom-Header': 'foobar', 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'}
});
export const apiCaller = ()=>{
  if(process.env.NODE_ENV === 'development'){
    return axios
  }
  else{
    return MyApiClient
  }
}