import React,{ Component,Fragment } from 'react';
import Form from '../form/form';
import Table from '../table/table';
import { Route,Switch, Link } from 'react-router-dom'
import Header from '../header/header';
import Login from '../login/login';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import authentication from '../authentication/authentication';

class main extends Component {
    state = {
        formFields : {
            firstname : {value : '', errorMessage : ''},
            lastname : {value : '', errorMessage : ''},
            gender : {value : '', errorMessage : ''},
            city : {value : 'ahmedabad', errorMessage : ''},
        },
        language : [
            {id: 1 ,value : 'javaScript', isChecked: false},
            {id: 2 ,value : 'java', isChecked: false},
            {id: 3 ,value : 'php', isChecked: false},
        ],
        selectedLanguage : [],
        languageErrorMessage : '',
        logInDetails : {
            username : {value : ''},
            password: {value : ''}
        },
        loginError : '',
        editUserIndex : null,
        showPassword : false,
        isUpadted : false,
        showModel : false,
        search : ''
    }

    fieldValidation = (event,formField,errorMessage) => {  //FORM
        const formFields = {...this.state.formFields};
        
        for (const key in formFields) {
            if (formField === key) {
                formFields[key].value = event.target.value
                if (formFields[key].value.trim() === '') {
                    formFields[key].errorMessage = errorMessage
                } else {
                    formFields[key].errorMessage = ''
                }
            }
        }
        
        this.setState ({
            formFields : formFields
        })
    }

    loginInputHandle = (event,inputname) => {  //LOGIN
        const logInDetails = {...this.state.logInDetails};
        for (const key in logInDetails) {
            
            if (key === inputname) {
                logInDetails[key].value = event.target.value
            }
        }
        this.setState ({logInDetails: logInDetails})
    }

    validateuserHandle = (event) => {  //LOGIN
        event.preventDefault();
        const authorisedUser = {...this.props.authorisedUser};
        const logInDetails = {...this.state.logInDetails};
        let loginSuccessfull = false;
        
        for (const key in authorisedUser) {
            if (authorisedUser[key].username === logInDetails.username.value && 
                authorisedUser[key].password === logInDetails.password.value) {
                authorisedUser[key].isLogin = true;
                localStorage.setItem('isUserLogIn', authorisedUser[key].isLogin);
                localStorage.setItem('userName', authorisedUser[key].name);

                loginSuccessfull = true;
            }
        }
        this.props.authorisedUserData(authorisedUser)
        if (loginSuccessfull) {
            // alert('Login Successfully');
            this.props.checkAuthentication()
            event.target.reset()
            this.setState ({
                logInDetails : {
                    username : {value : ''},
                    password: {value : ''}
                }
            })
        } else {
            alert('You Have Enter Wrong Username or Password')
        }
    }

    selectCheckboxHandler = (event) => {  //FORM
        let languages = [...this.state.language]
        languages.forEach(language => {
           if (language.value === event.target.value) {
               language.isChecked =  event.target.checked
           }
        })
        this.setState({language: languages})

        const selectedLanguage = [];
        this.state.language.map(language => {
            if (language.isChecked) {
                selectedLanguage.push(language.value);
            }
        })
        this.setState ({selectedLanguage : selectedLanguage});
        return
    }
    checkboxValidation = () => {  //FORM
        const selectedLanguage = [];
        const language = this.state.language 
        language.map(language => {
            if (language.isChecked) {
                selectedLanguage.push(language.value)
            }
        })
        if (selectedLanguage.length === 0) {
            this.setState({languageErrorMessage : 'Please Select one Language'})
        } else {
            this.setState({languageErrorMessage : ''})
        }
    }

    addUserDetailsHandler = (event) => {   //FORM
        event.preventDefault();
        localStorage.setItem('loginData', "this.state.showModel");
        let formFields = this.state.formFields;
        
        let formField =  {
            firstname : {errorMessage : 'please enter your firstname'},
            lastname : {errorMessage : 'please enter your lastname'},
            gender : {errorMessage : 'please select one gender'},
            city : {errorMessage : 'please selece on city'},
        }
        
        if (this.state.selectedLanguage.length === 0 || this.state.formFields['firstname'].value.trim() === '' || this.state.formFields['lastname'].value.trim() === '' || this.state.formFields['gender'].value.trim() === '' || this.state.formFields['city'].value.trim() === '') {
            for (const key in formFields) {
                if (formFields[key].value.trim() === '') {
                    for (const field in formField) {
                        if (key === field) {
                            formFields[key].errorMessage = formField[field].errorMessage
                        }
                    }
                    } else {
                        formFields[key].errorMessage = ''
                    }
            }
            this.setState ({formFields : formFields})
            if (this.state.selectedLanguage.length === 0) {
                this.setState({languageErrorMessage : 'Please Select one Language'})
            } else {
                this.setState({languageErrorMessage : ''})
            }
        } else {
            const userDetails = {
                firstname : this.state.formFields['firstname'].value,
                lastname : this.state.formFields['lastname'].value,
                gender : this.state.formFields['gender'].value,
                language : this.state.selectedLanguage,
                city : this.state.formFields['city'].value
            }
            this.props.addUserDetails(userDetails);
            alert("data added ")
            event.target.reset()
            this.setState ({
                formFields : {
                    firstname : {value : '', errorMessage : ''},
                    lastname : {value : '', errorMessage : ''},
                    gender : {value : '', errorMessage : ''},
                    city : {value : 'ahmedabad', errorMessage : ''},
                },
                language : [
                    {id: 1 ,value : 'javaScript', isChecked: false},
                    {id: 2 ,value : 'java', isChecked: false},
                    {id: 3 ,value : 'php', isChecked: false},
                ],
                selectedLanguage : [],
                showModel : false
            })
        }
    }
    
    updateUserDetailHandler = (event) => {   //FORM
        event.preventDefault();
        this.setState ({
            isUpadted : false,
            firstname : this.state.formFields['firstname'].value,
            lastname : this.state.formFields['lastname'].value,
            gender : this.state.formFields['gender'].value,
            language : this.state.selectedLanguage,
            city : this.state.formFields['city'].value
        })
        const userDetails = {
            firstname : this.state.formFields['firstname'].value,
            lastname : this.state.formFields['lastname'].value,
            gender : this.state.formFields['gender'].value,
            language : this.state.selectedLanguage,
            city : this.state.formFields['city'].value
        }

        const index = this.state.editUserIndex
        alert('Data updated')
        this.props.updateUserDetail(userDetails,index)
        event.target.reset()
        this.setState ({
            formFields : {
                firstname : {value : '', errorMessage : ''},
                lastname : {value : '', errorMessage : ''},
                gender : {value : '', errorMessage : ''},
                city : {value : 'ahmedabad', errorMessage : ''},
            },
            language : [
                {id: 1 ,value : 'javaScript', isChecked: false},
                {id: 2 ,value : 'java', isChecked: false},
                {id: 3 ,value : 'php', isChecked: false},
            ],
            selectedLanguage : [],
            showModel : false
        })
    }

    editUserHandle = (key) => {  //table
        const userData =this.props.userData[key]        
        let language = [...this.state.language]

        userData.language.map((selectedLanguage) => {
            for (const key in language) {
                if (selectedLanguage  === language[key].value) {
                    language[key].isChecked = true
                }
            }
        })
        
        this.setState ({
            isUpadted : true,
            editUserIndex : key,
            language : language,
            formFields : {
                firstname : {value :userData.firstname, errorMessage : ''},
                lastname : {value :userData.lastname, errorMessage : ''},
                gender : {value :userData.gender, errorMessage : ''},
                city : {value : userData.city, errorMessage : ''},
            },
            selectedLanguage : userData.language,
            showModel : true
        })
    }

    openusearDataForm = () => {
        this.setState({showModel : true})
    }

    showPasswordHandle = () => { //LOGIN
        const showPassword = this.state.showPassword;
        this.setState({showPassword : !showPassword})
    }

    openModelHandle = () => {  //FORM
        this.setState({showModel : true})
    }

    closeModelHandle = () => { //FORM
        this.setState({showModel : false})
    }

    userLogoutHandle = () => { //HEADER
        localStorage.clear();
        this.props.authenticationFail();
    }

    searchInputHandle = (event) => {  //TABLE
        this.setState ({search : event.target.value})
    }

    
    render () {
            
        const userAlreadyLogin = localStorage.getItem('isUserLogIn');
        const username = localStorage.getItem('userName');
        let table = null;
        const form = <Form
                        firstname = {this.state.firstname}
                        lastname = {this.state.lastname}
                        gender = {this.state.gender}
                        city = {this.state.city}
                        language = {this.state.language}
                        formFields = {this.state.formFields} 
                        fieldValidation = {this.fieldValidation}
                        selectCheckboxHandler = {this.selectCheckboxHandler}
                        checkboxValidation = {this.checkboxValidation}
                        languageErrorMessage = {this.state.languageErrorMessage}
                        addUserDetailsHandler = {this.addUserDetailsHandler}
                        updateUserDetailHandler = {this.updateUserDetailHandler}
                        isUpadted = {this.state.isUpadted}
                        userDetails = {this.state.userDetails}
                        show ={this.state.showModel}
                        openModelHandle = {this.openModelHandle}
                        closeModelHandle = {this.closeModelHandle}
                    />
        const login = <Login
                        loginInputHandle = {this.loginInputHandle}
                        logInDetails = {this.state.logInDetails}
                        validateuserHandle = {this.validateuserHandle}
                        showPassword = {this.state.showPassword}
                        showPasswordHandle = {this.showPasswordHandle}
                    />
        if (userAlreadyLogin) {
            if (this.props.userData.length !== 0) {
                table = <Table userData = {this.props.userData} 
                            deleteUserDetailHandle = {this.deleteUserDetailHandle}
                            editUserHandle = {this.editUserHandle}
                            search = {this.state.search}
                            searchInputHandle = {this.searchInputHandle}
                        /> 
            }
        }
        let content = '';
        if (this.props.auth || userAlreadyLogin) {
            content = <Fragment>
                        {/* <Link to='/form'>
                            <button className='button rounded-button mt-50' onClick = {this.openModelHandle}>Add Data</button>
                        </Link> */}
                        {/* <Form
                            firstname = {this.state.firstname}
                            lastname = {this.state.lastname}
                            gender = {this.state.gender}
                            city = {this.state.city}
                            language = {this.state.language}
                            formFields = {this.state.formFields} 
                            fieldValidation = {this.fieldValidation}
                            selectCheckboxHandler = {this.selectCheckboxHandler}
                            checkboxValidation = {this.checkboxValidation}
                            languageErrorMessage = {this.state.languageErrorMessage}
                            addUserDetailsHandler = {this.addUserDetailsHandler}
                            updateUserDetailHandler = {this.updateUserDetailHandler}
                            isUpadted = {this.state.isUpadted}
                            userDetails = {this.state.userDetails}
                            show ={this.state.showModel}
                            openModelHandle = {this.openModelHandle}
                            closeModelHandle = {this.closeModelHandle}
                        /> */}
                        {table}
                    </Fragment>
        } else {
            content = <Login
                loginInputHandle = {this.loginInputHandle}
                logInDetails = {this.state.logInDetails}
                validateuserHandle = {this.validateuserHandle}
                showPassword = {this.state.showPassword}
                showPasswordHandle = {this.showPasswordHandle}
            />
        }
        
        return (
        <Fragment>
            <Header username = {username} userLogoutHandle = {this.userLogoutHandle}/>
            <div className='container full-height-container full-height flex align-items-start flex-column'>
                <Switch>
                    {/* <Route path='/form' exact render= {() => (form)}/> */}
                    {/* <Route path='/login' exact render = {() => (login)} /> */}
                    {/* <Route path='/' exact render= {() => (content)} /> */}
                </Switch>
                 {/* {content} */}
            </div>
        </Fragment>
    )}
}

const mapStateToProps = state => {
    return {
        userData : state.userData,
        authorisedUser : state.authorisedUser,
        auth : state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUserDetails : (userDetails) => dispatch({type:actionTypes.ADD_USER_DETAILS,userDetails: userDetails}),
        updateUserDetail : (userDetails,editUserIndex) => dispatch({type:actionTypes.UPDATE_USER_DETAILS,userDetails: userDetails,editUserIndex : editUserIndex}),
        authorisedUserData : (authorisedUser) => dispatch({type:actionTypes.LOGIN_VALIDATION,authorisedUser: authorisedUser}),
        checkAuthentication : () => dispatch({type: actionTypes.AUTHORIZATION_TRUE}),
        authenticationFail : () => dispatch({type:actionTypes.AUTHORIZATION_FALSE}),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(main);