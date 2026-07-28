import axios from "axios";

const apis = axios.create({

    baseURL: "http://172.22.204.25:3000",

    timeout: 30000,

    headers: {

        "Content-Type": "application/json",

    },

});

export default apis;