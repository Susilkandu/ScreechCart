import Home from "./components/pages/Home"
import {Provider} from 'react-redux';
import {store} from './reduxStore/store';
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <Home/>
    </Provider>
    </BrowserRouter>
    )
}

