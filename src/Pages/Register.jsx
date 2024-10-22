import { useContext } from "react";
import Input from "../Components/Input";
import "../css/model.css";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Register = () => {

    const { username, setUsername,
            email, setEmail,
            password, setPassword
        } = useContext(UserContext);


    const handleRegister = async (event) => {
        event.preventDefault();
        if(!username || !email || !password){
            alert("All fields are required");
            return;
        }
        try {
            await axios.post("https://notes-backend-x9sp.onrender.com/user/signup", {
                name: username,
                email: email,
                password: password
            }).then(()=> {
                alert("Registered successfully");
                setUsername("");
                setEmail("");
                setPassword("");
            })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="model-back">
        <div className="model">
            <header className="model-header">
                <h1>Register</h1>
            </header>
            <h3>Welcome Here</h3>
            <p>Register to continue</p>
            <form className="model-form" onSubmit={handleRegister}>
                <Input
                    label="Name"
                    type="text"
                    value={username}
                    setValue={setUsername}
                />
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
                <button>Register</button>
            </form>
            <footer className="model-footer">
                <p>Already have an account?<span><a href="/login">Login</a></span></p>
            </footer>
        </div>
    </div>
  )
}

export default Register