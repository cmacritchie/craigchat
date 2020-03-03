import React from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { Navbar, Dropdown, NavItem } from "react-materialize";
import { actionCreators } from '../store/userReducer'

const Header = ({ user, logout }) => {

    const renderContent = () => {
        if(!user.isAuthenticated) {
            return (
                    <Dropdown trigger={<a>Account</a>}>
                        <NavLink className="sidenav-close" to="/login">Login</NavLink>
                        <NavLink className="sidenav-close" to="/register">Register</NavLink>
                    </Dropdown>
                )
            } else {
                return (
                    <NavItem onClick={() => logout(user.token)} className="sidenav-close">
                        Logout
                    </NavItem>
                )
            }
        }

    return(
        <Navbar className="teal darken-1" brand={<NavLink to="/">Circle CVI Test<i className="material-icons right">home</i></NavLink>}  alignLinks="right">
            {user.isAuthenticated && <NavItem>{user.user.name} <i className="material-icons right">person</i></NavItem>}
            { renderContent() }
        </Navbar>
    )
}

const mapStateToProps = ({ user }) => {
    return ({ user })
}

const mapDispatchToProps = dispatch => bindActionCreators( actionCreators, dispatch )

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))