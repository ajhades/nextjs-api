import { useState } from "react";
import axios from "axios";

function LoginPage() {

    const [credentials,setCredendials] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setCredendials({
            ...credentials,
            [e.target.name]: e.target.value,

        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await axios.post('/api/auth/login', credentials);
        console.log(response);

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="email" onChange={handleChange} />
                <input type="password" name="password" placeholder="password" onChange={handleChange} />
                <button type="submit" name="login">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;