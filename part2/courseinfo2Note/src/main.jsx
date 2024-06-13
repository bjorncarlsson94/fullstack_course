import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
//import notes from './components/notes'


const container = document.getElementById('root');
const root = createRoot(container);
root.render (<App />);