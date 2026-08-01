import BASE_URL from "@/storage/ipAdress";
import axios from "axios";

const apis = axios.create({

    baseURL: BASE_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json",

    },

});

export default apis;