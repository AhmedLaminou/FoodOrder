import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
/*-------------------------- CSS Files  --------------------------*/
import './static/index.css'
import './static/bootstrap.min.css'
import './static/bootstrap.bundle.min.js'
/*----------------------- Components --------------------------*/
import App from './App.jsx'
/*--------------------------  --------------------------*/
import  store  from "../src/redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
