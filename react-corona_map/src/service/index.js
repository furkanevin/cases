import axios from 'axios';
import { api } from '../utils/api';

export const getData = async (action) => {
  try {
    const res = await api.get(`/reports?q=${action.payload}`);
    const flagRes = await axios.get(
      `https://restcountries.com/v3.1/name/${action.payload}`
    );
    const flagUrl = flagRes?.data[0]?.flags?.svg;

    if (!res.data.data[0] || !flagRes.data) {
      return null;
    }

    return { ...res.data.data[0], flagUrl };
  } catch (err) {
    console.log(err);
  }
};
