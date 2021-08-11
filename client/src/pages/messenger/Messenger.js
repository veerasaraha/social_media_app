import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './messenger.css'

const Messenger = () => {
  const { user } = useContext(AuthContext)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState({})
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState({})
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef()
  const socket = useRef()

  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('connectUser', user._id)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.following.filter((f) => users.some((u) => u.userId === f))
      )
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/conversations/${user._id}`
        )
        setConversations(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [API_URL, user])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/messages/${currentChat._id}`
        )
        setMessages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [API_URL, currentChat])

  const submitHandler = async (e) => {
    e.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members?.find(
      (member) => member !== user._id
    )

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })
    try {
      const response = await axios.post(`${API_URL}/api/messages`, message)
      setMessages([...messages, response.data])
    } catch (error) {
      console.log(error)
    }

    setNewMessage('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaivor: 'smooth' })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input
              className='chatMenuInput'
              type='text'
              placeholder='Search for friends'
            />
            {conversations.map((conv) => (
              <div onClick={() => setCurrentChat(conv)} key={conv._id}>
                <Conversation conversation={conv} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map((msg) => (
                    <div ref={scrollRef} key={msg._id}>
                      <Message message={msg} own={msg.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    className='chatMessageInput'
                    placeholder='Write a message'></textarea>
                  <button className='chatSubmitButton' onClick={submitHandler}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className='noConversationText'>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
