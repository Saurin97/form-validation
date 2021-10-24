import React,{ Component,Fragment }  from 'react'
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';
import {connect} from 'react-redux';
import {Dispatch} from 'redux'
import * as actionTypes from '../../store/actions';
import Model from '../../components/model/model';
import {State,FormMapDispatchToProps,FormState,UserDetail} from '../../interface/interface';
interface History {
    push : any
}
interface Params {
    history : History,
    match : any
}

class form extends Component<State & FormMapDispatchToProps & FormState & UserDetail & Params> {
    state : FormState = {
        formFields : {
            firstname : '',
            lastname : '',
            gender : '',
            city : 'ahmedabad'
        },
        formFieldsErrorMessage : {
            firstname : '',
            lastname : '',
            gender : '',
            city : ''
        },
        language : [
            {id: 1 ,value : 'javaScript', isChecked: false},
            {id: 2 ,value : 'java', isChecked: false},
            {id: 3 ,value : 'php', isChecked: false},
        ],
        selectedLanguage : [],
        languageErrorMessage : '',
        isUpadted : false,
        showModel : false,
        search : '',
        userId : '',
        userDetails : {
            firstname : '',
            lastname : '',
            gender : '',
            language : [],
            city : ''
        }
    }

    fieldValidation = (event:React.ChangeEvent<HTMLInputElement>,formField:string,errorMessage:string) => {
        const formFields: any = {...this.state.formFields};
        const formFieldsErrorMessage: any = {...this.state.formFieldsErrorMessage};
        formFields[formField] = event.target.value;
        if (formFields[formField].trim() === '') {
            formFieldsErrorMessage[formField] = errorMessage;
        } else {
            formFieldsErrorMessage[formField] = ''
        }
        
        this.setState ({
            formFields : formFields,
            formFieldsErrorMessage : formFieldsErrorMessage
        })
    }

    selectInplutHandler = (event:React.ChangeEvent<HTMLSelectElement>,formField:string,errorMessage:string) => {
        const formFields: any = {...this.state.formFields};
        const formFieldsErrorMessage: any = {...this.state.formFieldsErrorMessage};
        formFields[formField] = event.target.value;
        if (formFields[formField].trim() === '') {
            formFieldsErrorMessage[formField] = errorMessage;
        } else {
            formFieldsErrorMessage[formField] = ''
        }
        
        this.setState ({
            formFields : formFields,
            formFieldsErrorMessage : formFieldsErrorMessage
        })
    }

    selectCheckboxHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        let languages = [...this.state.language]
        languages.forEach(language => {
           if (language.value === event.target.value) {
               language.isChecked =  event.target.checked
           }
        })
        this.setState({language: languages})

        const selectedLanguage:string[] = [];
        this.state.language.map(language => {
            if (language.isChecked) {
                selectedLanguage.push(language.value);
            }
            return language;
        })
        this.setState ({
            language: languages,
            selectedLanguage : selectedLanguage
        });
    }

    checkboxValidation = () => {
        const selectedLanguage = [];
        const language = this.state.language 
        language.map(language => {
            if (language.isChecked) {
                selectedLanguage.push(language.value)
            }
            return language;
        })
        if (selectedLanguage.length === 0) {
            this.setState({languageErrorMessage : 'Please Select one Language'})
        } else {
            this.setState({languageErrorMessage : ''})
        }
    }

    addUserDetailsHandler = (event:React.FormEvent) => {
        event.preventDefault();
        let formFields:any = {...this.state.formFields};
        let formFieldsErrorMessage:any = {...this.state.formFieldsErrorMessage};
        
        let formField :any =  {
            firstname : {errorMessage : 'please enter your firstname'},
            lastname : {errorMessage : 'please enter your lastname'},
            gender : {errorMessage : 'please select one gender'},
            city : {errorMessage : 'please selece on city'},
        }
        
        if (this.state.selectedLanguage.length === 0 || this.state.formFields['firstname'].trim() === '' || this.state.formFields['lastname'].trim() === '' || this.state.formFields['gender'].trim() === '' || this.state.formFields['city'].trim() === '') {
            for (const key in formFields) {
                
                if (formFields[key].trim() === '') {
                    console.log(key,"formFields");
                    for (const field in formField) {
                        if (key === field) {
                            formFieldsErrorMessage[key] = formField[field].errorMessage
                        }
                    }
                    } else {
                        formFieldsErrorMessage[key] = ''
                    }
            }
            this.setState ({formFieldsErrorMessage : formFieldsErrorMessage})
            if (this.state.selectedLanguage.length === 0) {
                this.setState({
                    
                    languageErrorMessage : 'Please Select one Language'
                })
            } else {
                this.setState({
                    languageErrorMessage : ''
                })
            }
        } else {
            // const url = '/';
            const userDetails = {
                firstname : this.state.formFields['firstname'],
                lastname : this.state.formFields['lastname'],
                gender : this.state.formFields['gender'],
                language : this.state.selectedLanguage,
                city : this.state.formFields['city']
            }
            // this.props.addUserDetails(userDetails);

            // alert("data added ")
            // event.target.reset()
            this.setState ({
            //     formFields : {
            //         firstname : {value : '', errorMessage : ''},
            //         lastname : {value : '', errorMessage : ''},
            //         gender : {value : '', errorMessage : ''},
            //         city : {value : 'ahmedabad', errorMessage : ''},
            //     },
            //     language : [
            //         {id: 1 ,value : 'javaScript', isChecked: false},
            //         {id: 2 ,value : 'java', isChecked: false},
            //         {id: 3 ,value : 'php', isChecked: false},
            //     ],
            //     selectedLanguage : [],
                showModel : true,
                userDetails: userDetails
            })
            // this.props.history.push(url);
        }
    }
    
    updateUserDetailHandler = (event:React.FormEvent) => {
        event.preventDefault();
        // const url = '/';
        // const userDetails = {
        //     firstname : this.state.formFields['firstname'].value,
        //     lastname : this.state.formFields['lastname'].value,
        //     gender : this.state.formFields['gender'].value,
        //     language : this.state.selectedLanguage,
        //     city : this.state.formFields['city'].value
        // }
        // this.setState ({
        //     // isUpadted : false,
        //     firstname : this.state.formFields['firstname'].value,
        //     lastname : this.state.formFields['lastname'].value,
        //     gender : this.state.formFields['gender'].value,
        //     language : this.state.selectedLanguage,
        //     city : this.state.formFields['city'].value,
        //     showModel : true,
        // })
        const userDetails = {
            firstname : this.state.formFields['firstname'],
            lastname : this.state.formFields['lastname'],
            gender : this.state.formFields['gender'],
            language : this.state.selectedLanguage,
            city : this.state.formFields['city']
        }
        this.setState ({
            userDetails: userDetails,
            showModel : true
        })

        // const index = this.state.userId
        // alert('Data updated')
        // this.props.updateUserDetail(userDetails,index)
        // event.target.reset()
        // this.setState ({
        //     formFields : {
        //         firstname : {value : '', errorMessage : ''},
        //         lastname : {value : '', errorMessage : ''},
        //         gender : {value : '', errorMessage : ''},
        //         city : {value : 'ahmedabad', errorMessage : ''},
        //     },
        //     language : [
        //         {id: 1 ,value : 'javaScript', isChecked: false},
        //         {id: 2 ,value : 'java', isChecked: false},
        //         {id: 3 ,value : 'php', isChecked: false},
        //     ],
        //     selectedLanguage : [],
        //     showModel : false
        // })
        // this.props.history.push(url);
    }

    openModelHandle = () => {
        this.setState({showModel : true})
    }

    closeModelHandle = () => {
        this.setState({showModel : false})
    }

    confirmModelHandle = () => {
        const url = '/';
        const userDetails:any = {...this.state.userDetails};
        this.props.addUserDetails(userDetails);

            alert("data added ")
            // event.target.reset()
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
                showModel : false,
                userDetails: userDetails
            })
            this.props.history.push(url);
    }

    updataDataModelHandle = () => {
        const url = '/';
        // const index:Number | string = this.state.userId;
        // const userDetails:any = {...this.state.userDetails};
        alert('Data updated')
        // this.props.updateUserDetail(userDetails,index)
        this.setState ({
            isUpadted : false,
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
        this.props.history.push(url);
    }

    searchInputHandle = (event:React.ChangeEvent<HTMLInputElement>) => {
        this.setState ({search : event.target.value})
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            const userId = this.props.match.params.id
            const userData = {...this.props.userData[userId]};
            let language = [...this.state.language]
            userData.language.map((selectedLanguage) => {
                for (const key in language) {
                    if (selectedLanguage  === language[key].value) {
                        language[key].isChecked = true
                    }
                }
                return selectedLanguage;
            })
            
            this.setState ({
                isUpadted : true,
                language : language,
                formFields : {
                    firstname : userData.firstname,
                    lastname : userData.lastname,
                    gender : userData.gender,
                    city :  userData.city,
                },
                selectedLanguage : userData.language,
                showModel : false,
                userId : userId
            })
        }
    }

    render() { 
        const outputCheckboxes = this.state.language.map((language) => {
            return (
                <Fragment key={language.id}>
                    <input type="checkbox" id={language.value} value={language.value} onChange = {this.selectCheckboxHandler} checked = {language.isChecked} className='checkBox' />                
                    <label htmlFor={language.value}>{language.value}</label>
                </Fragment>
            )
        })
        let UserDataList:any = '';
        if (this.state.showModel) {
            const userDataList = [];
                    const UserDetail : any = {...this.state.userDetails}
                    // console.log(UserDetail);
                    
                for (const data in UserDetail) {
                    userDataList.push({
                        key : data,
                        value : UserDetail[data]
                    })
                }
                UserDataList = userDataList.map(dataEntry => {
                    if (dataEntry.key ==='language') {
                        return <li key={dataEntry.key}> <span className='font-bold'>{dataEntry.key}</span>  - {dataEntry.value.join(' , ')}</li>
                    } else {
                        return <li key={dataEntry.key}> <span className='font-bold'>{dataEntry.key}</span>  - {dataEntry.value}</li> 
                    }
                })
        }

        return (
            <Fragment>
                <div className='container'>
                    <div className='full-width'>
                        {/* <button className='button rounded-button mt-50' onClick = {props.openModelHandle}>Add Data</button> */}
                        <Model show={this.state.showModel} modelClosed ={this.closeModelHandle}>
                            <div className='userdata-preview'>
                                <h3 className='text-center'>Do you want to Add this User Data</h3>
                                <ul>
                                    {UserDataList}
                                </ul>
                                <div className='model-footer'>
                                    <button className='model-btn success' onClick={this.state.isUpadted ? this.updataDataModelHandle : this.confirmModelHandle}>Confirm</button>
                                    <button className='model-btn danger' onClick={this.closeModelHandle}>Cancle</button>
                                </div>
                            </div>
                        </Model>
                        <div className='user-details'>
                            <h3>Enter Your Details Here</h3>
                            <form onSubmit ={this.state.isUpadted ? this.updateUserDetailHandler : this.addUserDetailsHandler}>
                                <div className='flex mt-5'>
                                    <strong>FirstName :</strong>
                                    <Input
                                        id = 'firstname' 
                                        type='text'
                                        name='firstname'
                                        placeholder='First Name'
                                        value = {this.state.formFields['firstname']}
                                        changed = {(event:React.ChangeEvent<HTMLInputElement>) =>  this.fieldValidation(event,'firstname',"Please Enter your firstname")}
                                    />
                                </div>
                                <span className='error-message'>{this.state.formFieldsErrorMessage['firstname']}</span>
                                <div className='flex mt-5'>
                                    <strong>LastName :</strong>
                                    <Input 
                                        id = 'lastname'
                                        type='text'
                                        name='lastname'
                                        placeholder='Last Name'
                                        value = {this.state.formFields['lastname']}
                                        changed = {(event:React.ChangeEvent<HTMLInputElement>) =>  this.fieldValidation(event,'lastname',"Please Enter your LastName")}
                                    />
                                </div>
                                <span className='error-message'>{this.state.formFieldsErrorMessage['lastname']}</span>
                                <div className='flex mt-5'>
                                    <strong>Gender :</strong>
                                    <div className='radio-buttons'>
                                        <input 
                                            type="radio" 
                                            id="male"
                                            name="gender"
                                            value="male"
                                            checked={this.state.formFields['gender'] === "male"}
                                            onChange={(event) =>  this.fieldValidation(event,'gender',"Please Enter your LastName")}
                                        />
                                        <label htmlFor="male">Male</label>
                                        <input 
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            checked={this.state.formFields['gender'] === "female"}
                                            onChange={(event) =>  this.fieldValidation(event,'gender',"Please Select one gender")}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                                <span className='error-message'>{this.state.formFieldsErrorMessage['gender']}</span>
                                <div className='flex mt-5'>
                                    <strong>Languages :</strong>
                                    <div className='flex'>
                                        {outputCheckboxes}
                                    </div>
                                </div>
                                <span className='error-message'>{this.state.languageErrorMessage}</span>
                                <div className='flex mt-5'>
                                    <strong>City :</strong>
                                    <select className='dropdown' id ='city' value={this.state.formFields['city']} onChange={(event:React.ChangeEvent<HTMLSelectElement>) =>  this.selectInplutHandler(event,'city',"Please select city")}>
                                        <option value="ahmedabad">Ahmedabad</option>
                                        <option value="gandhinagar">Gandhinagar</option>
                                        <option value="surat">Surat</option>
                                    </select>
                                </div>
                                <span className='error-message'>{this.state.formFieldsErrorMessage['city']}</span>
                                <div className='flex'>
                                    {this.state.isUpadted ? <Button>Update</Button> : <Button>Submit</Button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
            
        )
    }
}

const mapStateToProps = (state:State) => {
    return {
        userData : state.userData,
    }
}

const mapDispatchToProps = (dispatch:Dispatch):FormMapDispatchToProps => {
    return {
        addUserDetails : (userDetails) => dispatch({type:actionTypes.ADD_USER_DETAILS,userDetails: userDetails}),
        updateUserDetail : (userDetails,editUserIndex) => dispatch({type:actionTypes.UPDATE_USER_DETAILS,userDetails: userDetails,editUserIndex : editUserIndex})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(form);
