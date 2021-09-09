import {
  CHANGE_THEME,
  SET_AUTH,
  SET_LOADING,
  SET_TODOS,
  SET_USER,
  SET_WEATHER,
  SHOW_TOAST,
  TEXT_EXCEPTION
} from "./types"
import AuthService from "../services/AuthService";
import TodoService from '../services/TodoService';

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

export const setCity = (city, name) => {
  return async dispatch => {
    const data = await AuthService.setCity(city, name);
    if (data.data.weather.cod === '404') {
      dispatch(setTextException('invalid city, use example'))
      dispatch(setShowToast(true))
      await AuthService.setCity('minsk', name)
    } else {
      dispatch(setUser(data.data.user))
      dispatch({
        type: SET_WEATHER,
        payload: data.data.weather
      });
    }

  }
}

export const setTodos = ( type = 'main', deadline = 'all') => {
  return async dispatch => {
    const data = await AuthService.getTodos(type, deadline);
    dispatch({
      type: SET_TODOS,
      payload: data
    });
  };
};

export const removeTodo = (id) => async dispatch => {
  try {
    await TodoService.removeTodo(id)
    dispatch(setTodos())
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const addTodo = (title, date) => async dispatch => {
  try {
    await TodoService.addTodo(title, date);
    dispatch(setTodos( 'main', 'all' ))
  } catch (e) {
    console.log(e.response?.data?.message);
  }
};

export const changeTodo = (id, typeTheme, type) => async dispatch => {
  try {
    await TodoService.changeTodo(id, typeTheme);
    dispatch(setTodos( type, 'all' ))
  } catch (e) {
    console.log(e.response?.data?.message);
  }
}

export const removeAllChecked = () => async dispatch => {
  try {
    await TodoService.removeAllChecked()
    dispatch(setTodos())
  } catch (e) {
    console.log(e.response?.data?.message);
  }
}

export const login = (name, password) => async dispatch => {
  try {
    dispatch(setLoading(true))
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
  } finally {
    dispatch(setLoading(false))
  }
}

export const registration = (email, password, name) => async dispatch => {
  try {
    dispatch(setLoading(true))
    dispatch(setShowToast(false))
    const response = await AuthService.registration(email, password, name);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
  } catch (e) {
    dispatch(setTextException(e.response?.data?.errors[0].value +
        ' is ' + e.response?.data?.errors[0].msg + ' of ' + e.response?.data?.errors[0].param))
    dispatch(setShowToast(true))
    console.log(e.response?.data?.message);
  } finally {
    dispatch(setLoading(false))
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(setLoading(true))
    await AuthService.logout();
    localStorage.removeItem('token');
    dispatch(setAuth(false))
    dispatch(setUser({}))
  } catch (e) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(setLoading(false))
  }

}

export const checkAuth = () => async dispatch => {
  dispatch(setLoading(true))
  try {
    const response = await AuthService.refresh()
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
  } catch (e) {
    console.log(e.response?.data?.message);
  } finally {
    dispatch(setLoading(false))
  }
}