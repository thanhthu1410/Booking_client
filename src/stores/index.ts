import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { timeReducer } from './slices/time.slice';
import { serviceReducer } from './slices/service.slice';

// Kết hợp reducer
const rootReducer = combineReducers({
    timeStore: timeReducer,
    serviceStore: serviceReducer
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
})

export default store