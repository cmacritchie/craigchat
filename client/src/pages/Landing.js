import React from 'react'
import CreateRoom from '../components/CreateRoom'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/roomReducer'

const Landing = ({ room, user, deleteRoom}) => {

    const renderRooms = () => {
        return Object.keys(room.rooms).map((key) => {
            const item = room.rooms[key]
            return (
                <div key={item._id}>
                    <NavLink to={`/room/${item._id}`}
                            className="blue btn-small">
                            {item.name}
                    </NavLink>
                    {user.isAuthenticated && item.owner === user.user._id &&
                    <button onClick={()=> deleteRoom(item._id)} className="btn btn-small red">
                        X
                    </button>
                    }
                </div>
            )
        })
    }

    return (
        <div>
            <CreateRoom />
            {Object.keys(room.rooms).length > 0 ?
            
            renderRooms()
            :
            <p>no Rooms yet!</p>
            }
        </div>
    )
}

const mapStateToProps =({ room, user }) => {
    return { room, user }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
