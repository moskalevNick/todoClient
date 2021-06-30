import { SET_TODOS, CHANGE_THEME, SET_WEATHER, SET_AUTH, SET_USER, SET_LOADING, SHOW_TOAST, TEXT_EXCEPTION } from "./types"

const initialState = {
    themeIsDay : true,
    todos : [],
    weather : {},
    user: {},
    isAuth: false,
    isLoading: false,
    showToast: false,
    messageException: ''
}

export default function rootReducer(state = initialState, action){

    if (action.type === CHANGE_THEME) {
        return { ...state, themeIsDay : action.payload }
    } 

    if (action.type === SET_TODOS) {
        return { ...state, todos : action.payload } 
    }
    
    if (action.type === SET_WEATHER) {
        return { ...state, weather : action.payload } 
    }

    if (action.type === SET_AUTH) {
        return { ...state, isAuth : action.payload } 
    }

    if (action.type === SET_USER) {
        return { ...state, user : action.payload } 
    }

    if (action.type === SET_LOADING) {
        return { ...state, isLoading : action.payload } 
    }

    if (action.type === SHOW_TOAST) {
        return { ...state, showToast : action.payload } 
    }
    
    if (action.type === TEXT_EXCEPTION) {
        return { ...state, messageException : action.payload } 
    }    

    return state

}
