import axios from 'axios';
const baseURL = "/api/employee";

export default axios.create({ baseURL });