import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,BarChart} from "recharts";

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
    data.push({
      date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
      signups: Math.floor(Math.random() * 50) + 1, // Random number between 1 and 50
    });
  }
  return data;
};

const data: SignupData[] = generateLast30DaysData();

const Statistics: React.FC = () => {
  return (
    <div>
      <h2>User Signups (Last 30 Days)</h2>
      <BarChart width={800} height={400} data={data}>
        {/* <Line type="monotone" dataKey="signups" stroke="#82ca9d" />*/}
        <CartesianGrid stroke="#ccc" /> 
        <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default Statistics;
