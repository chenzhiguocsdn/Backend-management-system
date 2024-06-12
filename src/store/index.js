import { configureStore } from "@reduxjs/toolkit";

import TabReducer from './reducers/tab'

export const store = configureStore({
    reducer: {
        tab: TabReducer
    }
})