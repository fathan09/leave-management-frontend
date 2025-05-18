import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setIsError] = useState(false)


    const handleSubmit = (event) => {
        event.preventDefault()

        const loginUser = {
            username,
            password
        }

        axios.post("https://leave-management-backend-production.up.railway.app/user/login", loginUser).then((response) => {
            console.log("User is logged in")
            navigate("/create-leave")
        }).catch((err) => {
            if(err.response) {
                console.log("Invalid username / password : ", err.response)
                setErrorMessage("Invalid username / password")
                setIsError(true)
            } else if(err.request) {
                console.log("Request error:", err.request)
            } else {
                console.log("Error:", err.message)
            }
        })
    }

    return (
        <div className="container-login">
            <h1>DHL Leave Management</h1>
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">Login</button>
                </form>
                {isError && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
            </div>
        </div>
    );
}

export default Login;