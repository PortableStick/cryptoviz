import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import dataService from "../middleware";
import { rootReducer, flagsReducer, specializedReducer } from "../reducers";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const reducers = combineReducers({
  rootReducer,
  flagsReducer,
  specializedReducer
});

const middleware = applyMiddleware(
  dataService(url => fetch(url).then(response => response.json()))
);

export default createStore(reducers, composeEnhancers(middleware));
