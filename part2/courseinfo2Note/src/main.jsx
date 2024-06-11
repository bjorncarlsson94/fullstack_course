import {createRoot} from 'react-dom/client'
import App from './App'
//import notes from './components/notes'


const container = document.getElementById('root');
const root = createRoot(container);
root.render (<App />);