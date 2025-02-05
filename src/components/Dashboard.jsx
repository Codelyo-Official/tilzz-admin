import React, {useEffect} from 'react';
import {useAuth} from '../contexts/AuthProvider';

const Dashboard = () => {
    const {user} = useAuth();

    useEffect(() => {
      console.log(user)
    }, [])

    return (
        <div>

            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard
