import React from "react"
import {IonProgressBar} from "@ionic/react"
import classNames from 'classnames';

import "./styles.css"

const Meter = ({checkedTodo}) => {
    let meterNames = classNames({
        'meter': true,
        'red-meter': checkedTodo / 100 < 0.33,
        'yellow-meter': checkedTodo / 100 > 0.33 && checkedTodo / 100 < 0.66,
        'green-meter': checkedTodo / 100 > 0.66
    });
    return (
        <div className="meter">
            <IonProgressBar value={checkedTodo / 100} className={meterNames}/>
        </div>
    )
}

export default Meter