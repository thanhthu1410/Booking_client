import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { timeReducer } from './slices/time.slice';

// Kết hợp reducer
const rootReducer = combineReducers({
    timeStore: timeReducer
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
})

export default store