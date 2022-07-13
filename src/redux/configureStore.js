import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalReducer';
import loadInfoReducer from './loadInfoReducer';
import removeLoadsReducer from './removeLoads';
import removeExpensesReducer from './removeExpensesReducer';
import calculateTotals from './calculateTotals';
import loginReducer from './loginReducer';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    loadDetail: loadInfoReducer,
    removeModal: removeLoadsReducer,
    removeExpense: removeExpensesReducer,
    totals: calculateTotals,
    login: loginReducer,
  },
});
