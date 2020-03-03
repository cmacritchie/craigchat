import React, { useEffect } from 'react'
import MessageEntry from '../components/MessageEntry'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../store/roomReducer'
import EmailEntry from '../components/EmailEntry'
import io from '../websocket'

const Room = ({ match, loaded, user, currentRoom, getMessages, addMessage }) => {
    
    useEffect(() => {
        getMessages(match.params.id)
        io.emit('joinRoom', match.params.id);
        

        io.on('newMessage', (data) => {
            addMessage(data);
         });
        

        return () => {
            io.off('newMessage')
            io.emit('leaveRoom', match.params.id);
          };
    }, [loaded])

    const renderMessages = () => {
        return currentRoom.messages.map(message => {
        return <p key={message._id}>{(user.isAuthenticated &&
                                    message.owner === user.user._id) ?
                                    ('You: ') :( `${message.owner}: `)}{message.text}</p>
        })
    }

    return (
        <div>
            <EmailEntry currentRoom ={currentRoom} />
            <h1>{loaded && currentRoom.name}</h1>
            {loaded && currentRoom.messages.length > 0 && renderMessages()}
            <MessageEntry roomId={match.params.id} />
        </div>
    )
}

const mapStateToProps = ({ room, user }, { match }) => { 
    return {
            currentRoom: room.rooms[match.params.id],
            loaded: room.loaded,
            user
        }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Room)
