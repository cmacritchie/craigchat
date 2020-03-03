import axios from 'axios'
import config from '../helpers/headerConfig'
import { toastSuccess, toastError } from './toasts'
import { store } from '../index'

export const ADD_ROOM = 'ADD_ROOM'
export const FETCH_ROOMS = 'FETCH_ROOMS'
export const FETCH_ROOM = 'FETCH_ROOM'
export const DELETE_ROOM='DELETE_ROOM'

export const ADD_MESSAGE ='ADD_MESSAGE'
export const FETCH_MESSAGES = 'FETCH_MESSAGES'


///////////////Actions
export const actionCreators = {
    createRoom: (room) => async () => {
        try {
            await axios.post('/api/room', room, config(store.getState().user.token))
            toastSuccess('Room Created')
        } catch (e) {
            toastError('could not create room')
        }
    },
    addRoom: (room) => dispatch => {
        dispatch({
            type:ADD_ROOM,
            payload: room
        })
    },
    getAllRooms:() => async dispatch => {
        try {
            const res = await axios.get('/api/room')
            dispatch({
                type: FETCH_ROOMS,
                payload: res.data
            })
        } catch (e) {
            toastError('could not retrieve rooms')
        }
    },
    deleteRoom: (roomId) => async () => {
        try {
            await axios.delete(`/api/room/${roomId}`, config(store.getState().user.token))
        } catch (e) {
            toastError('Error deleting Room')
        }
    },
    removeRoom: (room) => dispatch => {
        dispatch({
            type:DELETE_ROOM,
            payload: room
        })
    },
    getMessages: (roomId) => async dispatch => {
        try{
            const res = await axios.get(`/api/room/${roomId}`)
            dispatch({
                type: FETCH_MESSAGES,
                payload: { data:res.data, roomId }
            })
        } catch(e) {
            toastError('Failed to Load Messages')
        }
    },
    postMessage: (message) => async ()=> {
        try {
            await axios.post('/api/message', message, config(store.getState().user.token))
        } catch (e) {
            toastError('Failed to Post Message')
        }
    },
    addMessage: (message) => dispatch => {
        dispatch({
                type:ADD_MESSAGE,
                payload: message
            })
        }
}

/////////////////////Reducer

const initialState = {
    rooms: {},
    loaded: false
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action

    switch(type) {
        case FETCH_ROOMS:
            return{
                ...state,
                rooms: payload.reduce((obj, item) =>{
                    let { _id } = item
                    return {
                        ...obj,
                        [_id]:item 
                    }
                }, {}),
                loaded:true
            }
        case ADD_ROOM:
            return{
                ...state,
                rooms: {...state.rooms, [payload._id]:payload}
            }
        case DELETE_ROOM:
            return {
                ...state,
                rooms: Object.keys(state.rooms).filter(roomId => roomId !== payload._id)
                        .reduce((obj, item)=>{
                            return{
                                ...obj,
                                [item]:state.rooms[item]
                            }
                        }, {})
            }
        case ADD_MESSAGE:
            return {
                ...state,
                rooms:{...state.rooms, 
                    [payload.room]:{...state.rooms[payload.room], 
                                    messages:[...state.rooms[payload.room].messages, payload]}}
            }
        case FETCH_MESSAGES:
            return {
                ...state,
                rooms:{...state.rooms, 
                    [payload.roomId]:{...state.rooms[payload.roomId], 
                                        messages: payload.data} 
                    }
            }
        default:
            return state
    }
}