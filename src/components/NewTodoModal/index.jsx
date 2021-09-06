import React from 'react'

import { DatePicker } from '../DatePicker';
import './styles.css'
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Modal } from '../../ui/Modal';


const NewTodoModal = ({ addTodo, date, setDate, inputValue, setInputValue, isModalOpen, setModalOpen }) => {

  return (
    <Modal isOpen={isModalOpen} onClose={setModalOpen.bind(null, false)}>
      <div className={'new-todo-modal'}>

        <div className={'close-container'}>
          <button
            className={"close-button"}
            onClick={setModalOpen.bind(null, false)}
          >
            <FontAwesomeIcon icon={faTimesCircle} size={'2x'} />
          </button>
        </div>


        <div className={'input-container'}>
          <p className={'text'}>Write your new todo here:</p>
          <input
            className={'input'}
            value={inputValue} 
            onChange={(e) => {
              setInputValue(e.target.value)
              }
            }
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addTodo()
              }
            }}  
          />
        </div>

        <div className={'date-container'}>
          <p className={'text'}>Choose deadline:</p>
          <DatePicker date={date} setDate={setDate}/>
        </div>

        <div className={'btn-container'}>
          <button
            className={inputValue.trim() ? 'button' : 'disabled'}
            onClick={ addTodo }
            disabled={!inputValue.trim()}
          >
            Add todo
          </button>
        </div>

      </div>
    </Modal>
  )
}

export default NewTodoModal
