import { useContext, useEffect } from "react";
import Input from "../Components/Input";
import "../css/model.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const LogIn = () => {

    const navigate = useNavigate();

    const { email, setEmail, password, setPassword ,sessionId, setSessionId } = useContext(UserContext);
    
    const handleLogin = async (event) => {
        event.preventDefault();
        if(!email || !password){
            alert("All fields are required");
            return;
        }
        try{
            await axios.post("https://notes-backend-x9sp.onrender.com/user/login", {
                email: email,
                password: password
            }).then((res)=> {
                alert("Logged in successfully");
                setEmail('')
                setPassword('')
                const session = res.data.data.sessionId;
                setSessionId(session);
            })
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (sessionId) {
            navigate("/notes");
        }
    }, [sessionId, navigate]);


  return (
    <div className="model-back">
        <div className="model">
            <header className="model-header">
                <h1>Sign In</h1>
            </header>
            <h3>Welcome back</h3>
            <p>Sign in to continue</p>
            <form className="model-form" onSubmit={handleLogin}>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                />
                <button>Sign in</button>
            </form>
            <footer className="model-footer">
                <p>Dont have an account?<span><a href="/register">Sign Up</a></span></p>
            </footer>
        </div>
    </div>
  )
}

export default LogIn;