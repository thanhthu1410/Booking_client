import ReactDOM from 'react-dom/client'
import App from './App'
import "./main.scss"
import { Provider } from 'react-redux'
import store from './stores'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>

)
