import "../styles/login.css";
import {Button, TextField} from "@mui/material";
import React, {useState} from "react";

function Login() {

    const [formUsername, setFormUsername] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const usernameArr: string[] = ["admin"];
    const passwordArr: string[] = ["admin"];

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        if (formUsername == usernameArr[0] && formPassword == passwordArr[0]) {
            window.location.href = "/";
        } else {
            // alert("The username or password you entered was incorrect.");
            setLoginError("The username or password was incorrect.");
        }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPassword(event.target.value);
    };

    return (
        <div className={"flex-container"}>
            <div className={"hero"}>
                <div className={"overlay"}>
                    <h1 className={"hero-text"}>Welcome to Brigham and Women's Hospital</h1>
                </div>
            </div>
            <div className={"login-container"}>
                <div className={"login-title-container"}>
                    <img src="../../public/logo.png" alt="logo" className={"logo-img"}/>
                    <h1 className={"login-title"}>Login</h1>
                </div>
                <form className={"login-form"}>
                    <div className={"login-fields-container"}>
                        <TextField
                            label={"Username"}
                            id={"username"}
                            margin={"normal"}
                            required
                            size={"small"}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            label={"Password"}
                            id={"password"}
                            margin={"dense"}
                            type={"password"}
                            required
                            size={"small"}
                            onChange={handlePasswordChange}
                        />
                        {loginError && <div className={"login-error"}>{loginError}</div>}
                        <div style={{margin: '1vh 0'}}></div>
                        <Button
                            className={"login"}
                            type={"submit"}
                            variant={"contained"}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
)
    ;
}

export default Login;
