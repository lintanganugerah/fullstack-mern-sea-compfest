import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "redux/slice/userSlice";
import authReducer from "redux/slice/authSlice";
import { authAPI } from "redux/apiQuery/authApi";
import { testimonialAPI } from "redux/apiQuery/testimonialApi";
import { MealplanApi } from "./apiQuery/mealplanApi";

// Gabung semua reducer
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [testimonialAPI.reducerPath]: testimonialAPI.reducer,
  [MealplanApi.reducerPath]: MealplanApi.reducer,
});

// Configure redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, //Ini required dari redux-persist
    })
      .concat(authAPI.middleware)
      .concat(testimonialAPI.middleware)
      .concat(MealplanApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
