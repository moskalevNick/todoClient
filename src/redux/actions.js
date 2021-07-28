import { SET_TODOS, CHANGE_THEME, SET_WEATHER, SET_LOADING, SET_AUTH, SET_USER, SHOW_TOAST, TEXT_EXCEPTION } from "./types"
import AuthService from "../services/AuthService";
import TodoService from '../services/TodoService';
import axios from 'axios'

export const changeTheme = (value) => ({
  type: CHANGE_THEME,
  payload: value
})

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value
})

export const setShowToast = (value) => ({
  type: SHOW_TOAST,
  payload: value
})

export const setTextException = (value) => ({
  type: TEXT_EXCEPTION,
  payload: value
})

export const setAuth = (value) => ({
  type: SET_AUTH,
  payload: value
})

export const setUser = (value) => ({
  type: SET_USER,
  payload: value
})

export const setCity = (value, name) => {
  return async dispatch => {
    const user = await AuthService.setCity(value, name);
    dispatch(setUser(user.data))
  }
}

export const setTodos = () => {
  return async dispatch => {
    const data = await AuthService.getTodos();
    dispatch({
    	type : SET_TODOS,
      payload : data
    });   
  };
};

export const removeTodo = (id) => async dispatch => {
  try{
    await TodoService.removeTodo(id)
    dispatch(setTodos())
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const addTodo = ( title ) => async dispatch => {
  try{
    await TodoService.addTodo(title);
    dispatch(setTodos())
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const changeTodo = (id, type) => async dispatch => {
	try{
    await TodoService.changeTodo(id, type); 
    dispatch(setTodos())  
	} catch (e) {
    console.log(e.response?.data?.message);
  }
}

export const removeAllChecked = () => async dispatch => {
	try{
    await TodoService.removeAllChecked()
    dispatch(setTodos())
	}catch (e){
    console.log(e.response?.data?.message);
  }
}

export const fetchData = (city) => async dispatch => {
  const weatherURL = process.env.REACT_APP_API_URL_WEATHER + city + process.env.REACT_APP_API_URL_WEATHER_2
  try {
    const responce = await fetch(weatherURL)
    const data = await responce.json()
    dispatch(setCity(city))
    if ( data.cod === '404' ) {
      console.log('error 404');
    }
    dispatch({
      type : SET_WEATHER,
      payload : data
    })
  }catch(e){
    console.log(e);
  }  
}

export const login = (name, password) => async dispatch => {
  try {
    dispatch(setShowToast(false))
    const response = await AuthService.login(name, password);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
    dispatch(setCity(response.data.user.city))
  } catch (e) {
    dispatch(setTextException(e.response?.data?.message))
    dispatch(setShowToast(true))
    console.log(e.response?.data?.message);
  }
}

export const registration = (email, password, name) => async dispatch => {
  try {
    dispatch(setShowToast(false))
    const response = await AuthService.registration(email, password, name);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
    dispatch(setCity(response.data.user.city))
  } catch (e) {
    dispatch(setTextException(e.response.data.errors[0].value +
      ' is ' + e.response.data.errors[0].msg + ' of ' + e.response.data.errors[0].param))
    dispatch(setShowToast(true))
    console.log(e.response?.data?.message);
  }
}

export const logout = () => async dispatch => {
  try {
    await AuthService.logout();
    localStorage.removeItem('token');
    dispatch(setAuth(false))
    dispatch(setUser({}))
  } catch (e) {
    console.log(e.response?.data?.message);
  }
}

export const checkAuth = () => async dispatch => {
  dispatch(setLoading(true))
  try {
    const response = await axios.get(`${process.env.API_URL}/api/refresh`, {withCredentials: true})
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
  } catch (e) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(setLoading(false))
  }
}