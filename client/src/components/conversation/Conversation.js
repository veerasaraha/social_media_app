import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Conversation.css'
import { AuthContext } from '../../context/AuthContext'

const Conversation = ({ conversation, currentUserId }) => {
  let [friends, setFriends] = useState({})

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const friendId = conversation.members.find((conv) => conv !== currentUserId)

    const getFriend = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users?userId=${friendId}`
        )
        setFriends(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getFriend()
  }, [API_URL, conversation, currentUserId])

  return (
    <div className='conversation'>
      <img
        className='conversationImg'
        src={
          friends.profilePicture
            ? publicFolder + friends.profilePicture
            : publicFolder + 'person/noAvatar.png'
        }
        alt=''
      />
      <span className='conversationName'>{friends && friends.username}</span>
    </div>
  )
}

export default Conversation
