import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://covid-19-statistics.p.rapidapi.com',
  timeout: 5000,
  timeoutErrorMessage: 'An error occurred while processing your request.',
  headers: {
    'X-RapidAPI-Key': '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
  },
});
