import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export { store, persistor };
