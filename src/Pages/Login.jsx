import { useState } from "react";
import Input from "../Components/Input";
import "../css/model.css";
import axios from "axios";


const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        if(!email || !password){
            alert("All fields are required");
            return;
        }
        try{
            axios.post("https://notes-backend-x9sp.onrender.com/user/login", {
                email: email,
                password: password
            }).then(()=> {
                alert("Logged in successfully");
                setEmail('')
                setPassword('')
            })
        } catch (error) {
            console.log(error);
        }
    }


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