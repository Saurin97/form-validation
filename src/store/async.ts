import * as actionTypes from './actions';
import axios from '../axios-orders';

export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.ASYNC_REQUEST_FAIL
    }
} 

export const setIngredients:any = (ingredients:any) => {
    return {
        type : actionTypes.ASYNC_REQUEST_SUCCESS,
        ingredients : ingredients
    }
} 
export const initIngridients:any = () => {
    
    return (dispatch:any) => {
        axios.get('/ingredients.json')
        .then (Response => {
            dispatch (setIngredients(Response.data))
            console.log('INGREDIENTS:',Response.data);

            })
            .catch (error => {
                console.log(error);
            });
    }
}

