import React from 'react';
import './loginForm.css';
import { LuUserCircle } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

const loginForm = () => {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <LuUserCircle className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <RiLockPasswordLine className='icon'/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <div className='register-link'>
                    <p>Don't have an account? <a href='#'>Register</a></p>
                </div>
            </form>

        </div>
    );
};

export default loginForm;