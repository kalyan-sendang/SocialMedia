import React, { useEffect, useRef } from 'react'
import "./Chat.css"
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import { UilSetting } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
const Chat = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const socket = useRef()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)

    //sending message to socket server


    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit("new-user-add", user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        })
    }, [user])

    useEffect(() => {
        if (sendMessage !== null) {
            console.log("sendaing message from client", sendMessage)
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])
    //receiving message from socket server
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            console.log("Data Received in parent chat.jsx", data);
            setReceiveMessage(data)
        })
    }, [])


    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    }, [user])

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        return online ? true : false;
    }
    return (
        <div className="Chat">
            {/* left Side */}
            <div className='Left-side-chat'>
                <LogoSearch />
                <div className='Chat-container'>
                    <h2>Chats</h2>
                    <div className='Chat-list'>
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={user._id}
                                    online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RightSide */}
            <div className='Right-side-chat'>
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className='navIcons'>
                        <Link to='../home'>
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting />
                        <img src={Noti} alt='' />
                        <Link to='../chat'>
                            <img src={Comment} alt='' />
                        </Link>
                    </div>
                </div>
                {/* chat body */}
                <ChatBox chat={currentChat} currentUser={user._id}
                    setSendMessage={setSendMessage}
                    receiveMessage={receiveMessage} />
            </div>

        </div>
    )
}

export default Chat