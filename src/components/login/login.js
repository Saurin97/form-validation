import React from 'react';
import Input from '../ui/input/input';
import UserIcon from '../ui/userIcon/userIcon';
import PasswordIcon from '../ui/passwordIcon/passwordIcon';
import {Link} from 'react-router-dom'
const login = (props) => {
    return (
        <div className='flex justify-center full-height-container full-width'>
            <div className='login-form'>
                <h3>Login</h3>
                <form onSubmit = {props.validateuserHandle}>
                    <div className='form-item'>
                        <UserIcon className='input-icon'/>
                        <Input
                            id = 'username'
                            type= 'text'
                            name= 'username'
                            placeholder= 'Username'
                            changed = {(event) => props.loginInputHandle(event,'username')}
                            value = {props.logInDetails['username'].value}
                            autoComplete="off"
                        />
                    </div>
                    <div className='form-item'>
                        <PasswordIcon className='input-icon' />
                        <Input
                            id = 'password'
                            type= {props.showPassword ? "text" : "password"}
                            name= 'password'
                            placeholder= 'Password'
                            changed = {(event) => props.loginInputHandle(event,'password')}
                            value = {props.logInDetails['password'].value}
                            autoComplete="off"
                        />
                    </div>
                    <div className='form-item flex justify-flex-end mb--20'>
                        <input type="checkbox" id="show-password" className="show-password"  onClick ={props.showPasswordHandle}/>
                        <label htmlFor="show-password" className="flex Control-label Control-label--showPassword">
                        <svg viewBox="0 0 48 48" width="20" height="20" className="svg-toggle-password" title="Toggle Password Security">
                            <path d="M24,9A23.654,23.654,0,0,0,2,24a23.633,23.633,0,0,0,44,0A23.643,23.643,0,0,0,24,9Zm0,25A10,10,0,1,1,34,24,10,10,0,0,1,24,34Zm0-16a6,6,0,1,0,6,6A6,6,0,0,0,24,18Z" />
                            <rect x="20.133" y="2.117" height="44" transform="translate(23.536 -8.587) rotate(45)" className="closed-eye" />
                            <rect x="22" y="3.984" width="4" height="44" transform="translate(25.403 -9.36) rotate(45)" className="closed-eye" />
                        </svg>
                        </label>
                        <span className='show-password-text'>{props.showPassword ? "Hide Password" : "Show Password"}</span>
                    </div>
                    <button>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default login;