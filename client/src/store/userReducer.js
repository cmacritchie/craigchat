import axios from 'axios'
import config from '../helpers/headerConfig'
import Cookies from 'universal-cookie';
import { toastSuccess, toastError } from './toasts'
import { history } from '../components/App'

export const FETCH_USER = 'FETCH_USER'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

const cookies = new Cookies();

//////////////Actions
export const actionCreators = {
    fetchUser: () => async dispatch => {
        const token = cookies.get('token')
        if(token){
            const res = await axios.get('/api/users/me', config(token))
            dispatch({
                type: FETCH_USER, 
                payload:{user:res.data, token }
            });
        }
    },
    registerUser: (credentials) => async dispatch => {
        try {
            const res = await axios.post('/api/users', credentials);
            toastSuccess("Profile Created")
            history.push('/')
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            toastError('Error adding user')
        }
    },
    login: (credentials) => async dispatch => {
        try {
            const res = await axios.post('/api/users/login', credentials);
            
            history.push('/')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            toastError('failed to login')
        }
    },
    logout: (token) => async dispatch => {
        try {
            await axios.post('/api/users/logout', null, config(token));
            dispatch({ type: LOGOUT });
            history.push('/')
        } catch (err) {
            toastError('logout')
        }
    }
}

/////////////////////////Reducer

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_USER:
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload.user
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state, 
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            cookies.set('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
                };
        case LOGOUT: 
            cookies.remove('token');
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            }
        default:
            return state
    }
}