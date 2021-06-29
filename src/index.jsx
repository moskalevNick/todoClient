import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {compose, createStore, applyMiddleware} from 'redux'

import rootReducer from './redux/rootReducer'
import App from './App.jsx'
import './index.css'
import '@ionic/react/css/core.css'

const store = createStore (
  rootReducer, 
  compose( applyMiddleware( thunk ) )
)

ReactDOM.render (
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' )
)
