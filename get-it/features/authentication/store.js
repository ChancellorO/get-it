import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import * as SecureStore from "expo-secure-store";
import authReducer from './authSlice';

function defaultReplacer(key, replaceCharacter) {
  return key.replace(/[^a-z0-9.\-_]/gi, replaceCharacter);
}

function createSecureStore(options = {}) {
  const replaceCharacter = "_";
  const replacer = defaultReplacer;

  return {
    getItem: (key) =>
      SecureStore.getItemAsync(replacer(key, replaceCharacter), options),
    setItem: (key, value) =>
      SecureStore.setItemAsync(replacer(key, replaceCharacter), value, options),
    removeItem: (key) =>
      SecureStore.deleteItemAsync(replacer(key, replaceCharacter), options)
  };
}

const secureStorage = createSecureStore();

const persistConfig = {
  key: 'auth',
  storage: secureStorage,
}

const rootReducer =  combineReducers({
  auth: persistReducer(persistConfig, authReducer ),
});

export const store = createStore(rootReducer);

export const persistor = persistStore(store);
