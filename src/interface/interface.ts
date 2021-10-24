export interface AuthorisedUser {
    [key:number] :  {
        username : string,
        name : string,
        password : string,
        isLogin : boolean
    }
}

export interface UserDetail  {
    firstname : string,
    lastname : string,
    gender : string,
    language : string[],
    city : string
}

export interface Ingredients {
    [key:string] : number
}

export interface InitialState {
    authorisedUser :AuthorisedUser,
    userData : UserDetail[],
    auth : boolean,
    ingredients : Ingredients | string
}

export interface Action {
    type: string,
    userDetails : UserDetail,
    editUserIndex : number,
    key : number,
    authorisedUser : AuthorisedUser,
    ingredients : any
}

export interface logInDetails {
    username : string,
    password : string
}

export interface LoginState {
    logInDetails : logInDetails,
    showPassword :boolean
}

export interface State {
    authorisedUser :AuthorisedUser,
    userData : UserDetail[],
    auth : boolean,
}

export interface LoginMapDispatchToProps {
    authorisedUserData : (authorisedUser : any) => void
    checkAuthentication : () => void
}

export interface TableMapDispatchToProps {
    deleteUserDetails: (key:number) => void;
    loadIngredients : () => any
}

export interface TableState {
    search : string
}

export interface TableDataColumnEntry {
    entryName: string,
    entryValue : any
}

export interface TableDataColumn {
    datacolumn:TableDataColumnEntry[]
}

export interface AuthService {
    authenticationFail : () => void;
    checkAuthentication : () => void;
}

export interface FormMapDispatchToProps {
    addUserDetails : (userDetails :UserDetail) => void,
    updateUserDetail : (userDetails:UserDetail,editUserIndex:number | string) => void,
} 

export interface FormFieldsValues {
    value: string | number,
    error: string
}

export interface FormFields {
    'firstname' : string,
    'lastname' : string,
    'gender' : string,
    'city' : string,
}

export interface Language {
    id: number,
    value : string,
    isChecked: boolean
}

// formFields : {
//     firstname : null,
//     lastname : null,
//     gender : null,
//     city : 'ahmedabad'
// },
// formFieldsErrorMessage : {
//     firstname : null,
//     lastname : null,
//     gender : null,
//     city : 'ahmedabad'
// },
// language : [
//     {id: 1 ,value : 'javaScript', isChecked: false},
//     {id: 2 ,value : 'java', isChecked: false},
//     {id: 3 ,value : 'php', isChecked: false},
// ],
// selectedLanguage : [],
// languageErrorMessage : '',
// isUpadted : false,
// showModel : false,
// search : '',
// userId : '',
// userDetails : {
//     firstname : '',
//     lastname : '',
//     gender : '',
//     language : [],
//     city : ''
// }

export interface FormState {
    formFields : FormFields,
    formFieldsErrorMessage : FormFields, 
    language : Language[],
    selectedLanguage : string[],
    languageErrorMessage : string,
    isUpadted : boolean,
    showModel : boolean,
    search : string,
    userId : string | number,
    userDetails : UserDetail,
}

// export interface FormState {
//     state: formState
// }

export interface AppMapDispatchToProps {
    authenticationFail : () => void
    checkAuthentication : () => void,
}



