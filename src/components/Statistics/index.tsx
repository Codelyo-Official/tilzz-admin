import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,Area,Label } from "recharts";
import styles from "./styles.module.css"

// Define the shape of each data point
interface SignupData {
  date: string;
  signups: number;
}

// Generate dummy signup data for the last 30 days
const generateLast30DaysData = (): SignupData[] => {
  const data: SignupData[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    // const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    const mmdd = `${mm}-${dd}`;
    data.push({
      // date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
      date:mmdd,
      signups: Math.floor(Math.random() * 50) + 1, // Random number between 1 and 50
    });
  }
  return data;
};

const data: SignupData[] = generateLast30DaysData();

const Statistics: React.FC = () => {
  return (
    <div className={styles.chartContainer} >
      <h2>User Signups (Last 30 Days)</h2>
      {/* width={100} height={500} */}
      <ResponsiveContainer width="100%" height="98%">
        <LineChart data={data} className={styles.chart}
         margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 10,
        }}
        >
                    <CartesianGrid strokeDasharray="3 3" fill="rgb(249, 252, 255)" />

          <Line type="monotone" dataKey="signups" stroke="rgb(54, 146, 238)" />
          <XAxis dataKey="date" angle={0} textAnchor="end" height={50} style={{marginTop:"20px"}}>
            </XAxis>
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
