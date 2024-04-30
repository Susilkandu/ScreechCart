import Home from "./components/pages/Home"
import {Provider} from 'react-redux';
import {store} from './reduxStore/store';

export default function App() {
  return (
    <Provider store={store}>
    <Home/>
    </Provider>
    )
}

