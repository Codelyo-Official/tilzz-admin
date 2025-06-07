import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,Area,Label } from "recharts";
import styles from "./styles.module.css"
import axios from "axios";
import { ApiError } from "../../types/apiError";

// Define the shape of each data point
interface SignupData {
  date: string;
  count: number;
}

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const Statistics: React.FC = () => {

  const [signupdata,setSignupdata] = React.useState<SignupData[]>([]);
  const getUserActivity = async () => {

    try {
      const token = sessionStorage.getItem('token');
      const getUser_response = await axios.get(`${API_BASE_URL}/api/accounts/stats/user-activity/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getUser_response);
      setSignupdata(getUser_response.data.signups);
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        alert(errorMessage);
      }
    } finally {
    }

  }

  React.useEffect(()=>{
    getUserActivity();
  },[])

  return (
    <div className={styles.chartContainer} >
      <h2>User Signups (Last 30 Days)</h2>
      {/* width={100} height={500} */}
      <ResponsiveContainer width="100%" height="98%">
        <LineChart data={signupdata} className={styles.chart}
         margin={{
          top: 10,
          right: 30,
          left: 2,
          bottom: 10,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" fill="rgb(249, 252, 255)" />
          <Line type="monotone" dataKey="count" stroke="rgb(54, 146, 238)" />
          <XAxis dataKey="date" angle={0} textAnchor="end" height={50} style={{marginTop:"30px"}}>
            </XAxis>
          <YAxis dataKey={"count"} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
