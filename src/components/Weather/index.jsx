import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {IonButton} from "@ionic/react"

import Card from "./Сard/index"
import "./styles.css"
import Modal from "./Modal/index"
import {setCity} from '../../redux/actions'

const Weather = () => {
    const dispatch = useDispatch()
    const {weather, user} = useSelector(state => state)

    const [isModalChangeCityOpen, setModalChangeCityOpen] = useState(false)
    const [isCityValid, setCityValid] = useState(true)
    const [inputValue, setInputValue] = useState("")
    const [weatherDay, setWeatherDay] = useState('today')
    const [buttonChangeWeatherTodayHidden, setButtonChangeWeatherTodayHidden] = useState(false)
    const [buttonChangeWeatherTomorrowHidden, setButtonChangeWeatherTomorrowHidden] = useState(false)
    const [buttonChangeWeatherAftertomorrowHidden, setButtonChangeWeatherAftertomorrowHidden] = useState(false)
    const [weatherByDays, setWeatherByDays] = useState({
        today: [],
        tomorrow: [],
        afterTomorrow: []
    })

    const changeCity = () => {
        dispatch(setCity(inputValue, user.name))
        setInputValue("")
    }

    useEffect(() => {
        dispatch(setCity(user.city, user.name))
    }, [dispatch, user.city, user.name])

    useEffect(() => {
        setDates(weather)
        if (weather.cod === '200') {
            setModalChangeCityOpen(false)
            setCityValid(true)
        } else {
            setCityValid(false)
        }
    }, [weather])


    useEffect(() => {
        hiddenButtons('today')
    }, [])

    function setDates(data) {
        const nowDate = new Date();

        const todayDate = `${
            nowDate.getFullYear()
        }-${
            ((nowDate.getMonth() + 1) < 10) ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
        }-${
            (nowDate.getDate() < 10) ? `0${nowDate.getDate()}` : nowDate.getDate()
        }`

        let tomorrowDate = `${
            nowDate.getFullYear()
        }-${
            ((nowDate.getMonth() + 1) < 10) ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
        }-${
            ((nowDate.getDate() + 1) < 10) ? `0${nowDate.getDate() + 1}` : nowDate.getDate() + 1
        }`

        let afterTomorrowDate = `${
            nowDate.getFullYear()
        }-${
            ((nowDate.getMonth() + 1) < 10) ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
        }-${
            ((nowDate.getDate() + 2) < 10) ? `0${nowDate.getDate() + 2}` : nowDate.getDate() + 2
        }`

        if (new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate() === afterTomorrowDate.slice(-2) - 1) {
            afterTomorrowDate = `${
                nowDate.getFullYear()
            }-${
                ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
            }-01`
        }

        if (new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate() === afterTomorrowDate.slice(-2) - 2) {
            afterTomorrowDate = `${
                nowDate.getFullYear()
            }-${
                ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
            }-02`
        }

        if (new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate() === tomorrowDate.slice(-2) - 1) {
            afterTomorrowDate = `${
                nowDate.getFullYear()
            }-${
                ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
            }-01`
        }

        if (new Date(2021, nowDate.getMonth() + 1, 0).getDate() === 30) { // month 30days
            if (nowDate.getDate() === 29) {
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
            } else if (nowDate.getDate() === 30) {
                tomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `02`
                }`
            }
        }

        if (new Date(2021, nowDate.getMonth() + 1, 0).getDate() === 29) { //february 29days
            if (nowDate.getDate() === 28) {
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
            } else if (nowDate.getDate() === 29) {
                tomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `02`
                }`
            }
        }

        if (new Date(2021, nowDate.getMonth() + 1, 0).getDate() === 28) {  //february 28days
            if (nowDate.getDate() === 27) {
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
            } else if (nowDate.getDate() === 28) {
                tomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `01`
                }`
                afterTomorrowDate = `${
                    nowDate.getFullYear()
                }-${
                    ((nowDate.getMonth() + 2) < 10) ? `0${nowDate.getMonth() + 2}` : nowDate.getMonth() + 2
                }-${
                    `02`
                }`
            }
        }

        const today = []
        const tomorrow = []
        const afterTomorrow = []

        data && data.list && data.list.forEach(el => {
            if (
                el.dt_txt.includes('9:00:00') ||
                el.dt_txt.includes('15:00:00') ||
                el.dt_txt.includes('21:00:00')
            ) {
                if (el.dt_txt.includes(todayDate)) today.push(el)
                if (el.dt_txt.includes(tomorrowDate)) tomorrow.push(el)
                if (el.dt_txt.includes(afterTomorrowDate)) afterTomorrow.push(el)
            }

            if (el.dt_txt.includes('9:00:00')) {
                el.name = 'morning'
            }

            if (el.dt_txt.includes('15:00:00')) {
                el.name = 'afternoon'
            }

            if (el.dt_txt.includes('21:00:00')) {
                el.name = 'evening'
            }
        });

        if (today.length === 1) {
            today.unshift(null)
            today.unshift(null)
        }

        if (today.length === 2) {
            today.unshift(null)
        }

        setWeatherByDays({today, tomorrow, afterTomorrow})
    }

    const trigerModalChangeCity = () => {
        setModalChangeCityOpen((prev) => !prev)
    }

    const currentWeather = weatherByDays[weatherDay]

    if (!weatherByDays.today[2]) {
        return null
    }

    function hiddenButtons(day) {
        switch (day) {
            case 'today':
                setButtonChangeWeatherTodayHidden(true)
                setButtonChangeWeatherTomorrowHidden(false)
                setButtonChangeWeatherAftertomorrowHidden(false)
                break
            case 'tomorrow':
                setButtonChangeWeatherTodayHidden(false)
                setButtonChangeWeatherTomorrowHidden(true)
                setButtonChangeWeatherAftertomorrowHidden(false)
                break
            case 'afterTomorrow':
                setButtonChangeWeatherTodayHidden(false)
                setButtonChangeWeatherTomorrowHidden(false)
                setButtonChangeWeatherAftertomorrowHidden(true)
                break
            default:
                return null
        }
    }



    return (
        <div className={'wrapper'}>
            <div className={"header"}>
                <h1>weather in {user.city} city</h1>
                <IonButton
                    onClick={trigerModalChangeCity}
                    color="primary"
                    className={"buttonChange"}
                >
                    change city
                </IonButton>
            </div>
            <div className={"weatherContainer"}>
                <div>{weatherDay}, {
                    new Date(currentWeather[2].dt_txt).toLocaleString("en", {month: 'long', day: 'numeric'})
                }, {
                    new Date(currentWeather[2].dt_txt).toLocaleString('en', {weekday: 'long'})
                }</div>
                <div className={"card"}>{
                    currentWeather.map((el, index) => (
                        <Card card={el} key={index}/>
                    ))
                }</div>
                <IonButton onClick={() => {
                    setWeatherDay('today')
                    hiddenButtons('today')
                }}
                           color="primary"
                           className={"buttonChangeWeatherToday"}
                           disabled={buttonChangeWeatherTodayHidden}
                >today</IonButton>
                <IonButton onClick={() => {
                    setWeatherDay('tomorrow')
                    hiddenButtons('tomorrow')
                }}
                           color="primary"
                           className={"buttonChangeWeatherTomorrow"}
                           disabled={buttonChangeWeatherTomorrowHidden}
                >tomorrow</IonButton>
                <IonButton onClick={() => {
                    setWeatherDay('afterTomorrow')
                    hiddenButtons('afterTomorrow')
                }}
                           color="primary"
                           className={"buttonChangeWeatherAftertomorrow"}
                           disabled={buttonChangeWeatherAftertomorrowHidden}
                >aftertomorrow</IonButton>
            </div>
            <Modal
                setModalChangeCityOpen={setModalChangeCityOpen}
                isModalChangeCityOpen={isModalChangeCityOpen}
                setInputValue={setInputValue}
                inputValue={inputValue}
                changeCity={changeCity}
                isCityValid={isCityValid}
            />
        </div>
    )
}

export default Weather
