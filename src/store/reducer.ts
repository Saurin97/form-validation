import * as actionTypes from './actions';
import { InitialState, Action }  from '../interface/interface';

const initialState: InitialState  = {
    authorisedUser : {
        1 : { 
            username : 'saurin612',
            name: 'saurin patel',
            password : 'patel1234',
            isLogin : false
        },
        2 : {
            username : 'jeet04',
            password : 'patel1234',
            name: 'jeet rabadiya',
            isLogin : false
        },
        3 : {
            username : 'imehul',
            name : 'mehul patel',
            password : 'patel1234',
            isLogin : false
        }
    },
    userData : [
        {
            firstname : 'saurin',
            lastname : 'patel',
            gender : 'male',
            language : ['java'],
            city : 'gandhinagar'
        },
        {
            firstname : 'jeet',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'ahmedabad'
        },
        {
            firstname : 'mehul',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'gandhinagar'
        },
        {
            firstname : 'het',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'ahmedabad'
        },
        {
            firstname : 'dhaval',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'gandhinagar'
        },
        {
            firstname : 'aakash',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'surat'
        },
        {
            firstname : 'ajay',
            lastname : 'patidaat',
            gender : 'male',
            language : ['php'],
            city : 'surat'
        }
    ],
    auth : false,
    ingredients : ''
}

const reducer = (state:InitialState = initialState, action:Action):InitialState => {
    const userData = [...state.userData];
    switch (action.type) {
        
        case actionTypes.ADD_USER_DETAILS:
            userData.push(action.userDetails);
            return {
                ...state,
                userData: userData
            }

        case actionTypes.UPDATE_USER_DETAILS:
            userData.splice(action.editUserIndex, 1 ,action.userDetails);
            return {
                ...state,
                userData : userData,
        }

        case actionTypes.DELETE_USER_DETAILS:
            userData.splice(action.key, 1);
            return {
                ...state,
                userData : userData 
        }
        case actionTypes.LOGIN_VALIDATION:
            return {
                ...state,
                authorisedUser : action.authorisedUser
            }
        case actionTypes.AUTHORIZATION_TRUE:
            return {
                ...state,
                auth : true
            }
        case actionTypes.AUTHORIZATION_FALSE :              
            return {
                ...state,
                auth : false,
                authorisedUser : {
                1 : { 
                    username : 'saurin612',
                    name: 'saurin patel',
                    password : 'patel1234',
                    isLogin : false
                },
                2 : {
                    username : 'jeet04',
                    password : 'patel1234',
                    name: 'jeet rabadiya',
                    isLogin : false
                },
                3 : {
                    username : 'imehul',
                    name : 'mehul patel',
                    password : 'patel1234',
                    isLogin : false
                }
            },
        }
        case actionTypes.ASYNC_REQUEST_SUCCESS : 
            return {
                ...state,
                ingredients : action.ingredients
            }
        default:
            return state;
    }
}

export default reducer