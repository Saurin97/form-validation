import React,{ Fragment } from 'react';
import Input from '../ui/input/input';
import Button from '../ui/button/button';
import Model from '../model/model';

const form = (props) => {
    const outputCheckboxes = props.language.map((language) => {
        return (
            <Fragment key={language.id}>
                <input type="checkbox" id={language.value} value={language.value} onClick={props.selectCheckboxHandler} onChange = {props.checkboxValidation} checked = {language.isChecked} className='checkBox' />                
                <label htmlFor={language.value}>{language.value}</label>
            </Fragment>
        )
    })

    return (
        <div className='full-width'>
            {/* <button className='button rounded-button mt-50' onClick = {props.openModelHandle}>Add Data</button> */}
            {/* <Model show={props.show} modelClosed ={props.closeModelHandle}> */}
            <div className='user-details'>
                <h3>Enter Your Details Here</h3>
                <form onSubmit ={props.isUpadted ? props.updateUserDetailHandler : props.addUserDetailsHandler}>
                    <div className='flex mt-5'>
                        <strong>FirstName :</strong>
                        <Input
                            id = 'firstname' 
                            type='text'
                            name='firstname'
                            placeholder='First Name'
                            value = {props.formFields['firstname'].value}
                            changed = {(event) =>  props.fieldValidation(event,'firstname',"Please Enter your firstname")}
                        />
                    </div>
                    <span className='error-message'>{props.formFields['firstname'].errorMessage}</span>
                    <div className='flex mt-5'>
                        <strong>LastName :</strong>
                        <Input 
                            id = 'lastname'
                            type='text'
                            name='lastname'
                            placeholder='Last Name'
                            value = {props.formFields['lastname'].value}
                            changed = {(event) =>  props.fieldValidation(event,'lastname',"Please Enter your LastName")}
                        />
                    </div>
                    <span className='error-message'>{props.formFields['lastname'].errorMessage}</span>
                    <div className='flex mt-5'>
                        <strong>Gender :</strong>
                        <div className='radio-buttons'>
                            <input 
                                type="radio" 
                                id="male"
                                name="gender"
                                value="male"
                                checked={props.formFields['gender'].value === "male"}
                                onChange={(event) =>  props.fieldValidation(event,'gender',"Please Enter your LastName")}
                            />
                            <label htmlFor="male">Male</label>
                            <input 
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={props.formFields['gender'].value === "female"}
                                onChange={(event) =>  props.fieldValidation(event,'gender',"Please Select one gender")}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <span className='error-message'>{props.formFields['gender'].errorMessage}</span>
                    <div className='flex mt-5'>
                        <strong>Languages :</strong>
                        <div className='flex'>
                            {outputCheckboxes}
                        </div>
                    </div>
                    <span className='error-message'>{props.languageErrorMessage}</span>
                    <div className='flex mt-5'>
                        <strong>City :</strong>
                        <select className='dropdown' id ='city' value={props.formFields['city'].value} onChange={(event) =>  props.fieldValidation(event,'city',"Please select city")}>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="gandhinagar">Gandhinagar</option>
                            <option value="surat">Surat</option>
                        </select>
                    </div>
                    <span className='error-message'>{props.formFields['city'].errorMessage}</span>
                    <div className='flex'>
                        {props.isUpadted ? <Button>Update</Button> : <Button>Submit</Button>}
                    </div>
                </form>
            </div>
            {/* </Model> */}
        </div>
    )    
}

export default form;