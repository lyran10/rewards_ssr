import React from "react"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootElement = document.getElementById('root') as Document | Element;
if(rootElement){
  ReactDOM.hydrateRoot( rootElement, 
    <BrowserRouter>
      <Provider store={store}>  
       <App/>
      </Provider>
    </BrowserRouter>
    );
}
// else{
//   const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
//   );
//   root.render(
//     <React.StrictMode>
//       <Provider store={store}>
//         <HashRouter>
//          <App />
//        </HashRouter>
//       </Provider>
//     </React.StrictMode>
//   );
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
