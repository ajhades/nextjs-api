import { useState } from 'react';
import axios from 'axios';
import Router from "next/router";

function Dashboard() {
    const router = Router;
    const [user, setUser] = useState({
        username: '',
        email: '',
    })

    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        setUser(response.data)
    }
    const logout = async () => {
        await axios.post('/api/auth/logout');
        try {
            router.push('/login')
        } catch (error) {
            router.push('/login')
            console.log(error)
        }
    }

    return (
        <div>
            <h1> Dashboard</h1>

            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>

            <button onClick={() => getProfile()} >
                get profile
            </button>

            <button onClick={() => logout()} >
                logout
            </button>
        </div>
    );
}

export default Dashboard;