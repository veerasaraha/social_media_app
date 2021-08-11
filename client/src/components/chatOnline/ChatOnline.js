import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatOnline.css'

const ChatOnline = ({ onlineUsers, currentUser, setCurrentChat }) => {
  const API_URL = process.env.REACT_APP_API_URL
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
    const getFriednds = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/friends/${currentUser}`
        )
        setFriends(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriednds()
  }, [API_URL, currentUser])

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    )
  }, [friends, onlineUsers])

  console.log(onlineFriends)
  const clickHandler = async (user) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/conversations/find/${currentUser}/${user._id}`
      )

      setCurrentChat(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
      {onlineFriends.map((online) => (
        <div
          className='chatOnlineFriend'
          onClick={() => clickHandler(online)}
          key={online._id}>
          <div className='chatOnlineImgConatiner'>
            <img
              className='chatOnlineImg'
              src={
                online.profilePicture
                  ? publicFolder + online.profilePicture
                  : publicFolder + 'person/noAvatar.png'
              }
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <div className='chatOnlineName'>{online.username}</div>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
