import axios from 'axios';
import { FETCH_USER } from './types';

//get the current user from the backend
//while redux thunk as a middleware, its purpose is to inspect the value that's return from this action creator
//if it return a function, it would call this function and automatically pass in the dispatch function as a argument
export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
        const res = await axios.post('/api/stripe', token);
        dispatch({ type: FETCH_USER, payload:res.data});
};
