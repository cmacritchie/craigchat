import React, { useEffect, useState } from 'react';
import { Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as userActionCreators } from '../store/userReducer'
import { actionCreators as roomActionCreators, ADD_ROOM } from '../store/roomReducer'
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//websocket
import socket  from '../websocket'

//components
import Header from './Header'

//pages
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Room from '../pages/Room'

//history
export const history = createBrowserHistory()

const App = ({ fetchUser, getAllRooms, addRoom, removeRoom }) => {

  useEffect(() => {
    getAllRooms()

    socket.on("postedRoom", data => {
      addRoom(data)
    })

    socket.on("deletedRoom", data => {
      removeRoom(data)
    })

    fetchUser()
    return () => {
      socket.off('postedRoom')
      socket.off('deletedRoom')
    }
    
  }, []);

  return (
    <div className="container">
      <Router history={history}>
      <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
                />
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/room/:id" component={Room} />
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...userActionCreators, ...roomActionCreators},
   dispatch
 )

export default connect(null, mapDispatchToProps)(App);
