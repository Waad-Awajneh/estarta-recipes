import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
//reducers
import RecipesReducer from "./../reducers/recipesReducer/reducer";
import ModalReducer from "./../reducers/ModalReducer/reducer";
//persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const allReducers = combineReducers({ RecipesReducer, ModalReducer });
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;
