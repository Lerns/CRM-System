import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { store } from './store/index';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
