import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

console.log(process.env);

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.error("Failed to catch currency!", error);
    throw error;
  }
};
