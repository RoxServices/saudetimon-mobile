import axios from 'axios';

const apiUrl = __DEV__
  ? process.env.API_URL || 'http://10.0.2.2:3333'
  : 'https://api.saudetimon24h.com.br';

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
