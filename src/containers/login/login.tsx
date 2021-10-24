import React, { Component, FormEvent } from 'react';
import Input from '../../components/ui/input/input';
import UserIcon from '../../components/ui/userIcon/userIcon';
import PasswordIcon from '../../components/ui/passwordIcon/passwordIcon';
import {connect} from 'react-redux';
import {Dispatch} from 'redux'
import { LoginState,State,LoginMapDispatchToProps } from '../../interface/interface';
import * as actionTypes from '../../store/actions';

class login extends Component<LoginState & State & LoginMapDispatchToProps> {
    state:LoginState = {
        logInDetails : {
            username :'',
            password:''
        },
        showPassword : false
    }

    loginInputHandle = (event: React.ChangeEvent<HTMLInputElement>,inputname:string) => {
        const logInDetails = {...this.state.logInDetails};

        if (inputname === 'username') {
            logInDetails.username = event.target.value;
            console.log(logInDetails.username);
            
        } else if (inputname === 'password') {
            logInDetails.password = event.target.value;
            console.log(logInDetails.password);
        }
        this.setState ({logInDetails: logInDetails})
    }

    validateuserHandle = (event:React.FormEvent) => {
        event.preventDefault();
        const authorisedUser = this.props.authorisedUser;
        const logInDetails = {...this.state.logInDetails};
        let loginSuccessfull = false;
        
        for (const key in authorisedUser) {
            if (authorisedUser[key].username === logInDetails.username && 
                authorisedUser[key].password === logInDetails.password) {
                const isLogin:any = authorisedUser[key].isLogin
                localStorage.setItem('isUserLogIn', isLogin);
                localStorage.setItem('userName', authorisedUser[key].name);
                loginSuccessfull = true;
            }
        }
        this.props.authorisedUserData(authorisedUser)
        if (loginSuccessfull) {
            this.props.checkAuthentication()
            this.setState ({
                logInDetails : {
                    username : '',
                    password: ''
                }
            })
        } else {
            alert('You Have Enter Wrong Username or Password')
        }
    }

    showPasswordHandle = () => {
        const showPassword = this.state.showPassword;
        this.setState({showPassword : !showPassword})
    }
    render () {
        return (
            <div className='flex justify-center full-height-container full-width'>
            <div className='login-form'>
                <h3>Login</h3>
                <form onSubmit = {this.validateuserHandle}>
                    <div className='form-item'>
                        <UserIcon className='input-icon'/>
                        <Input
                            id = 'username'
                            type= 'text'
                            name= 'username'
                            placeholder= 'Username'
                            changed = {(event:React.ChangeEvent<HTMLInputElement>) => this.loginInputHandle(event,'username')}
                            value = {this.state.logInDetails['username']}
                            // autoComplete="off"
                        />
                    </div>
                    <div className='form-item'>
                        <PasswordIcon className='input-icon' />
                        <Input
                            id = 'password'
                            type= {this.state.showPassword ? "text" : "password"}
                            name= 'password'
                            placeholder= 'Password'
                            changed = {(event:React.ChangeEvent<HTMLInputElement>) => this.loginInputHandle(event,'password')}
                            value = {this.state.logInDetails['password']}
                            // autoComplete="off"
                        />
                    </div>
                    <div className='form-item flex justify-flex-end mb--20'>
                        <input type="checkbox" id="show-password" className="show-password"  onClick ={this.showPasswordHandle}/>
                        <label htmlFor="show-password" className="flex Control-label Control-label--showPassword">
                        <svg viewBox="0 0 48 48" width="20" height="20" className="svg-toggle-password">
                            <path d="M24,9A23.654,23.654,0,0,0,2,24a23.633,23.633,0,0,0,44,0A23.643,23.643,0,0,0,24,9Zm0,25A10,10,0,1,1,34,24,10,10,0,0,1,24,34Zm0-16a6,6,0,1,0,6,6A6,6,0,0,0,24,18Z" />
                            <rect x="20.133" y="2.117" height="44" transform="translate(23.536 -8.587) rotate(45)" className="closed-eye" />
                            <rect x="22" y="3.984" width="4" height="44" transform="translate(25.403 -9.36) rotate(45)" className="closed-eye" />
                        </svg>
                        </label>
                        <span className='show-password-text'>{this.state.showPassword ? "Hide Password" : "Show Password"}</span>
                    </div>
                    <button>Log in</button>
                </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state:State) => {
    return {
        authorisedUser : state.authorisedUser,
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch:Dispatch):LoginMapDispatchToProps => {
    return {
        authorisedUserData : (authorisedUser) => dispatch({type:actionTypes.LOGIN_VALIDATION,authorisedUser: authorisedUser}),
        checkAuthentication : () => dispatch({type: actionTypes.AUTHORIZATION_TRUE}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(login);