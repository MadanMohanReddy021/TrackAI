import axios from "axios";


// Change this to your backend URL

const API_URL = "http://YOUR_IP_ADDRESS:5000/api";





export const getDashboardData = async (
email:string
)=>{


try{


const response =
await axios.get(
`${API_URL}/dashboard`,
{

params:{
email
}

}

);



return response.data;



}

catch(error:any)
{


console.log(
"Dashboard API Error:",
error.response?.data ||
error.message
);



throw new Error(
error.response?.data?.message ||
"Failed to load dashboard"
);


}



};