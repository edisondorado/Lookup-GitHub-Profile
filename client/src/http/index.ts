import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const $api = axios.create({
  baseURL: API_URL,
});

export default $api;