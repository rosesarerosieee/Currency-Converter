import axios from "axios";

const API_KEY = "cur_live_OOS3ni5mmNI5oO2Z8T5Ny44w4kDpni4smxqSCq5C";
const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

export const getExchangeRates = async () => {

    try{
        const response = await axios.get(apiUrl);
        return response.data.data;
    }
    catch(error){
        console.error("Failed to catch currency!",error);
        throw error;
    }

};


