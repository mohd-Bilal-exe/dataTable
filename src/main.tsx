import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  
import { PrimeReactProvider } from "primereact/api";
import store from './redux/Store';
import App from './App';
  
import './index.css';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
    <Provider store={store}>  
      <App />
    </Provider>
    </PrimeReactProvider>
  </StrictMode>,
);
 
