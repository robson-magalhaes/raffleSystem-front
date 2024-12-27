import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux';
import counterSlice from './reducers/CounterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()