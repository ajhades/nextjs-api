import { useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState({
        username: '',
        email: '',
    })

    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        setUser(response.data)
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
        </div>
    );
}

export default Dashboard;