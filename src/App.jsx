import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {IonContent, IonToast, useIonLoading} from '@ionic/react';

import {checkAuth, logout, setTodos} from './redux/actions';
import Container from "./components/Container"
import NavBar from "./components/NavBar"
import Weather from "./components/Weather"
import Auth from "./components/Auth"
import Registration from "./components/Registration"
import Header from "./components/Header"

const App = () => {
	const dispatch = useDispatch()
	const {isAuth, isLoading, user, showToast, messageException} = useSelector(state => state)
	const [present] = useIonLoading();
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(checkAuth())
		}
		dispatch(setTodos())
	}, [dispatch])

	if (isLoading) {
		return (
			<IonContent>
				{present('await', 1000, 'bubbles')}
			</IonContent>
		)
	}

	if (!isAuth) {
		return (
			<div>
				<Router>
					<div className="container">
						<Switch>
							<Route path="/auth">
								<Auth/>
							</Route>

							<Route path="/registration">
								<Registration/>
							</Route>

							<Redirect to="/auth"/>
						</Switch>
					</div>
				</Router>
			</div>
		)
	}

	if (user && !user.isActivated) {
		return (
			<div className="notActivate">
				<h1>Доступ запрещен</h1>
				<h1>На ваш почтовый адрес выслано письмо для подтверждения аккаунта</h1>
				<h1>Для дальнейшего пользования сервисом активируйте аккаунт</h1>
				<button onClick={() => dispatch(logout())}>на страницу регистрации</button>
			</div>
		)
	}

	return (
		<div className="app">
			<Router>
				<NavBar/>
				<Header/>
				<div className={"todoList"}>
					<Switch>
						<Route path="/" exact>
							<Container type={"main"}/>
						</Route>

						<Route path="/important">
							<Container type={"important"}/>
						</Route>

						<Route path="/checked">
							<Container type={"checked"}/>
						</Route>

						<Route path="/weather">
							<Weather/>
						</Route>

						<Redirect to="/"/>
					</Switch>
				</div>
			</Router>
			<IonToast
				isOpen={showToast}
				message={messageException}
				duration={3000}
			/>
		</div>
	);
};

export default App;
