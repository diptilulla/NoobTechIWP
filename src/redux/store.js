import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist"; //cache

import logger from "redux-logger";

import rootReducer from "./rootReducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    ...middlewares
  ]
});

export const persistor = persistStore(store);
