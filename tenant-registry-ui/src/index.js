import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";

//redux stuff
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'

//css stuff
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Main Component
import App from "./components/App/App";

// For Redux-Persist
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['enterpriseHierarchy', 'provisioning']
}
const persistedReducer = persistReducer(persistConfig, reducers);


//Redux Store Create
const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware)
);

const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();

