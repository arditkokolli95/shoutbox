import React, { ReactChild } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import api from './middleware/api';
import MessagesReducer from './message/reducer'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);


const allReducers = {
  ...MessagesReducer,
};



const store = createStoreWithMiddleware(combineReducers(allReducers));

interface Props { children: ReactChild };

const StoreWrapper = (props: Props) => (
  <Provider store={store}>{props.children}</Provider>
);

export default StoreWrapper

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch